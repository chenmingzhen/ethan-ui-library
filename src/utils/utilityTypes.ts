export type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T]

export type OverwriteInterface<T, U> = Pick<T, Diff<keyof T, keyof U>> & U

// eslint-disable-next-line @typescript-eslint/ban-types
export declare type LiteralUnion<T extends U, U> = T | (U & {})

export type InjectComponent<T> =
    | React.FunctionComponent<T>
    | React.ForwardRefExoticComponent<T>
    | React.ClassicComponentClass<T>
    | React.ComponentClass<T>
