export const getSearchParams = (
  paramsObject: Record<string, any>
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(paramsObject).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((arrayValue) => searchParams.append(key, arrayValue));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  return searchParams;
};
