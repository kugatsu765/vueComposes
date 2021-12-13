export * from './useApi'
export * from './useApiOptions'
export * from './useSearch'
export * from './useScreenSize'

export interface IAPIParam<ResultType, PayloadType> {
    defaultParams?: PayloadType;
    defaultValue: ResultType;
    immediate?: boolean;
    loader?: boolean;
    transform?: (data: any) => any;
    [x: string]: any;
}