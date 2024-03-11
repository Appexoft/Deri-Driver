import React, { useState } from "react";
import { ApiClient } from "adminjs";
import Select from "react-select";
import { Box, FormGroup, Label } from "@adminjs/design-system";
import styled from "styled-components";
import StepControllers from "../StepControllers";

const api = new ApiClient();

const CustomContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThirdStep = ({
  setShippingMethod,
  shippingMethod,
  shippingMethods,
  onPrev,
  setNextStep,
  setLoading,
  isAgency,
  isPickup,
  destinationType,
  origin,
  setError,
  destination,
  setPosibilities,
  posibilities,
  setRate,
}) => {
  const formatedItem = shippingMethods?.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }));

  const [selected, setSelected] = useState(shippingMethod);

  const submitStep = () => {
    try {
      setLoading(true);

      api
        .resourceAction({
          resourceId: "shippings",
          actionName: "submitStep",
          data: {
            step: 3,
            destinationPostalCode: destination?.postalCode,
            destinationType,
            originPostalCode: origin?.postalCode,
            isAgency,
            isPickup,
            shippingMethod: selected?.value,
          },
        })
        .then((res) => {
          if (res.data.error) {
            return setError(res.data.error);
          }
          if (isPickup) {
            setShippingMethod(selected);
            if (selected?.id === "MESSAGERING" && res.data.result) {
              setRate(res.data.result);
              return setNextStep({ nextStep: 6 });
            }
          }
          if (res.data.posibilities) {
            setShippingMethod(selected);
            setPosibilities({
              ...posibilities,
              typesOfShipping: res.data.posibilities.typesOfShipping,
            });
            if (isPickup) {
              return setNextStep({ nextStep: 5 });
            }
            return setNextStep();
          }
        });
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

export default ThirdStep;
