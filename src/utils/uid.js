let uid = Date.now();

export function getUid() {
  uid += 1;
  return uid;
}

/* 
    return only id
*/
export function getUidStr() {
  return getUid().toString(36);
}

