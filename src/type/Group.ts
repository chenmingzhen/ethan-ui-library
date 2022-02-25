export type KeyGen<T> = keyof T | true | ((data: T) => string | number)
