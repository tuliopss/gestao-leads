const formatDate = (date) => {
  const newDate = new Date(date);

  const day =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  const month =
    newDate.getMonth() < 10 ? "0" + newDate.getMonth() : newDate.getMonth();
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
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
