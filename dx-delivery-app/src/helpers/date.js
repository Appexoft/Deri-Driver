export const dateToString = (date, withTime) => {
  //Input: 2021-09-14T19:42:51.652Z
  const newDate = new Date(date);
  const dateOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'America/Montevideo',
  };
  const hours = newDate?.getHours();
  const minutes = newDate?.getMinutes();

  const formatedDate = newDate.toLocaleDateString('es-ES', dateOptions);

  if (!withTime) {
    //Output 23/12/2022
    return formatedDate;
  }

  //Output 23/12/2022 23:01
  const time = `${hours ? hours : '00'}:${minutes < 10 ? '0' : ''}${minutes}`;

  return `${formatedDate} ${time}`;
};

export const formatDateText = input => {
  const datePart = input.match(/\d+/g);
  const year = datePart[0];
  const month = datePart[1];
  const day = datePart[2];

  return day + '/' + month + '/' + year;
};

export const formatedDate = date => {
  if (!date) {
    return;
  }

  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  const currentDate = new Date(year, month - 1, day);

  const options = {
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Montevideo',
  };

  const newDate = currentDate.toLocaleDateString('es-ES', options);

  return newDate.charAt(0).toUpperCase() + newDate.slice(1);
};
