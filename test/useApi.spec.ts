import { useApi } from '../src/composables/useApi'


describe("Should return ok", () => {
    it("should return ok", async () => {
        async function myApi() {
            return "ok";
        }
        const { exec, results } = useApi<void, string>(myApi, { defaultValue: "nope" })
        expect(results.value).toEqual("nope");
        await exec();
        expect(results.value).toEqual("ok")
    });

    it("Shoold return good", async () => {

        async function myApi(payload: string) {
            return payload;
        }

        const { exec, results } = useApi<string, string>(myApi, { defaultValue: "nope" })
        expect(results.value).toEqual("nope");
        await exec("good");
        expect(results.value).toEqual("good")
    });

    it("Shoold return good", async () => {
        async function myApi(payload: { test: string }): Promise<string> {
            return payload.test;
        }

        const { exec, results } = useApi<{ test: string }, string>(myApi, { defaultValue: "nope" })
        expect(results.value).toEqual("nope");
        await exec({ test: "good" });
        expect(results.value).toEqual("good")
    });
});