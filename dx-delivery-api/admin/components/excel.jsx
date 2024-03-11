import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";
import { Loader } from "@adminjs/design-system";

const api = new ApiClient();

const Excel = () => {
  const [download, setDownload] = useState(null);

  useEffect(() => {
    api
      .resourceAction({ resourceId: "shippings", actionName: "exportToExcel" })
      .then((response) => {
        window.location.href = response.data.path;
        setDownload(true);
      });
  }, [api]);

  useEffect(() => {
    if (download) {
      setTimeout(() => {
        api
          .resourceAction({
            resourceId: "shippings",
            actionName: "deleteExcel",
          })
          .then((response) => {
            window.location.href = response.data.redirectUrl;
          });
      }, 1000);
    }
  }, [download]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Loader />
    </div>
  );
};

export default Excel;
