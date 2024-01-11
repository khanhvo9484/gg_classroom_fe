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

export function convertUtcToVietnamTime(utcTimeString: string): string {
  const utcTime = new Date(utcTimeString);

  const vnTime = utcTime.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return vnTime;
}
