const { ShippingMl } = require("../models");

const QRCode = require("qrcode");
const fs = require("fs");
const pdf = require("html-pdf");

const { meliShippingGetPdf } = require("../helpers/meli");
const { meliGetToken } = require("../controllers/meli.controller");
const { logger } = require("../helpers/logger");

const generateMeliPdf = async (res, shipping, isAdmin, userId) => {
  // MELI PDF
  const shippingMl = await ShippingMl.findOne({
    where: { id: shipping.ShippingMlId },
  });
  if (!shippingMl) {
    return res.status(500).json({
      error: "Ocurrió un error al recuperar el envío de meli",
    });
  }
  if (
    !(isAdmin || shipping.RiderId === userId || shipping.ClientId === userId)
  ) {
    return res.status(403).json({
      error: "No tiene permisos para recuperar los datos del envío",
    });
  }
  const { clientMl } = shippingMl;
  const token = await meliGetToken(clientMl);
  if (token) {
    const data = await meliShippingGetPdf(token, shippingMl.idMl);
    if (data) {
      res.setHeader(
        "Content-Disposition",
        `inline; filename=${shipping.id}.pdf`
      );
      res.setHeader(
        "Content-Type",
        `application/pdf;charset=UTF-8; filename=${shipping.id}.pdf`
      );
      return res.end(data);
    } else {
      const message = `Sin datos para ${shippingMl.idMl}`;
      logger.error("getPdf", message);
      return res.status(500).send(message);
    }
  } else {
    const message = `Token inválido para el cliente ${clientMl}`;
    logger.error("getPdf", message);
    return res.status(500).send(message);
  }
};

const generateGpPdf = async (res, req, isAdmin, userId, shippings) => {
  const pdfToPrint = await Promise.all(
    shippings.map(async (shipping) => {
      // CUSTOM PDF
      if (!shipping) {
        return res.status(404).send("No se encontró el archivo solicitado");
      }

      if (shipping.ShippingMlId) {
        return res
          .status(400)
          .send(
            "No es posible imprimir pedidos de MercadoLibre de forma masiva"
          );
      }

      if (
        !(
          isAdmin ||
          shipping.RiderId === userId ||
          shipping.ClientId === userId
        )
      ) {
        return res.status(403).json({
          error: "No tiene permisos para recuperar los datos del envío",
        });
      }

      const proto = req.connection.encrypted ? "https" : "http";
      let host = `${proto}://${req.get("host")}`;

      const src = await QRCode.toDataURL(
        JSON.stringify({ gp_id: shipping.id }),
        {
          errorCorrectionLevel: "H",
        }
      )
        .then((url) => {
          if (process.env.NODE_ENV === "production") {
            host = `http://127.0.0.1:${process.env.PORT}`;
          }
          return url;
        })
        .catch((err) => {
          return res
            .status(500)
            .send("Ocurrió un error al generar el código QR " + err);
        });

      return { shipping, src, host };
    })
  );

  const content = pdfFormat(pdfToPrint);

  const firstItemId = shippings[0]?.id;

  const path = `./tmp/pdf/${firstItemId}.pdf`;
  pdf
    .create(content, {
      format: "A4",
    })
    .toFile(path, function (errPdf) {
      if (errPdf) {
        res.status(500).send("Ocurrió un error al generar el PDF " + errPdf);
      } else {
        res.setHeader(
          "Content-Disposition",
          `inline; filename=${firstItemId}.pdf`
        );
        const data = fs.readFileSync(path);
        res.contentType(
          `application/pdf;charset=UTF-8; filename=${firstItemId}.pdf`
        );
        res.send(data);
        fs.unlink(path, () => {});
      }
    });
};

const pdfFormat = (shippingsToPrint) => {
  const shippingsHtml = shippingsToPrint.map(({ shipping, src, host }) => {
    const receiverLabel = "Receptor";

    const data = shipping.AgencyId
      ? `
      <div>
          <span class="title">Remitente:</span>
          <span class="subtitle">
          <p>Nombre: ${shipping["Business.name"] ?? shipping["Client.name"]}<p/>
          <p>Teléfono: ${shipping["Client.phone"] ?? ""}<p/>
          </span>
      </div>
      <div class="separator"></div>
      <div>
          <span class="title">Receptor:</span>
          <span class="subtitle">
          <p>Nombre: ${shipping.client}<p/>
          <p>Teléfono: ${shipping.phone}<p/>
          </span>
      </div>
      <div class="separator"></div>
      <div>
        <span class="title">Destino:</span>
        <span class="subtitle">
          ${
            shipping.pickupInAgency
              ? `<p>Retira en: ${shipping["Agency.name"]}<p/>`
              : `<p>Agencia: ${shipping["Agency.name"]}<p/>`
          }
          <p>Departamento: ${shipping.destinyDepartment}<p/>
          <p>Ciudad: ${shipping.destinyCity}<p/>
          ${
            !shipping.pickupInAgency
              ? `<p class="p-dir">Dirección: ${shipping.destinyStreet} ${shipping.destinyNumber}<p/>`
              : ""
          }
          ${
            !shipping.pickupInAgency && shipping.destinyFloor
              ? `<p>Apto: ${shipping.destinyFloor}<p/>`
              : ""
          }
        </span>
      </div>
      ${
        shipping.details
          ? `<div class="separator"></div>
        <div>
            <span class="title">Descripción:</span>
            <span class="description">
            ${shipping.details}
            </span>
        </div>`
          : ""
      }
      `
      : `
      <div>
          <span class="title">${receiverLabel}:</span>
          <span class="subtitle"><p>${shipping.name}<p/></span>
      </div>
      <div class="separator"></div>
      <div>
          <span class="title">Celular:</span>
          <span class="subtitle"><p>${shipping.phone || ""}<p/></span>
      </div>
      <div class="separator"></div>
      <div>
          <span class="title">Dirección:</span>
          <span class="subtitle"><p class="p-dir">${shipping.destinyStreet} ${
          shipping.destinyNumber
        } ${shipping.destinyFloor}<p/></span>
      </div>
      <div class="separator"></div>
      <div>
          <span class="title">Remitente:</span>
          <span class="subtitle"><p>${
            shipping["Business.name"] ?? shipping["Client.name"]
          }<p/></span>
      </div>
      <div class="separator"></div>
      <div>
          <span class="title">Descripción:</span>
          <span class="description">${shipping.details || ""}</span>
      </div>
      `;

    return `
      <div class="outer">
        <div class="logo_container">
          <img class="logo" src="${host}/assets/logo-deri.png" alt="">
          <!-- <div class="phone_container">
            <img style="width: 14px;height: 14px;" src="${host}/assets/wpp.png" alt="">
            <span class="phone">${process.env.GESTION_CEL}</span>
          </div> -->
        </div>
        <div class="gestion-info">
          <!-- <div>
            <span class="font-bold">Tel:</span>
            <span>${process.env.GESTION_TEL}</span>
          </div>
          <div>
            <span class="font-bold">Dir:</span>
            <span>${process.env.GESTION_DIR}</span>
          </div>
          <div>
            <span>${process.env.GESTION_WEB}</span>
          </div> -->
          <div>
            <span>Ursec:OPE140</span>
          </div>
        </div>
        <div class="separator"></div>
        ${data}
        <div class="separator"></div>
        <div>
          <div class="bottom-container">
            <img class="qr" src="${src}" alt="">
            <span class="subtitle center" style="font-size: 10px;">${
              shipping["DeliveryNeighborhood.neighbourhood"]
              ? `${shipping["DeliveryNeighborhood.neighbourhood"]}, ${shipping.destinyCity}`
              : shipping.destinyCity
              }</span>
          </div>
          <!-- <div class="center">
            <span class="entregamos">Entregamos</span><span class="felicidad">felicidad</span>
          </div> -->
        </div>
      </div>
    `;
  });

  const content = `
  <!DOCTYPE html>
  <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap" rel="stylesheet">
      <style>
        .font-bold{
          font-weight: bold;
        }
         p{
          line-height:3px;
          margin-top:2px;
        }
        .p-dir{
          line-height:1.1!important;
           display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .qr {
          text-align: center;
          margin:auto;
          max-height: 80px;
          margin-bottom:0px;
        }
        .title{
          color: #061737;
          font-weight: 600;
          font-size: 8px;
          margin:0px;
          padding:0px;
        }
        .subtitle{
          color: #000000;
          font-weight: 400;
          font-size: 8px;
          margin:0px;
          padding:0px;
        }
        .description{
          color: #000000;
          font-size: 8px;
          margin-bottom:4px;
          line-height:0.1;
          margin:0px;
          padding:0px;
        }
        .outer{
          width: 250px;
          border-style: solid;
          border-color: #EBEDFF;
          border-width: 1px;
          padding: 4px;
          min-height: 385px;
          margin-bottom:3px;
          margin-top:3px;
        }
        .separator{
          border-bottom-style: solid;
          border-bottom-color: #EBEDFF;
          border-bottom-width: 1px;
          margin:0px;
        }
        .logo{
          height: 28px;
        }
        .entregamos{
          font-weight: 700;
          font-size: 10px;
          color: #061737;
        }
        .felicidad{
          font-weight: 700;
          font-size: 10px;
          color: #14A400;
          padding-left: 4px;
        }
        .center{
          text-align: center;
        }
        .logo_container{
          position: relative;
          width: 40px;
        }
        .phone_container{
          display: -webkit-flex;
          -webkit-flex-direction: row;
          -webkit-align-items:center;
          position: absolute;
          bottom: 0px;
          left: 24px;
        }
        .phone{
          font-size: 6px;
          position: absolute;
          padding-top:4px;
        }
        .gestion-info{
            padding-bottom: 5px;
          }
          .gestion-info span{
            font-size: 10px;
            display:inline-block
          }
          .gestion-info div {
           height: 14px;
        }
        .gestion-container{
          display: -webkit-flex;
          -webkit-flex-direction: row;
          -webkit-flex: 1;
          -webkit-justify-content: space-between;
          -webkit-flex-wrap: wrap;
          -webkit-align-items:center;
        }
        .bottom-container{
          display: -webkit-flex;
          -webkit-flex-direction: column;
          -webkit-align-items:center;
          -webkit-jusitify-content:center;
        }
      </style>
    </head>
    <body style="font-family: 'IBM Plex Sans', sans-serif">
        <div class="gestion-container">
        ${shippingsHtml.map((_shipping) => _shipping).join("")}
        </div>
    </body>
  </html>
  `;
  return content;
};

module.exports = {
  generateMeliPdf,
  generateGpPdf,
};
