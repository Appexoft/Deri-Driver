import React, { useState } from "react";
import { Box, ValueGroup } from "@adminjs/design-system";
import styled from "styled-components";
import StepControllers from "../StepControllers";

const CustomContainer = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SeventhStep = ({ onPrev, submitStep, shippingDetails, loading }) => {
  return (
    <CustomContainer>
      <Box style={{ width: "100%", justifyContent: "flex-start" }}>
        {shippingDetails.clientName && (
          <ValueGroup
            label="Nombre del cliente"
            value={shippingDetails.clientName}
          />
        )}
        <ValueGroup
          label="Nombre del destinatario"
          value={shippingDetails.receiverName}
        />
        {shippingDetails.receiverPhone && (
          <ValueGroup
            label="Teléfono del destinatario"
            value={shippingDetails.receiverPhone}
          />
        )}
        <ValueGroup label="Monto" value={`$${shippingDetails.amount}`} />
        {shippingDetails.comments && (
          <ValueGroup label="Comentarios" value={shippingDetails.comments} />
        )}
        {shippingDetails.destinationAddress && (
          <ValueGroup
            label="Dirección de destino"
            value={shippingDetails.destinationAddress}
          />
        )}
        <ValueGroup
          label="Fecha de entrega"
          value={shippingDetails.deliveryDate}
        />
      </Box>
      <StepControllers
        onNext={submitStep}
        onPrev={onPrev}
        disabledNext={loading}
      />
    </CustomContainer>
  );
};

export default SeventhStep;
