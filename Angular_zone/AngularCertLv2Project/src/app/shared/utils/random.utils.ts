export function shuffleStringArray(array: string[]) {
  const arrayCopy = array.slice();
  arrayCopy.sort(() => Math.random() - 0.5);
  return arrayCopy;
}