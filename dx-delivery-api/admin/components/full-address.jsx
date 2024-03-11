import React from "react";

const FullAddress = (props) => {
  const { record, property } = props;

  const address =
    record.params.destinyStreet &&
    `${record.params.destinyStreet} 
                    ${record.params.destinyNumber}`;

  return (
    <div>
      <p>{address}</p>
    </div>
  );
};

export default FullAddress;
