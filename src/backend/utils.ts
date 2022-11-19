export const getQueryParams = <T>(request: Request): T => {
  const { search } = new URL(request.url);
  return Object.fromEntries(new URLSearchParams(search)) as T;
};

export const s1 = () => 1;
