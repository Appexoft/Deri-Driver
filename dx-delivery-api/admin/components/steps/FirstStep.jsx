import React, { useState } from "react";
import { ApiClient } from "adminjs";
import { FormGroup, Input, Label, Box } from "@adminjs/design-system";
import Select from "react-select";
import StepControllers from "../StepControllers";
import styled from "styled-components";

const api = new ApiClient();

const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FirstStep = ({
  setOrigin,
  setError,
  setNextStep,
  loading,
  setLoading,
  origin,
  disabledPrev = false,
  neighbourhoods = [],
}) => {
  const [neighborhood, setNeighborhood] = useState(origin?.neighborhood);
  const [streetFloor, setStreetFloor] = useState(origin?.streetFloor || "");
  const [search, setSearch] = useState(
    origin?.streetName && origin?.streetNumber
      ? `${origin?.streetName} ${origin?.streetNumber}`
      : ""
  );

  const onChange = async (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
  };

  const submit = () => {
    try {
      setLoading(true);
      api
        .resourceAction({
          resourceId: "shippings",
          actionName: "submitStep",
          data: { step: 1, input: search, neighborhood },
        })
        .then((res) => {
          if (res.data.error) {
            return setError(res.data.error);
          }
          if (res.data.result) {
            setOrigin({ ...res.data.result, streetFloor });
            return setNextStep();
          }
        });
    } catch (error) {
      return setError("Error al envíar la dirección");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CustomContainer>
        <FormGroup>
          <Label>Dirección</Label>
          <Input
            id="origin"
            value={search}
            type="text"
            onChange={onChange}
            disabled={loading}
            placeholder="Ej: Defensa 1917"
          />
        </FormGroup>
        <FormGroup>
          <Label>Apartamento/Casa</Label>
          <Input
            id="origin"
            value={streetFloor}
            type="text"
            onChange={(e) => setStreetFloor(e.target.value)}
            disabled={loading}
            placeholder="Ej: Apto 900"
          />
        </FormGroup>
        <FormGroup>
          <Label>Barrio</Label>
          <Select
            defaultValue={origin?.neighborhood}
            options={neighbourhoods}
            placeholder="Selecciona un barrio"
            onChange={setNeighborhood}
          />
        </FormGroup>
        <StepControllers
          disabledPrev={disabledPrev}
          disabledNext={!search || loading || !neighborhood}
          onNext={submit}
        />
      </CustomContainer>
    </Box>
  );
};

export default FirstStep;
