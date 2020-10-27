export const addDays = (daysOffset, date = new Date()) =>
  new Date(date).setHours(0, 0, 0, 0) + daysOffset * 24 * 60 * 60 * 1000;

export const subDays = (daysOffset) =>
  new Date(Date.now() - daysOffset * 24 * 60 * 60 * 1000);

export const getTodaysMidnight = () => new Date().setHours(0, 0, 0, 0);

export const daysStart = (timestamp) =>
  new Date(timestamp).setHours(0, 0, 0, 0);

export const convertDateToMidnightTimestamp = (date) =>
  date.setHours(0, 0, 0, 0);

export const convertDateToHumanReadable = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
