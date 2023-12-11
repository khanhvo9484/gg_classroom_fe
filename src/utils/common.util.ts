export const formatDate = (rawDateStr: string) => {
  const date = new Date(rawDateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDate_YYYY_MM_DD = (rawDateStr: string) => {
  const [day, month, year] = rawDateStr.split("/");
  const outputDate = `${year}-${month}-${day}`;

  return outputDate;
};

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
