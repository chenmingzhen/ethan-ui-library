export function capitalize(str) {
  if (typeof str !== "string") {
    console.error(new Error("str should be a string"));
  }
  return str && str[0].toUpperCase() + str.slice(1);
}
