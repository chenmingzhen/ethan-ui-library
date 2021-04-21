// @ts-nocheck 
const kindOf = (MaybeDerive, Base) =>
  MaybeDerive === Base || (MaybeDerive.prototype && MaybeDerive.prototype instanceof Base)

export default kindOf
