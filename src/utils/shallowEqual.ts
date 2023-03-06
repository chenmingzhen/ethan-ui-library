import deepEqual from 'deep-eql'

function is(x, y) {
    return x === y
}

export default function shallowEqual(
    objA: Record<string, any> | Array<any> | any,
    objB: Record<string, any> | Array<any> | any
) {
    /** 基本数据类型比较 */
    if (is(objA, objB)) {
        return true
    }

    return deepEqual(objA, objB)
}
