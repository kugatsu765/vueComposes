import { ref, Ref, ComputedRef, computed } from "vue";
import { searchInArray, searchsInArray } from "@kugatsu/utilities"

interface IUseSearch<T> {
    search: Ref<string | undefined | string[]>;
    datasFiltred: ComputedRef<T[]>
}

export function useSearch<T>(datas: Ref<T[]>): IUseSearch<T> {
    const search = ref<string | string[]>()

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