import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { withNotice, ApiClient } from "adminjs";
import { Step, Box, Stepper } from "@adminjs/design-system";

import {
  FirstStep,
  SecondStep,
  ThirdStep,
  FourthStep,
  FifthStep,
  SixthStep,
  SeventhStep,
} from "./steps/index";

const api = new ApiClient();

const emptyPackages = {
  S: "",
  M: "",
  L: "",
};

const receiverForm = {
  name: "",
  phone: "",
  comments: "",
};

const CreateShipping = (props) => {
  const STEPS = [
    {
      number: 1,
      label: "Origen",
    },
    {
      number: 2,
      label: "Destino",
    },
    {
      number: 3,
      label: "Método",
    },
    {
      number: 4,
      label: "Tipo",
    },
    {
      number: 5,
      label: "Paquetes",
    },
    {
      number: 6,
      label: "Destinatario",
    },
    {
      number: 7,
      label: "Resúmen",
    },
  ];

  const [pickupCenters, setPickupCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [city, setCity] = useState("");
  const [pickedClient, setPickedClient] = useState();
  const [clients, setClients] = useState([]);
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [destinationType, setDestinationType] = useState("MVD");
  const [pickupInAgency, setPickUpInAgency] = useState(false);
  const [posibilities, setPosibilities] = useState([]);
  const [shippingMethod, setShippingMethod] = useState();
  const [shippingType, setShippingType] = useState();
  const [selectedPackages, setSelectedPackages] = useState(emptyPackages);
  const [receiver, setReceiver] = useState(receiverForm);
  const [rate, setRate] = useState();
  const [agency, setAgency] = useState();

  const isMvd = destinationType === "MVD";
  const isPickup = destinationType === "PICK_UP";
  const isAgency = destinationType === "AGENCY";

  const { addNotice } = props;

  const setError = (message) => {
    addNotice({
      message,
      type: "error",
    });
  };

  const setSuccess = (message) => {
    addNotice({
      message,
      type: "success",
    });
  };

  useEffect(() => {
    try {
      setLoading(true);
      // Get neighbourhoods and clients
      api
        .resourceAction({ resourceId: "shippings", actionName: "submitStep" })
        .then((response) => {
          setNeighbourhoods(response.data.neighborhoods);
          setClients(response.data.clients);
          setPickupCenters(response.data.pickupCenters);
        });
    } catch (error) {
      return setError("Error al cargar los barrios");
    } finally {
      setLoading(false);
    }
  }, [api]);

  const setNextStep = (props) => {
    const step = props?.nextStep || currentStep + 1;
    setCurrentStep(step);
  };

  const setPrevStep = (props) => {
    const step = props?.prevStep || currentStep - 1;
    setCurrentStep(step);
  };

  const hasPackages =
    selectedPackages &&
    Object.values(selectedPackages).reduce(
      (prev, current) => Number(prev) + Number(current),
      0
    ) > 0;

  const createShipping = () => {
    try {
      setLoading(true);
      api
        .resourceAction({
          resourceId: "shippings",
          actionName: "submitStep",
          data: {
            step: 7,
            client: receiver.name,
            phone: receiver.phone,
            origin,
            destination,
            comments: receiver.comments,
            type: isPickup ? "PICK_UP" : shippingType?.id,
            rate,
            pickupInAgency,
            neighborhood: destination.neighborhood?.value,
            method: shippingMethod,
            packages: hasPackages && [selectedPackages],
            agency: agency?.value,
            UserId: pickedClient?.value,
          },
        })
        .then((res) => {
          if (res.data.error) {
            return setError(res.data.error);
          }
          if (res.data.result) {
            setSuccess("Pedido creado correctamente");
            window.location.href = res.data.redirectUrl;
          }
        });
    } catch (error) {
      return setError("Error al envíar la dirección");
    } finally {
      setLoading(false);
    }
  };

  const isMessagering = shippingMethod?.id === "MESSAGERING";

  return (
    <Box variant="white">
      <Stepper>
        {STEPS.map(({ number, label }) => {
          const isCompleted = currentStep > number;
          const isActive = currentStep === number;
          return (
            <Step
              key={number}
              active={isActive}
              completed={isCompleted}
              onClick={(idx) => isCompleted && setCurrentStep(idx)}
              number={number}
              disabled={number === 5 && isMessagering}
            >
              {label}
            </Step>
          );
        })}
      </Stepper>
      {currentStep === 1 && (
        <FirstStep
          origin={origin}
          setError={setError}
          setNextStep={setNextStep}
          setOrigin={setOrigin}
          loading={loading}
          setLoading={setLoading}
          disabledPrev
          neighbourhoods={neighbourhoods}
        />
      )}
      {currentStep === 2 && (
        <SecondStep
          destination={destination}
          setError={setError}
          setNextStep={setNextStep}
          setDestination={setDestination}
          loading={loading}
          setLoading={setLoading}
          onPrev={setPrevStep}
          neighbourhoods={neighbourhoods}
          setDestinationType={setDestinationType}
          destinationType={destinationType}
          setShippingType={setShippingType}
          setPickUpInAgency={setPickUpInAgency}
          pickupInAgency={pickupInAgency}
          city={city}
          setCity={setCity}
          origin={origin}
          setPosibilities={setPosibilities}
          posibilities={posibilities}
          isMvd={isMvd}
          isPickup={isPickup}
          isAgency={isAgency}
          pickupCenters={pickupCenters}
        />
      )}
      {currentStep === 3 && (
        <ThirdStep
          setShippingMethod={setShippingMethod}
          shippingMethod={shippingMethod}
          shippingMethods={posibilities?.shippingMethods}
          onPrev={setPrevStep}
          setNextStep={setNextStep}
          isMvd={isMvd}
          isPickup={isPickup}
          isAgency={isAgency}
          setLoading={setLoading}
          destinationType={destinationType}
          destination={destination}
          origin={origin}
          setError={setError}
          setPosibilities={setPosibilities}
          posibilities={posibilities}
          setRate={setRate}
        />
      )}
      {currentStep === 4 && (
        <FourthStep
          setShippingType={setShippingType}
          shippingType={shippingType}
          typesOfShipping={posibilities?.typesOfShipping}
          onPrev={setPrevStep}
          setNextStep={setNextStep}
          setLoading={setLoading}
          setError={setError}
          isMessagering={isMessagering}
          originPostalCode={origin?.postalCode}
          destinyPostalCode={destination?.postalCode}
          shippingMethod={shippingMethod?.id}
          setRate={setRate}
        />
      )}
      {currentStep === 5 && (
        <FifthStep
          onPrev={() => setPrevStep(isPickup && { prevStep: 3 })}
          setNextStep={setNextStep}
          setLoading={setLoading}
          setError={setError}
          setSelectedPackages={setSelectedPackages}
          selectedPackages={selectedPackages}
          setRate={setRate}
          originPostalCode={origin?.postalCode}
          destinyPostalCode={destination?.postalCode}
          typeOfShipping={isPickup ? "PICK_UP" : shippingType?.id}
          shippingMethod={shippingMethod?.id}
        />
      )}
      {currentStep === 6 && (
        <SixthStep
          onPrev={() =>
            setPrevStep(isMessagering && { prevStep: isPickup ? 3 : 4 })
          }
          setNextStep={setNextStep}
          receiver={receiver}
          setReceiver={setReceiver}
          isAgency={isAgency}
          agencies={posibilities?.agencies}
          setAgency={setAgency}
          selectedAgency={agency}
          clients={clients}
          setPickedClient={setPickedClient}
          pickedClient={pickedClient}
        />
      )}
      {currentStep === 7 && (
        <SeventhStep
          onPrev={setPrevStep}
          submitStep={createShipping}
          shippingDetails={{
            receiverName: receiver?.name,
            receiverPhone: receiver?.phone,
            amount: rate?.totalAmount,
            comments: receiver?.comments,
            destinationAddress:
              destination?.streetName && destination?.streetNumber
                ? `${destination?.streetName} ${destination?.streetNumber}`
                : destination?.streetName || "",
            deliveryDate: rate?.date,
            clientName: pickedClient?.label,
          }}
          loading={loading}
        />
      )}
    </Box>
  );
};

const FormattedCreateShipping = withNotice(withRouter(CreateShipping));

export default FormattedCreateShipping;
