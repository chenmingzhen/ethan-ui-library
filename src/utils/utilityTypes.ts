export type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
    { [P in U]: never } & { [x: string]: never })[T]

export type OverwriteInterface<T, U> = Pick<T, Diff<keyof T, keyof U>> & U

export declare type LiteralUnion<T extends U, U> = T | (U & {})
