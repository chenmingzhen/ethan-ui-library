let uid = Date.now()

export function getUid() {
    uid += 1
    return uid
}

/*
    return only id
*/
export function getUidStr() {
    return getUid().toString(36)
}

function $getKey<T = any>(data: T, keygen, index: number) {
    if (keygen === true) return data

    if (typeof keygen === 'string') return data[keygen]

    if (typeof keygen === 'function') return keygen(data, index)

    return index
}

export function getKey<T = any>(data: T, keygen, index: number) {
    const key = $getKey<T>(data, keygen, index)

    if (typeof key !== 'string' && typeof key !== 'number') {
        console.error(new Error(`keygen result expect a string or a number, get '${typeof key}'`))
    }

    return key
}

export const defer = typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout
