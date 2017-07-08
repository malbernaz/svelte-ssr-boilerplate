export function leftpad(str, len, placeholder) {
  const strLen = str.toString().length;
  if (strLen >= len) return str;
  return `${placeholder * (strLen - len)}${str}`;
}
