export type KeyGen<T> = T extends string | number ? true : keyof T | true | ((data: T) => string | number)
