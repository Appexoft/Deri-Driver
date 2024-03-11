const AdminBro = require("adminjs");
const AdminBroSequelize = require("@adminjs/sequelize");

AdminBro.registerAdapter(AdminBroSequelize);

const AdminUser = require("./entities/user.admin");
const AdminShipping = require("./entities/shipping.admin");
const AdminBusiness = require("./entities/business.admin");
const DeliveryZone = require("./entities/DeliveryZone.admin");
const ShippingMl = require("./entities/ShippingMl.admin");
const Rider = require("./entities/rider.admin");
const PostalCode = require("./entities/postalcode.admin.js");
const ShippingRate = require("./entities/shippingrate.admin.js");
const PackagePrice = require("./entities/PackagePrice.admin");
const PackageType = require("./entities/PackageType.admin");
const Agency = require("./entities/Agency.admin");
const Parameter = require("./entities/Parameter.admin");
const Company = require("./entities/Company.admin");
const Branch = require("./entities/Branch.admin");
const PostalZone = require("./entities/PostalZone.admin");
const ShippingType = require("./entities/ShippingType.admin");
const CompanyMl = require("./entities/CompanyMl.admin");
const BusinessMl = require("./entities/BusinessMl.admin");

const options = {
  resources: [
    AdminUser,
    AdminShipping,
    AdminBusiness,
    BusinessMl,
    DeliveryZone,
    ShippingMl,
    Rider,
    PostalCode,
    ShippingRate,
    PackagePrice,
    PackageType,
    Agency,
    Parameter,
    Company,
    CompanyMl,
    Branch,
    PostalZone,
    ShippingType,
  ],
  branding: {
    companyName: "Deri",
    logo: "/assets/logo-deri.png",
    softwareBrothers: false,
  },
  locale: {
    translations: {
      messages: {
        loginWelcome: "",
        invalidCredentials: "Usuario y/o contraseña incorrectos",
        errorToAssignRider: "Error al asignar un conductor",
        successfullyRiderAssigned:
          "El conductor fue asignando correctamente a {{count}} pedidos",
      },
      labels: {
        loginWelcome: "Panel de administración",
        users: "Usuarios",
        shippings: "Envíos",
        businesses: "Tiendas/Comercios",
        delivery_zones: "Zonas",
        riders: "Conductores",
        postal_codes: "Códigos Postales",
        shipping_rates: "Tarifas",
        package_prices: "Precio Paquetes",
        parameters: "Parametros",
        companies: "Compañías",
        companies_ml: "Compañías ML",
        branches: "Sucursales",
        postal_codes_delivery_zones: "Zonas/Código postal",
        shipping_types: "Tipos de pedido",
        package_types: "Tipo Paquetes",
        shippings_ml: "Pedidos desde ML",
        businesses_ml: "Tiendas/Comercios ML"
      },
      actions: {
        new: "Nuevo",
        edit: "Editar",
        show: "Detalle",
        delete: "Eliminar",
        filter: "Buscar",
        bulkDelete: "Eliminar",
        remove: "Eliminar",
        exportToExcel: "Descargar Excel",
        importFromExcel: "Importar desde excel",
        assignRider: "Elegir cadete",
      },
      properties: {
        name: "Nombre",
        phone: "Teléfono",
        state: "Estado",
        type: "Tipo",
        details: "Detalles",
        comments: "Comentarios",
        email: "Correo",
        password: "Contraseña",
        ci: "Doc. de Identidad",
        role: "Rol",
        documentId: "Documento",
        client: "Nombre de cliente",
        RiderId: "Repartidor",
        ClientId: "Cliente",
        number: "Número",
        BusinessId: "Tienda/Comercio",
        DeliveryZoneId: "Zona",
        originStreet: "Calle de Origen",
        originFloor: "Nro. de Apto/ Casa de Origen",
        originNumber: "Número de Origen",
        originLocation: "Geolocalización de Origen",
        originPostalCode: "Código Postal de Origen",
        originCity: "Ciudad de Origen",
        destinyStreet: "Calle de Destino",
        destinyFloor: "Nro. de Apto/ Casa de Destino",
        destinyNumber: "Número de Destino",
        destinyLocation: "Geolocalización de Destino",
        destinyPostalCode: "Código Postal de Destino",
        destinyCity: "Ciudad de Destino",
        fullAddress: "Dirección",
        createdAt: "Fecha de creación",
        clientDni: "Cédula del cliente",
        neighbourhood: "Barrio",
        DestinyZoneId: "Zona de destino",
        OriginZoneId: "Zona de origen",
        packageSize: "Tamaño del paquete",
        isClose: "Cerrado",
        price: "Precio",
        date: "Fecha",
        typeOfShipping: "Tipo de envío",
        businessName: "Razón social",
        code: "Código postal",
        ShippingRateId: "Tarifa",
        finishAt: "Límite de envío",
        shippingMethod: "Método de envío",
        day: "Día de la semana",
        key: "Nombre del parametro",
        value: "Valor",
        description: "Descripción",
        enableCollection: "Habilitar cobranza",
        AgencyId: "Agencia",
        collectionAmount: "Monto (Cobranza)",
        pickupInAgency: "Retirar en agencia",
        destinyDepartment: "Departamento de destino (Al interior)",
        referredCode: "Código de referido",
        streetName: "Calle",
        streetFloor: "Piso",
        streetNumber: "Número",
        city: "Ciudad",
        serviceHours: "Horario de atención",
        PostalCodeId: "Barrio",
        CompanyId: "Compañía",
        icon: "Ícono",
        capacity: "Capacidad",
        BranchId: "Sucursal"
      },
      buttons: {
        save: "Guardar",
        confirmRemovalMany_1: "Eliminación de registros",
        confirmRemovalMany_2: "Confirma eliminar {{count}} registros",
      },
    },
  },
  assets: {
    styles: ["/css/styles.css"],
  },
};

module.exports = options;
