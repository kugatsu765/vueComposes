import { ref, Ref } from "vue";

export interface IAPIParam<T, P> {
    defaultParams?: P;
    defaultValue: T;
    immediate?: boolean;
    loader?: boolean;
    transform?: (data: any) => any;
    [x: string]: any;
}

export function useApi<T, P>(
    func: (payload: P) => Promise<any | void>,
    options: IAPIParam<T, P>
) {
    const error = ref<string>('')
    const loading = ref<boolean>(false)
    const completed = ref<boolean>(false)
    const status = ref<number>()
    const results = ref<T>(options.defaultValue) as Ref<T>

    function endProcess() {
        loading.value = false
        completed.value = true
    }

    const exec = async (payload: any) => {
        loading.value = true
        completed.value = false
        error.value = ""

        return await func(payload)
            .then((res: any) => {
                status.value = res?.status

                if (options.transform)
                    results.value = options.transform(res?.data ?? res)
                else
                    results.value = res?.data ?? res

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
            ;
    }

    if (options.immediate)
        exec(options.defaultParams)

    return { exec, error, loading, completed, status, results }
}
