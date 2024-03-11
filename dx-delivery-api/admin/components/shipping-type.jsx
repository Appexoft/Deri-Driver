import React from "react";
import { Badge, ValueGroup } from "@adminjs/design-system";
import styled from "styled-components";

const ShippingState = (props) => {
  const { record, property, where } = props;

  const isShow = where === "show";

  const MyCustomBadge = styled(Badge)`
    border: none;
    text-align: center;
    display: ${isShow ? "inline" : "flex"};
    width: fit-content;
    justify-content: center;
  `;

  const shippingTypeColor = {
    MERCADO_LIBRE: { color: "#001847", background: "#fff158" },
    COMMON: { color: "#FFFFFF", background: "#DD5F18" },
    EXPRESS: { color: "#FFFFFF", background: "#757FDE" },
    PICK_UP: { color: "#FFFFFF", background: "#1961CC" },
    FLASH: { color: "#001847", background: "#31E118" },
    CHECK: { color: "#001847", background: "#e3d80b" },
    DEPOSIT: { color: "#FFFFFF", background: "#DD2F18" },
  };

  const item = property?.availableValues?.find(
    ({ value }) =>
      value === record.params.type || value === record.params.typeOfShipping
  );

  const currentItem = shippingTypeColor[item?.value];

  if (isShow) {
    return (
      <ValueGroup label={property.label}>
        <MyCustomBadge
          bg={currentItem.background}
          borderColor={currentItem.background}
          color={currentItem.color}
        >
          {item?.label}
        </MyCustomBadge>
      </ValueGroup>
    );
  }

  return (
    <MyCustomBadge
      bg={currentItem.background}
      borderColor={currentItem.background}
      color={currentItem.color}
    >
      {item?.label}
    </MyCustomBadge>
  );
};

export default ShippingState;
