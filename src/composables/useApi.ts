import { ref, Ref } from "vue";

export interface IAPIParam<ResultType, PayloadType> {
    defaultParams?: PayloadType;
    defaultValue: ResultType;
    immediate?: boolean;
    loader?: boolean;
    transform?: (data: any) => any;
    [x: string]: any;
}

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

                return Promise.resolve(res)
            })
            .catch((err) => {
                error.value = err
                status.value = err?.status
                results.value = options.defaultValue
                return Promise.reject(err)
            }).then(() => {
                endProcess()
            })
    }

    if (options.immediate && options.defaultParams)
        exec(options.defaultParams)
    else if (options.immediate && !options.defaultParams)
        exec({} as PayloadType);


    return { exec, error, loading, completedOnce, status, results };
}
