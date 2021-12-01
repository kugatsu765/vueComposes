import { ref, Ref, ComputedRef, computed } from "vue";
import { searchInArray, searchsInArray } from "@kugatsu/utilities"

interface IUseSearch<T, S> {
    search: Ref<S>;
    datasFiltred: ComputedRef<T[]>
}

export function useSearch<T, S>(datas: Ref<T[]>, initialValue: S): IUseSearch<T, S> {

    const search = ref<S>(initialValue) as Ref<S>

    const datasFiltred = computed(() => {
        if (Array.isArray(search.value)) {
            return searchsInArray(datas.value, search.value)
        }
        else if (typeof search.value === 'string') {
            return searchInArray(datas.value, search.value)
        } else {
            throw '"keywords must be string[] or string"';
        }
    })

    return { search, datasFiltred }
}