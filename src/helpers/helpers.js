export const addDays = (daysOffset, date = new Date()) =>
  new Date(date).setHours(0, 0, 0, 0) + daysOffset * 24 * 60 * 60 * 1000;

export const APIresponse = (status, message) => ({ status, message });

export const convertDateToHumanReadable = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};

export const convertDateToMidnightTimestamp = (date) =>
  date.setHours(0, 0, 0, 0);

export const daysStart = (timestamp) =>
  new Date(timestamp).setHours(0, 0, 0, 0);

export const generateTrainingId = (date, training) =>
  new Date(date).setHours(training.startsAt);

export const getDayFromDate = (date) => new Date(date).getDay();

export const getNow = () => {
  const d = new Date();
  return {
    day: d.getDay(),
    hour: d.getHours(),
    minutes: d.getMinutes(),
  };
};

export const getTodaysMidnight = () => new Date().setHours(0, 0, 0, 0);

export const setUpInAppUserData = (user) => ({
  assignedTo: user.assignedTo,
  email: user.email,
  uid: user.uid,
  userName: user.userName,
});

export const subDays = (daysOffset) =>
  new Date(Date.now() - daysOffset * 24 * 60 * 60 * 1000);
