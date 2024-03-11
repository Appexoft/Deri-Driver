import React from "react";

const FullAddress = (props) => {
  const { record, property } = props;

  const formatedDate = (date) => {
    if (!date) {
      return "";
    }
    const currentDate = new Date(date);

    const newDate = currentDate.toLocaleDateString("es-ES");
    return newDate;
  };

  const created = formatedDate(record.params.createdAt);

  return (
    <div>
      <p>{created}</p>
    </div>
  );
};

export default FullAddress;
