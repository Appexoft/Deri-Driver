import React, { useState } from "react";
import { Box, Button } from "@adminjs/design-system";

const StepControllers = ({
  disabledPrev,
  disabledNext,
  onNext,
  onPrev,
  prevLabel = "Anterior",
  nextLabel = "Siguiente",
}) => {
  return (
    <Box mt="xl">
      <Button disabled={disabledPrev} mr="default" onClick={onPrev}>
        {prevLabel}
      </Button>
      <Button disabled={disabledNext} variant="primary" onClick={onNext}>
        {nextLabel}
      </Button>
    </Box>
  );
};

export default StepControllers;
