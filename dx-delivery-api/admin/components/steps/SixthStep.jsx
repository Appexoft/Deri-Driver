import React, { useState } from "react";
import { Box, FormGroup, Label, Input, TextArea } from "@adminjs/design-system";
import Select from "react-select";
import styled from "styled-components";
import StepControllers from "../StepControllers";

const CustomContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomTextArea = styled(TextArea)`
  width: 100%;
  resize: none;
`;

const SixthStep = ({
  onPrev,
  setNextStep,
  receiver,
  setReceiver,
  isAgency,
  agencies,
  setAgency,
  selectedAgency,
  clients,
  setPickedClient,
  pickedClient,
}) => {
  const [userData, setUserData] = useState(receiver);

  const formatedAgency = agencies?.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }));

  const onChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const submitStep = () => {
    setReceiver(userData);
    setNextStep();
  };

  const disabledNext =
    !userData.name || !userData.phone || (isAgency && !selectedAgency);

  return (
    <CustomContainer>
      <FormGroup>
        <Label>Cliente</Label>
        <Select
          options={clients}
          onChange={setPickedClient}
          defaultValue={pickedClient}
        />
      </FormGroup>
      <FormGroup>
        <Label>Nombre del destinatario</Label>
        <Input
          defaultValue={receiver?.name}
          id="name"
          type="text"
          onChange={(e) => onChange("name", e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Teléfono</Label>
        <Input
          defaultValue={receiver?.phone}
          id="phone"
          type="text"
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </FormGroup>
      {isAgency && (
        <FormGroup>
          <Label>Agencia</Label>
          <Select
            options={formatedAgency}
            onChange={setAgency}
            defaultValue={selectedAgency}
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label>Comentarios</Label>
        <CustomTextArea
          defaultValue={receiver?.comments}
          id="comments"
          type="text"
          onChange={(e) => onChange("comments", e.target.value)}
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

export default SixthStep;
