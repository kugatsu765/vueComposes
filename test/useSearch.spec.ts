import { useSearch } from '../src/composables/useSearch'
import { ref } from "vue";


describe("Search string in datas", () => {

    const datas = ref([
        { name: "Romain", age: 32, sport: ["badminton"] },
        { name: "Aline", age: 30, sport: ["tennis", "badminton"] }
    ])

    it("should return 1 element ", () => {
        const keywords = "tennis"

        const { datasFiltred, search } = useSearch(datas, '')
        search.value = keywords

        expect(datasFiltred.value.length).toEqual(1);
    });

    it("should return 2 elements ", () => {
        const keywords = "badminton"

        const { datasFiltred, search } = useSearch(datas, '')
        search.value = keywords

        expect(datasFiltred.value.length).toEqual(2);
    });

    it("should return 1 elements ", () => {
        const keywords = '30'

        const { datasFiltred, search } = useSearch(datas, '')
        search.value = keywords

        expect(datasFiltred.value.length).toEqual(1);
    });

    it("should return 0 elements ", () => {
        const keywords = '33'

        const { datasFiltred, search } = useSearch(datas, '')
        search.value = keywords

        expect(datasFiltred.value.length).toEqual(0);
    });


});

describe("Search multi string in datas", () => {

    const datas = ref([
        { name: "Romain", age: 32, sport: ["tennis", "badminton"] },
        { name: "Aline", age: 30, sport: ["badminton"] }
    ])

    it("should return 0 element ", () => {
        const keywords = ['30', 'tennis'];

        const { datasFiltred, search } = useSearch<any, string[]>(datas, [])
        search.value = keywords

        expect(datasFiltred.value.length).toEqual(0);
    });

    it("should return 1 elements ", () => {
        const keywords = ['32', 'tennis'];

        const { datasFiltred, search } = useSearch<any, string[]>(datas, [])
        search.value = keywords

        expect(datasFiltred.value.length).toEqual(1);
    });

    it("should return 1 elements ", () => {
        const keywords = ['tennis'];

        const { datasFiltred, search } = useSearch<any, string[]>(datas, [])
        search.value = keywords

        expect(datasFiltred.value.length).toEqual(1);
    });

});