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

export const defer = typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout
