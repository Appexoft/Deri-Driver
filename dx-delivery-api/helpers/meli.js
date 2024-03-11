const https = require("https");
const { meliLogger } = require("../helpers/logger");
const { decrypt } = require('../helpers/encrypt');

function getRedirectUri(fallbackHost) {
  return process.env.MELI_REDIRECT_URL ?? `https://${fallbackHost}/api/meli`;
}

function buildMLAuthenticationLink({ credentials, businessId, companyId, currentHost }) {
  const redirectUri = getRedirectUri(currentHost);
  const clientId = credentials.clientId;

  const state = `${businessId},${companyId}`;

  const baseUrl = 'https://auth.mercadolibre.com.uy/authorization';
  const queryParams = `?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

  return `${baseUrl}${queryParams}`;
}

function validateMLCode({ code, currentHost, credentials }) {
  const data = JSON.stringify({
    grant_type: "authorization_code",
    client_id: credentials.clientId,
    client_secret: decrypt(credentials.clientSecret),
    redirect_uri: getRedirectUri(currentHost),
    code,
  });

  const options = {
    hostname: process.env.MELI_HOSTNAME,
    port: process.env.MELI_PORT,
    path: "/oauth/token",
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  return resolver("meliNewToken", options, data);
}

function refreshMLToken({ refreshToken, credentials }) {
  const data = JSON.stringify({
    grant_type: "refresh_token",
    client_id: credentials.clientId,
    client_secret: decrypt(credentials.clientSecret),
    refresh_token: refreshToken,
  });

  const options = {
    hostname: process.env.MELI_HOSTNAME,
    port: process.env.MELI_PORT,
    path: "/oauth/token",
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  return resolver("meliRefreshToken", options, data);
}

async function meliGetShipping(token, shippingId, resource) {
  const options = {
    hostname: process.env.MELI_HOSTNAME,
    port: process.env.MELI_PORT,
    path: resource || `/shipments/${shippingId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  return resolver("meliGetShipping", options, null);
}

async function meliShippingGetPdf(token, shippingId) {
  const options = {
    hostname: process.env.MELI_HOSTNAME,
    port: process.env.MELI_PORT,
    path: `/shipment_labels?shipment_ids=${shippingId}&savePdf=Y`,
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + token,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = [];

      res.on("error", reject);
      res.on("end", function () {
        // eslint-disable-next-line no-undef
        data = Buffer.concat(data);
        resolve(data);
      });

      res.on("data", function (chunk) {
        data.push(chunk);
      });
    });

    req.on("error", (error) => {
      meliLogger.error("meliShippingGetPdf - onError", { error });
      reject(error);
    });

    req.end();
  });
}

const resolver = (topic, options, data) =>
  new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("error", reject);
      res.on("data", (data) => (body += data));
      res.on("end", async () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          const jsonObject = JSON.parse(body);
          resolve(jsonObject);
        } else {
          meliLogger.error(topic, { body, statusCode: res.statusCode });
          reject(
            `Request failed. status: ${res.statusCode}, body:  ${body}`
          );
        }
      });
    });
    req.on("error", (error) => {
      meliLogger.error(`${topic} - onError`, { error });
      reject(error);
    });
    if (data) req.write(data);
    req.end();
  });

module.exports = {
  meliGetShipping,
  meliShippingGetPdf,
  buildMLAuthenticationLink,
  validateMLCode,
  refreshMLToken,
};
