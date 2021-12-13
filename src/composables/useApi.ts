import { ref, Ref } from "vue";
import { IAPIParam } from ".";

export function useApi<PayloadType, ResultType>(func: (payload: PayloadType) => Promise<any | void>, options: IAPIParam<ResultType, PayloadType>) {

    const error = ref<string>('')
    const loading = ref<boolean>(false)
    const completedOnce = ref<boolean>(false)
    const status = ref<number>()
    const results = ref<ResultType>(options.defaultValue) as Ref<ResultType>

    function endProcess() {
        loading.value = false
        completedOnce.value = true
    }

    const exec = async (payload: PayloadType) => {
        loading.value = true
        error.value = ""

        return await func(payload)
            .then((res: any) => {
                status.value = res?.status ?? "200"
                const data = res?.data ?? res

                if (options.transform)
                    results.value = options.transform(data)
                else
                    results.value = data

                return Promise.resolve(data)
            })
            .catch((err) => {
                error.value = err
                status.value = err?.status
                results.value = options.defaultValue
                return Promise.reject(err)
            }).then((data) => {
                endProcess()
                return Promise.resolve(data)
            })
    }

    if (options.immediate && options.defaultParams)
        exec(options.defaultParams)
    else if (options.immediate && !options.defaultParams)
        exec({} as PayloadType);


    return { exec, error, loading, completedOnce, status, results };
}
