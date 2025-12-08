export function getRandomInt(max) {
  if (!Number.isFinite(max) || max <= 0) return 0;
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % Math.floor(max);
  }
  return Math.floor(Math.random() * Math.floor(max));
}
export function getRandomIndexExcluding(prevIndex, length) {
  if (!Number.isFinite(length) || length <= 1) return 0;
  let idx = getRandomInt(length);
  if (prevIndex != null && length > 1 && idx === prevIndex) {
    idx = (idx + 1) % length;
  }
  return idx;
}
