import React, { useState } from "react";
import { ApiClient } from "adminjs";
import { Box, FormGroup, Label, Input } from "@adminjs/design-system";
import styled from "styled-components";
import StepControllers from "../StepControllers";

const api = new ApiClient();

const CustomContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FifthStep = ({
  onPrev,
  setSelectedPackages,
  selectedPackages,
  setNextStep,
  setRate,
  originPostalCode,
  destinyPostalCode,
  setError,
  setLoading,
  typeOfShipping,
  shippingMethod,
}) => {
  const [packages, setPackages] = useState(selectedPackages);

  const setPackage = (name, value) => {
    setPackages({
      ...packages,
      [name]: Number(value),
    });
  };

  const disabledNext =
    packages &&
    Object.values(packages).reduce(
      (prev, current) => Number(prev) + Number(current),
      0
    ) <= 0;

  const submitStep = () => {
    try {
      setLoading(true);
      api
        .resourceAction({
          resourceId: "shippings",
          actionName: "submitStep",
          data: {
            step: 5,
            originPostalCode,
            destinyPostalCode,
            typeOfShipping,
            packages: JSON.stringify([packages]), // Expected input [{"S": 2, "L":3}]
            shippingMethod,
          },
        })
        .then((res) => {
          if (res.data.error) {
            return setError(res.data.error);
          }
          if (res.data.result) {
            setSelectedPackages(packages);
            setRate(res.data.result);
            return setNextStep();
          }
        });
    } catch (error) {
      return setError("Error al obtener el precio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomContainer>
      <FormGroup>
        <Label>S</Label>
        <Input
          id="S"
          value={packages.S}
          type="number"
          onChange={(e) => setPackage("S", e.target.value)}
          placeholder="Ej:3"
        />
      </FormGroup>
      <FormGroup>
        <Label>M</Label>
        <Input
          id="M"
          value={packages.M}
          onChange={(e) => setPackage("M", e.target.value)}
          type="number"
          placeholder="Ej:3"
        />
      </FormGroup>
      <FormGroup>
        <Label>L</Label>
        <Input
          id="L"
          value={packages.L}
          onChange={(e) => setPackage("L", e.target.value)}
          type="number"
          placeholder="Ej:3"
        />
      </FormGroup>
      <StepControllers
        onNext={submitStep}
        onPrev={onPrev}
        disabledNext={disabledNext}
      />
    </CustomContainer>
  );
};

export default FifthStep;
