import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { ApiClient, ActionHeader, withNotice, useTranslation } from "adminjs";
import {
  Loader,
  Drawer,
  DrawerContent,
  DrawerFooter,
  Box,
  Button,
  Icon,
} from "@adminjs/design-system";

import styled from "styled-components";

const REFRESH_KEY = "refresh";
const IGNORE_PARAMS_KEY = "ignore_params";

const appendForceRefresh = (url, search) => {
  //Clean URL to redirect
  const searchParamsIdx = url.lastIndexOf("?");
  const urlSearchParams =
    searchParamsIdx !== -1 ? url.substring(searchParamsIdx + 1) : null;

  const oldParams = new URLSearchParams(
    search ?? urlSearchParams ?? window.location.search ?? ""
  );
  const shouldIgnoreOldParams =
    new URLSearchParams(urlSearchParams || "").get(IGNORE_PARAMS_KEY) ===
    "true";
  const newParams = shouldIgnoreOldParams
    ? new URLSearchParams("")
    : new URLSearchParams(oldParams.toString());

  newParams.set(REFRESH_KEY, "true");

  const newUrl =
    searchParamsIdx !== -1 ? url.substring(0, searchParamsIdx) : url;

  return `${newUrl}?${newParams.toString()}`;
};

const api = new ApiClient();

const RiderCard = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  min-height: 76px;
  justify-content: center;
  fontsize: 12px;
  color: black;
  border-width: 1px;
  border-style: solid;
  border-color: #ebedff;
  box-shadow: 0px 4px 4px 0px rgba(25, 97, 204, 0.05);
  align-items: center;
  max-width: 300px;
  margin: auto;
  margin-bottom: 10px;
  ${({ active }) =>
    active &&
    `
  border-color: #31E118;
`};
`;

const Row = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0px 5px;
  width: 100%;
`;

const RiderText = styled(Box)`
  font-weight: 500;
  font-size: 14;
  color: #001847;
  flex: 1;
  text-align: center;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const CustomDrawer = styled(DrawerContent)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MotorcycleImage = styled.img`
  width: 28px;
`;

const AssignRider = (props) => {
  const { resource, records, action, addNotice, history } = props;
  const [loading, setLoading] = useState(true);
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const { translateMessage } = useTranslation();

  useEffect(() => {
    // Get rirders
    api
      .resourceAction({ resourceId: "shippings", actionName: "assignRider" })
      .then((response) => {
        setRiders(response.data.riders);
        setLoading(false);
      });
  }, [api]);

  const submit = () => {
    setLoading(true);
    const api = new ApiClient();
    const recordIds = records.map((r) => r.id);

    // Call bulk action in shippings.admin
    api
      .bulkAction({
        resourceId: resource.id,
        actionName: action.name,
        recordIds,
        selectedRider,
        method: "post",
        data: { selectedRider },
      })
      .then((response) => {
        setLoading(false);
        if (response.data.notice) {
          addNotice(response.data.notice);
        }
        if (response.data.redirectUrl) {
          // Redirect URL and clean URL params
          const search = new URLSearchParams(window.location.search);
          search.delete("recordIds");
          history.push(
            appendForceRefresh(response.data.redirectUrl, search.toString()),
            {
              previousPage: window.location.href,
            }
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        addNotice({
          message: translateMessage("errorToAssignRider", resource.id),
          type: "error",
        });
        throw error;
      });
  };

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <Drawer>
      <CustomDrawer>
        {action?.showInDrawer && <ActionHeader omitActions {...props} />}
        {riders?.length &&
          riders.map((rider) => {
            return (
              <RiderCard
                key={rider.id}
                onClick={() => {
                  setSelectedRider(rider.id);
                }}
                active={selectedRider === rider.id}
              >
                <Row>
                  <MotorcycleImage
                    src="/assets/motorcycle.png"
                    alt="motorcycle"
                  />
                  <RiderText>{rider.name}</RiderText>
                </Row>
              </RiderCard>
            );
          })}
      </CustomDrawer>
      <DrawerFooter>
        <Button variant="primary" onClick={submit} disabled={!selectedRider}>
          Guardar
        </Button>
      </DrawerFooter>
    </Drawer>
  );
};

const FormattedAssignRider = withNotice(withRouter(AssignRider));

export default FormattedAssignRider;
