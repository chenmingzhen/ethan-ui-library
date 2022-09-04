
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

/**
 * @see https://www.angularfix.com/2022/01/typescript-deep-keyof-of-nested-object.html
 * @see https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
 * Nested Paths
 *  
 * */    
type Join<K, P> = K extends string | number
    ? P extends string | number
        // eslint-disable-next-line prettier/prettier
        ? `${K}${'' extends P ? '' : '.'}${P}`
        : never
    : never;

type Prev = [never, 0, 1, 2, 3, 4,  ...0[]];

export type NestedKeyOf<T, D extends number = 4> = [D] extends [never]
    ? never
    : T extends Record<string, any>
    ? {
          [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, NestedKeyOf<T[K], Prev[D]>> : never;
      }[keyof T]
    : '';


