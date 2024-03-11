import React from "react";
import { Badge, ValueGroup } from "@adminjs/design-system";
import styled from "styled-components";

const ShippingState = (props) => {
  const { record, property, where } = props;

  const isShow = where === "show";

  const MyCustomBadge = styled(Badge)`
    border: none;
    text-align: center;
    width: fit-content;
    display: ${isShow ? "inline" : "flex"};
    justify-content: center;
  `;

  const shippingStateColor = {
    TO_ASSIGN: { color: "#001847", background: "#e3d80b" },
    IN_PROGRESS: { color: "#FFFFFF", background: "#DD5F18" },
    IN_STORE: { color: "#FFFFFF", background: "#757FDE" },
    DELIVERY_IN_PROGRESS: { color: "#FFFFFF", background: "#DD5F18" },
    DELIVERED: { color: "#001847", background: "#31E118" },
    UNDELIVERED: { color: "#FFFFFF", background: "#DD2F18" },
    CANCELLED: { color: "#FFFFFF", background: "#FF0000" },
  };

  const item = property?.availableValues?.find(
    ({ value }) => value === record.params.state
  );

  const currentItem = shippingStateColor[item?.value];

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
