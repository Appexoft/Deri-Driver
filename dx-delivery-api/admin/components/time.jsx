import React, { useState } from "react";
import { FormGroup, Input, Label } from "@adminjs/design-system";

const DateInput = (props) => {
  const { property, onChange, record } = props;
  const [value, setValue] = useState(record?.params[property?.name]);

  const onChangeDate = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    onChange(property.name, inputValue);
  };

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <Input value={value} type="time" onChange={onChangeDate} />
    </FormGroup>
  );
};

export default DateInput;
