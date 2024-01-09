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
