import { useApiOptions } from '../src/composables/useApiOptions'

describe("Should return ok", () => {
    it("should return ok", async () => {
        let opt = { defaultValue: "nope", resultTest : 'ok' };

        async function myApi(options: any) {
            return options.resultTest;
        }

        const { exec, results } = useApiOptions<void, string>(myApi, opt)
        expect(results.value).toEqual("nope");
        await exec();
        expect(results.value).toEqual("ok")
    });

    it("Shoold return good", async () => {
        
        let opt = { defaultValue: "nope" };

        async function myApi(options: any, payload: string) {
            return payload;
        }

        const { exec, results } = useApiOptions<string, string>(myApi, opt)
        expect(results.value).toEqual("nope");
        await exec("good");
        expect(results.value).toEqual("good")
    });

    it("Shoold return good", async () => {

        let opt = { defaultValue: "nope" };

        async function myApi(options: any, payload: any) {
            return payload.test;
        }
        
        const { exec, results } = useApiOptions<{ test: string }, string>(myApi, opt)
        expect(results.value).toEqual("nope");
        await exec({ test: "good" });
        expect(results.value).toEqual("good")
    });
});