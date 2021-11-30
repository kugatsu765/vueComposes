import { ref, Ref, ComputedRef, computed } from "vue";

interface IUseSearch<T> {
    search: Ref<string | undefined | string[]>;
    datasFiltred: ComputedRef<T[]>
}

export function useSearch<T>(datas: T[]): IUseSearch<T> {

    const search = ref<string | string[]>()

    const datasFiltred = computed(() => {
        return datas
    })

    return { search, datasFiltred }
}