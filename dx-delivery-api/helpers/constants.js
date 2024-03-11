const roles = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  RIDER: "RIDER",
};

const typesList = [
  { value: "CLIENT", label: "Cliente" },
  { value: "RIDER", label: "Cadete" },
  { value: "ADMIN", label: "Administrador" },
];

const shippingState = {
  TO_ASSIGN: "TO_ASSIGN",
  IN_PROGRESS: "IN_PROGRESS",
  IN_STORE: "IN_STORE",
  DELIVERY_IN_PROGRESS: "DELIVERY_IN_PROGRESS",
  DELIVERED: "DELIVERED",
  UNDELIVERED: "UNDELIVERED",
  CANCELLED: "CANCELLED",
};

const shippingStateList = [
  { value: "TO_ASSIGN", label: "A asignar" },
  { value: "IN_PROGRESS", label: "En proceso" },
  { value: "IN_STORE", label: "En depósito" },
  { value: "DELIVERY_IN_PROGRESS", label: "En proceso de entrega" },
  { value: "DELIVERED", label: "Entregado" },
  { value: "UNDELIVERED", label: "No entregado" },
  { value: "CANCELLED", label: "Cancelado" },
];

const shippingType = {
  COMMON: "COMMON",
  EXPRESS: "EXPRESS",
  FLASH: "FLASH",
  PICK_UP: "PICK_UP",
  MERCADO_LIBRE: "MERCADO_LIBRE",
  CHECK: "CHECK",
  DEPOSIT: "DEPOSIT",
};

const Reasons = {
  THERE_IS_NO_ONE: "THERE_IS_NO_ONE",
  RESCHEDULED: "RESCHEDULED",
  REJECTED: "REJECTED",
  WRONG_ADDRESS: "WRONG_ADDRESS",
};

const shippingMethods = {
  MESSAGERING: "MESSAGERING",
  ORDER: "ORDER",
  COLLECTION: "COLLECTION",
};

const { THERE_IS_NO_ONE, RESCHEDULED, REJECTED, WRONG_ADDRESS } = Reasons;

const undeliveredReasons = [
  { name: "No hay nadie en el domicilio", id: THERE_IS_NO_ONE },
  {
    name: "Reprogramado por el comprador",
    id: RESCHEDULED,
  },
  {
    name: "Rechazado por el comprador",
    id: REJECTED,
  },
  {
    name: "Docimilio Incorrecto",
    id: WRONG_ADDRESS,
  },
];

const shippingMethodsList = [
  { value: "MESSAGERING", label: "Mensajería" },
  { value: "ORDER", label: "Paquete" },
  { value: "COLLECTION", label: "Cobranza" },
];

const dayOfWeekList = [
  { value: "Monday", label: "Lunes" },
  { value: "Tuesday", label: "Martes" },
  { value: "Wednesday", label: "Miércoles" },
  { value: "Thursday", label: "Jueves" },
  { value: "Friday", label: "Viernes" },
  { value: "Saturday", label: "Sábado" },
  { value: "Sunday", label: "Domingo" },
];

const shippingTypeList = [
  { value: "COMMON", label: "Común" },
  { value: "EXPRESS", label: "Express" },
  { value: "FLASH", label: "Flash" },
  { value: "PICK_UP", label: "Pick up" },
  { value: "MERCADO_LIBRE", label: "MELI" },
  { value: "CHECK", label: "Cheque a cobrar" },
  { value: "DEPOSIT", label: "Depósito" },
];

const packages = [
  { value: "L", label: "L" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
];

const {
  COMMON,
  EXPRESS,
  FLASH,
  PICK_UP,
  MERCADO_LIBRE,
  CHECK,
  DEPOSIT,
} = shippingType;
const {
  TO_ASSIGN,
  IN_PROGRESS,
  IN_STORE,
  DELIVERY_IN_PROGRESS,
  DELIVERED,
  UNDELIVERED,
} = shippingState;

const shippingTypeFilter = [
  {
    name: "Express",
    id: EXPRESS,
    description: "Obtén tu paquete en el mismo día",
  },
  {
    name: "Flash",
    id: FLASH,
    description: "Recibe tu pedido en menos de 2 horas",
  },
  {
    name: "Común",
    id: COMMON,
    description: "El envío se hará en el correr de la semana.",
  },
  {
    name: "Pick up",
    id: PICK_UP,
    description:
      "Pasarás a buscar tu pedido por alguna de nuestras sucursales.",
  },
  {
    name: "Mercado libre",
    id: MERCADO_LIBRE,
    description: "Pedidos obtenidos desde la API de mercadolibre.",
  },
  {
    name: "Depósito",
    id: DEPOSIT,
    description: "Depósito bancario",
  },
  {
    name: "Cheque a cobrar",
    id: CHECK,
    description: "Cheque a cobrar",
  },
];

const { MESSAGERING, ORDER, COLLECTION } = shippingMethods;

const shippingMethodsFilter = [
  {
    name: "Mensajería",
    id: MESSAGERING,
    description: "Servicio de entrega de cartas o sobres",
  },
  {
    name: "Paquete",
    id: ORDER,
    description: "Servicio de entrega de paquetería",
  },
  {
    name: "Cobranza",
    description: "El envío se hará en el correr de 24 hs hábiles",
    id: COLLECTION,
  },
];

const shippingSateFilter = [
  { name: "A asignar", id: TO_ASSIGN },
  { name: "En proceso", id: IN_PROGRESS },
  { name: "En depósito", id: IN_STORE },
  {
    name: "En proceso de entrega",
    id: DELIVERY_IN_PROGRESS,
  },
  { name: "Entregado", id: DELIVERED },
  { name: "No entregado", id: UNDELIVERED },
];

const stateTranslate = {
  TO_ASSIGN: "A asignar",
  IN_PROGRESS: "En proceso",
  IN_STORE: "En depósito",
  DELIVERY_IN_PROGRESS: "En proceso de entrega",
  DELIVERED: "Entregado",
  UNDELIVERED: "No entregado",
  CANCELLED: "Cancelado",
};

const typeTranslate = {
  COMMON: "Común",
  EXPRESS: "Express",
  FLASH: "Flash",
  PICK_UP: "Pick up",
  MERCADO_LIBRE: "MELI",
  CHECK: "Cheque a cobrar",
  DEPOSIT: "Depósito",
};

const pickupCenters = [
  {
    id: 1,
    name: "Tres cruces Defensa 1917 bis",
    address:
      "Defensa 1917, 11800 Montevideo, Departamento de Montevideo, Uruguay",
    city: "Montevideo",
    location: { lat: -34.893169, long: -56.1741727 },
    postalCode: "11800",
    streetFloor: "",
    streetName: "Defensa",
    streetNumber: "1917",
  },
  {
    id: 2,
    name: "Ciudad de la Costa Giannattasio Km 22,500 esq. Uruguay",
    address:
      "Av. Giannattasio km 22500, 15800 Ciudad de la Costa, Departamento de Canelones, Uruguay",
    city: "Ciudad de la Costa",
    location: { lat: -34.8312748, long: -55.974341 },
    postalCode: "15800",
    streetFloor: "",
    streetName: "Avenida Giannattasio",
    streetNumber: "km 22500",
  },
];

const additionalBaseTypes = {
  ADDITIONAL_BASE_M: "ADDITIONAL_BASE_M",
  ADDITIONAL_BASE_L: "ADDITIONAL_BASE_L",
};

const meliShippingStatus = {
  cancelled: "cancelled",
  delivered: "delivered",
  not_delivered: "not_delivered",
};

const meliShippingSubStatus = {
  delivery_failed: "delivery_failed",
};

const shippingsStateFilters = {
  ...shippingState,
  ALL: "ALL",
};

const serviceResult = ({
  error = false,
  message = "",
  statusCode = null,
  data = {},
}) => ({
  error,
  message,
  statusCode,
  data,
});

module.exports = {
  roles,
  typesList,
  shippingState,
  shippingStateList,
  shippingType,
  shippingTypeList,
  shippingTypeFilter,
  shippingSateFilter,
  undeliveredReasons,
  shippingMethods,
  shippingMethodsList,
  stateTranslate,
  typeTranslate,
  packages,
  shippingMethodsFilter,
  dayOfWeekList,
  pickupCenters,
  additionalBaseTypes,
  meliShippingStatus,
  meliShippingSubStatus,
  shippingsStateFilters,
  serviceResult,
};
