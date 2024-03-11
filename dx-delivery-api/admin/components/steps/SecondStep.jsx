import React, { useState } from "react";
import { ApiClient } from "adminjs";
import Select from "react-select";
import { FormGroup, Input, Label, Box, CheckBox } from "@adminjs/design-system";
import styled from "styled-components";
import StepControllers from "../StepControllers";

const api = new ApiClient();

const departments = [
  { value: "Artigas", label: "Artigas" },
  {
    value: "Canelones (Sin cobertura)",
    label: "Canelones (Sin cobertura)",
  },
  { value: "Cerro Largo", label: "Cerro Largo" },
  { value: "Colonia", label: "Colonia" },
  { value: "Durazno", label: "Durazno" },
  { value: "Flores", label: "Flores" },
  { value: "Florida", label: "Florida" },
  { value: "Lavalleja", label: "Lavalleja" },
  { value: "Maldonado", label: "Maldonado" },
  { value: "Paysandú", label: "Paysandú" },
  { value: "Río Negro", label: "Río Negro" },
  { value: "Rivera", label: "Rivera" },
  { value: "Rocha", label: "Rocha" },
  { value: "Salto", label: "Salto" },
  { value: "San José", label: "San José" },
  { value: "Soriano", label: "Soriano" },
  { value: "Tacuarembó", label: "Tacuarembó" },
  { value: "Treinta y Tres", label: "Treinta y Tres" },
];

const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AlignLeftContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const MvdForm = ({
  search,
  onChange,
  loading,
  streetFloor,
  setStreetFloor,
  neighbourhoods,
  destination,
  setNeighborhood,
}) => {
  return (
    <>
      <FormGroup>
        <Label>Dirección</Label>
        <Input
          value={search}
          type="text"
          onChange={onChange}
          disabled={loading}
          placeholder="Defensa 1917"
        />
      </FormGroup>
      <FormGroup>
        <Label>Apartamento/Casa</Label>
        <Input
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
          options={neighbourhoods}
          placeholder="Selecciona un barrio"
          onChange={setNeighborhood}
          defaultValue={destination?.neighborhood}
        />
      </FormGroup>
    </>
  );
};

const PickUpForm = ({ setDestination, destination, pickupCenters }) => {
  const formatedPickupCenters = pickupCenters?.map((center) => ({
    ...center,
    value: center.id,
    label: center.name,
  }));
  return (
    <FormGroup>
      <Label>Sucursal</Label>
      <Select
        options={formatedPickupCenters}
        onChange={setDestination}
        defaultValue={destination}
      />
    </FormGroup>
  );
};

const AgencyForm = ({
  city,
  setCity,
  loading,
  pickupInAgency,
  setPickUpInAgency,
  streetName,
  streetFloor,
  setStreetName,
  setStreetFloor,
  setDepartment,
  destination,
}) => {
  return (
    <AlignLeftContainer>
      <FormGroup>
        <Label>Departamento</Label>
        <Select
          options={departments}
          onChange={setDepartment}
          defaultValue={destination?.department}
        />
      </FormGroup>
      <FormGroup>
        <Label>City</Label>
        <Input
          value={city}
          type="text"
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />
      </FormGroup>
      <Box
        flexDirection="row"
        marginRight={15}
        marginBottom={10}
        alignItems="center"
      >
        <CheckBox
          id="pickUpInAgency"
          checked={pickupInAgency}
          onChange={() => setPickUpInAgency(!pickupInAgency)}
        />
        <Label inline htmlFor="pickUpInAgency" ml="default">
          Retira en agencia
        </Label>
      </Box>
      {!pickupInAgency && (
        <>
          <FormGroup>
            <Label>Dirección</Label>
            <Input
              value={streetName}
              type="text"
              onChange={(e) => setStreetName(e.target.value)}
              disabled={loading}
              placeholder="Defensa 1917"
            />
          </FormGroup>
          <FormGroup>
            <Label>Apartamento/Casa</Label>
            <Input
              value={streetFloor}
              type="text"
              onChange={(e) => setStreetFloor(e.target.value)}
              disabled={loading}
              placeholder="Ej: Apto 900"
            />
          </FormGroup>
        </>
      )}
    </AlignLeftContainer>
  );
};

const SecondStep = ({
  setDestination,
  setError,
  setNextStep,
  loading,
  disabledPrev,
  setLoading,
  onPrev,
  neighbourhoods,
  destination,
  destinationType,
  setDestinationType,
  pickupInAgency,
  setPickUpInAgency,
  city,
  setCity,
  origin,
  setShippingType,
  setPosibilities,
  isMvd,
  isAgency,
  isPickup,
  pickupCenters,
}) => {
  const [search, setSearch] = useState(
    destination?.streetName && destination?.streetNumber
      ? `${destination?.streetName} ${destination?.streetNumber}`
      : ""
  );
  const onChange = async (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
  };

  const [department, setDepartment] = useState(destination?.department);
  const [neighborhood, setNeighborhood] = useState(destination?.neighborhood);

  const [streetName, setStreetName] = useState(
    destination?.streetName && destination?.streetNumber
      ? `${destination?.streetName} ${destination?.streetNumber}`
      : destination?.streetName || ""
  );
  const [streetFloor, setStreetFloor] = useState(
    destination?.streetFloor || ""
  );
  const [pickupDestination, setPickupDestination] = useState(destination);

  const submitDestination = () => {
    try {
      setLoading(true);
      api
        .resourceAction({
          resourceId: "shippings",
          actionName: "submitStep",
          data: {
            step: 2,
            input: search,
            neighborhood,
            destinationType,
            originPostalCode: origin?.postalCode,
            isAgency,
            isPickup,
            pickupDestination,
          },
        })
        .then((res) => {
          if (res.data.error) {
            return setError(res.data.error);
          }
          if (res.data.posibilities) {
            if (isPickup) {
              setShippingType("PICK_UP");
              setDestination(pickupDestination);
              setPosibilities(res.data.posibilities);
              return setNextStep();
            }

            if (isAgency) {
              setDestination({
                streetFloor,
                streetName,
                department: department?.value,
                city,
              });
              setShippingType("AGENCY");
              setPosibilities(res.data.posibilities);
              return setNextStep();
            }

            if (res.data.result) {
              setDestination({ ...res.data.result, streetFloor });
              setPosibilities(res.data.posibilities);
              return setNextStep();
            }
          }
        });
    } catch (error) {
      return setError("Error al envíar la dirección");
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    await submitDestination();
  };

  const disabledMvd = isMvd && (!search || !neighborhood);
  const disabledPickUp = isPickup && !pickupDestination;
  const disabledAgency =
    isAgency && (!department || !city || (!pickupInAgency && !streetName));

  const disableNext = disabledMvd || disabledPickUp || disabledAgency;

  const toggleCheckBox = (_destinationType) => {
    setDestination(null);
    setPickupDestination(null);
    setDestinationType(_destinationType);
  };

  return (
    <Box marginTop={20}>
      <Box flex flexDirection="column" marginBottom={20}>
        <Box flexDirection="column" marginRight={15} marginBottom={10}>
          <CheckBox
            id="isMvd"
            checked={isMvd}
            onChange={() => toggleCheckBox("MVD")}
          />
          <Label inline htmlFor="isMvd" ml="default">
            Montevideo o Canelones
          </Label>
        </Box>
        <Box flexDirection="column" marginRight={15} marginBottom={10}>
          <CheckBox
            id="isPickup"
            checked={isPickup}
            onChange={() => toggleCheckBox("PICK_UP")}
          />
          <Label inline htmlFor="isPickup" ml="default">
            Pick up
          </Label>
        </Box>
        <Box flexDirection="column" marginRight={15} marginBottom={10}>
          <CheckBox
            id="agency"
            checked={isAgency}
            onChange={() => toggleCheckBox("AGENCY")}
          />
          <Label inline htmlFor="agency" ml="default">
            Al interior
          </Label>
        </Box>
      </Box>
      <CustomContainer>
        {isAgency && (
          <AgencyForm
            city={city}
            setCity={setCity}
            loading={loading}
            setPickUpInAgency={setPickUpInAgency}
            streetName={streetName}
            streetFloor={streetFloor}
            setStreetName={setStreetName}
            setStreetFloor={setStreetFloor}
            destination={destination}
            setDepartment={setDepartment}
            department={department}
            destination={destination}
            pickupInAgency={pickupInAgency}
          />
        )}
        {isMvd && (
          <MvdForm
            onChange={onChange}
            loading={loading}
            search={search}
            streetFloor={streetFloor}
            setStreetFloor={setStreetFloor}
            neighbourhoods={neighbourhoods}
            setNeighborhood={setNeighborhood}
            destination={destination}
          />
        )}
        {isPickup && (
          <PickUpForm
            setDestination={setPickupDestination}
            destination={pickupDestination}
            pickupCenters={pickupCenters}
          />
        )}
        <StepControllers
          disabledPrev={disabledPrev}
          disabledNext={disableNext}
          onNext={submit}
          onPrev={onPrev}
        />
      </CustomContainer>
    </Box>
  );
};

export default SecondStep;
