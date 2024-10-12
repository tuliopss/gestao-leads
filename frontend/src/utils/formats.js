const formatDate = (date) => {
  const newDate = new Date(date);

  const day = newDate.getDate() + 1;
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

const formatOptions = (option) => {
  if (option && option.length > 0) {
    let formmated = option.replace(/_/g, " ");

    const firstLetter = formmated[0];
    const formattedName = formmated.toLowerCase().slice(1, formmated.length);

    return firstLetter + formattedName;
  }

  return "";
};

const formats = {
  formatDate,
  formatOptions,
};

export default formats;
