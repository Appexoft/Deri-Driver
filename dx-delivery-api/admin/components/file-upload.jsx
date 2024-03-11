import React, { useState, useEffect, useRef } from "react";
import { ApiClient } from "adminjs";
import { Loader, Box, Input,Button } from "@adminjs/design-system";

const api = new ApiClient();

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState({});
  const fileInputRef = useRef(null);

  const groupErrorsByIndex = (errors) => {
    const groupedErrors = {};
      errors.forEach((error) => {
        const { index, message } = error;
        if (!groupedErrors[index]) {
          groupedErrors[index] = [];
        }
        groupedErrors[index].push(message);
      });
      return groupedErrors;
  };

  const handleFileChange = async (e) => {
    try {
     setUploading(true);
     const file = e.target.files[0];
     const formData = new FormData();
     formData.append("file", file);

     const res = await api.resourceAction({
       resourceId: "shippings",
       actionName: "importFromExcel",
       data: formData,
       method: "post",
     })
     setResponse(res.data.data)
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fileInputRef.current.click();
  }, []);
  
  const colorStatus = response && response.success ? "#70C9B0" : "#FF4567";

  const styles = {
    input: {
      padding: "15px",
    },
    mainMessage: {
      color: colorStatus,
      fontSize: "24px",
      fontWeight: "bold",
      padding: "20px 0",
    },
    forOneFile: {
      padding: "5px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    error: {
      color: colorStatus,
      marginLeft: "10px",
    },
    button: {
      display: (response && response.success) || uploading ? "none" : "block"
    }
  };

  if (uploading && !response.success) {
      return <Box variant="white"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            width: "100%",
          }}
        >
          <Loader />
        </Box>
  }

  return (
    <Box variant="white" >
      <Button variant="danger" rounded
        onClick={handleChooseFileClick}
        style={styles.button}
      >
        Seleccione otro archivo
      </Button>
      <Input
        type="file"
        accept=".xls, .xlsx, .csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {response && response.message && <div style={styles.mainMessage} >{response.message} </div>}
      {response && response.errors && response.errors.length > 0 && (
        <div>
          {Object.keys(groupErrorsByIndex(response.errors)).map((index) => (
            <div style={styles.forOneFile} key={index}>
              <div style={styles.title} >Fila nro {index} contiene los siguientes errores:</div>
              <div>
                {groupErrorsByIndex(response.errors)[index].map((message, i) => (
                  <div style={styles.error} key={i}>{i+1}. {message}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};

export default FileUpload;
