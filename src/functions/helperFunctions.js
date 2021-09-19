export function isEmptyObj(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function isEmptyArray(arr) {
  if (arr.length) {
    return false;
  } else {
    return true;
  }
}
