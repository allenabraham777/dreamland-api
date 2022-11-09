const getToday = (format = true) => {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const today = mm + "-" + dd + "-" + yyyy + " 00:00";
  if (format) {
    return new Date(today);
  }
  return date;
};

const getTomorrow = () => {
  const date = new Date();
  const dd = String(date.getDate() + 1).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const tomorrow = mm + "-" + dd + "-" + yyyy + " 00:00";
  return new Date(tomorrow);
};

export default {
  getToday,
  getTomorrow,
};
