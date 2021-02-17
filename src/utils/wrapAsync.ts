export const wrapAsync = async <T, E>(promise: Promise<T>) => {
  return promise
    .then((result: T) => {
      return [result, undefined] as [T, undefined];
    })
    .catch((error: E) => {
      return [undefined, error] as [undefined, E];
    });
};
