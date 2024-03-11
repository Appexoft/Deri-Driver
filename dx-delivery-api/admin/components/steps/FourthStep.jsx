import React, { useState } from "react";
import Select from "react-select";
import { Box, FormGroup, Label } from "@adminjs/design-system";
import { ApiClient } from "adminjs";
import styled from "styled-components";
import StepControllers from "../StepControllers";

const api = new ApiClient();

const CustomContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FourthStep = ({
  setShippingType,
  shippingType,
  typesOfShipping,
  onPrev,
  setNextStep,
  setLoading,
  setError,
  isMessagering,
  shippingMethod,
  originPostalCode,
  destinyPostalCode,
  setRate,
}) => {
  const formatedItem = typesOfShipping.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }));

  const [selected, setSelected] = useState(shippingType);

  const submitStep = () => {
    try {
      setLoading(true);
      setShippingType(selected);
      if (isMessagering) {
        api
          .resourceAction({
            resourceId: "shippings",
            actionName: "submitStep",
            data: {
              step: 4,
              originPostalCode,
              destinyPostalCode,
              typeOfShipping: selected?.id,
              shippingMethod,
            },
          })
          .then((res) => {
            if (res.data.error) {
              return setError(res.data.error);
            }
            if (res.data.result) {
              setRate(res.data.result);
              return setNextStep({ nextStep: 6 });
            }
          });
      } else {
        return setNextStep();
      }
    } catch (error) {
      return setError("Error al obtener los tipos de envío");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomContainer>
      <FormGroup>
        <Label>Método de envío</Label>
        <Select
          options={formatedItem}
          placeholder="Selecciona un método de envío"
          onChange={setSelected}
          defaultValue={selected}
        />
      </FormGroup>
      <StepControllers
        disabledNext={!selected}
        onNext={submitStep}
        onPrev={onPrev}
      />
    </CustomContainer>
  );
};

export default FourthStep;
