const excelJS = require("exceljs");
const { v4: uuidv4 } = require("uuid");

const generateExcel = async (title, columns = [], content = []) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet(title);
  const filename = uuidv4();
  const path = `/uploads/${filename}.xlsx`;

  worksheet.columns = columns;

  content.forEach((data) => {
    worksheet.addRow(data);
  });

  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workbook.xlsx.writeFile(`public${path}`);
    return {
      path,
    };
  } catch (error) {
    console.log("err", error);
  }
};

const shippingExcel = [
  {
    header: "Numero",
    key: "number",
    width: 10,
  },
  {
    header: "Fecha",
    key: "date",
    width: 20,
  },
  {
    header: "Cliente",
    key: "client",
    width: 20,
  },
  {
    header: "Empresa",
    key: "businessName",
    width: 20,
  },
  {
    header: "Tipo",
    key: "type",
    width: 15,
  },
  {
    header: "Zona",
    key: "deliveryZone",
    width: 20,
  },
  {
    header: "Precio",
    key: "price",
    width: 10,
  },
  {
    header: "Repartidor",
    key: "delivery",
    width: 20,
  },
  {
    header: "Estado",
    key: "state",
    width: 15,
  },
  {
    header: "Dirección",
    key: "address",
    width: 30,
  },
  {
    header: "Comentarios",
    key: "comments",
    width: 30,
  },
];

const convertExcelToJson = async (excelFile) => {
  const spanishToEnglish = {
    "Calle origen": "originStreet",
    "Numero de origen": "originNumber",
    "Numero de puerta de origen": "originFloor",
    "Ciudad de origen": "originCity",
    "Calle destino": "destinyStreet",
    "Numero de destino": "destinyNumber",
    "Numero de puerta de destino": "destinyFloor",
    "Ciudad de destino": "destinyCity",
    "Tipo de pedido": "method",
    "Tipo de envío": "type",
    "Nombre de destinatario": "client",
    "Telefono": "phone",
    "Comentario": "details",
    "Retira en agencia": "pickupInAgency",
    "Monto a cobrar": "collectionAmount"
  };

  try {
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(excelFile);

    const worksheet = workbook.getWorksheet(1);
    const jsonData = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        return;
      }

      const rowData = {};
      row.eachCell((cell, colNumber) => {
        const columnHeader = worksheet.getRow(1).getCell(colNumber).value;
        const englishHeader = spanishToEnglish[columnHeader] || columnHeader;
        rowData[englishHeader] = cell.value;
      });

      jsonData.push(rowData);
    });

    return jsonData;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};


module.exports = { generateExcel, shippingExcel,convertExcelToJson };
