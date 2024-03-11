import {useColors} from '@theme';
// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

//TODO MODIFY BACKGROUND OF STATES
export const shippingState = {
  TO_ASSIGN: {
    label: 'Para entregar',
    backgroundColor: colors.card.to_delivery,
    color: colors.common.white,
    value: 'TO_ASSIGN',
  },
  IN_PROGRESS: {
    label: 'En proceso',
    backgroundColor: colors.card.to_delivery,
    color: colors.common.white,
    value: 'IN_PROGRESS',
  },
  IN_STORE: {
    label: 'En depósito',
    backgroundColor: colors.card.to_delivery,
    color: colors.common.white,
    value: 'IN_STORE',
  },
  DELIVERY_IN_PROGRESS: {
    label: 'En proceso de entrega',
    backgroundColor: colors.card.to_delivery,
    color: colors.common.white,
    value: 'DELIVERY_IN_PROGRESS',
  },
  DELIVERED: {
    label: 'Entregado',
    backgroundColor: colors.card.delivered,
    color: colors.common.black,
    value: 'DELIVERED',
  },
  UNDELIVERED: {
    label: 'Sin entregar',
    backgroundColor: colors.card.undelivered,
    color: colors.common.black,
    value: 'UNDELIVERED',
  },
  CANCELLED: {
    label: 'Cancelado',
    backgroundColor: colors.card.undelivered,
    color: colors.common.white,
    value: 'CANCELLED',
  },
};

export const shippingType = {
  COMMON: 'Común',
  EXPRESS: 'Express',
  FLASH: 'Flash',
  PICK_UP: 'Pick up',
  MERCADO_LIBRE: 'Mercado Libre',
  DEPOSIT: 'Depósito',
  CHECK: 'Cheque a cobrar',
};

export const shippingIconTypes = {
  COMMON: 'cargo',
  EXPRESS: 'express',
  PICK_UP: 'packageIcon',
};

export const userRoles = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  RIDER: 'RIDER',
};

export const shippingTypeValues = {
  COMMON: 'COMMON',
  EXPRESS: 'EXPRESS',
  FLASH: 'FLASH',
  PICK_UP: 'PICK_UP',
  MERCADO_LIBRE: 'MERCADO_LIBRE',
  CHECK: 'CHECK',
  DEPOSIT: 'DEPOSIT',
};

export const shippingMethodsTranslation = {
  MESSAGERING: 'Mensajería',
  ORDER: 'Paquete',
  COLLECTION: 'Cobranza',
};

export const shippingMethods = {
  MESSAGERING: 'MESSAGERING',
  ORDER: 'ORDER',
  COLLECTION: 'COLLECTION',
};

export const packagesSize = ['S', 'M', 'L'];

export const departments = [
  {id: 'Artigas', name: 'Artigas'},
  {id: 'Canelones', name: 'Canelones'},
  {id: 'Cerro Largo', name: 'Cerro Largo'},
  {id: 'Colonia', name: 'Colonia'},
  {id: 'Durazno', name: 'Durazno'},
  {id: 'Flores', name: 'Flores'},
  {id: 'Florida', name: 'Florida'},
  {id: 'Lavalleja', name: 'Lavalleja'},
  {id: 'Maldonado', name: 'Maldonado'},
  {id: 'Montevideo', name: 'Montevideo'},
  {id: 'Paysandú', name: 'Paysandú'},
  {id: 'Río Negro', name: 'Río Negro'},
  {id: 'Rivera', name: 'Rivera'},
  {id: 'Rocha', name: 'Rocha'},
  {id: 'Salto', name: 'Salto'},
  {id: 'San José', name: 'San José'},
  {id: 'Soriano', name: 'Soriano'},
  {id: 'Tacuarembó', name: 'Tacuarembó'},
  {id: 'Treinta y Tres', name: 'Treinta y Tres'},
];

export const privacyPolicyUrl =
  'https://gestionpost.com.uy/politicas-de-privacidad/';

export const shippingStateValues = {
  TO_DELIVERY: 'TO_DELIVERY',
  CANCELLED: 'CANCELLED',
  DELIVERED: 'DELIVERED',
};

export const shippingStateFilterValues = {
  ...shippingStateValues,
  ALL: 'ALL',
};

export const shippingStateFilter = [
  {
    label: 'Para entregar',
    value: 'TO_DELIVERY',
  },
  {
    label: 'Todos',
    value: 'ALL',
  },
  {
    label: 'Cancelados',
    value: 'CANCELLED',
  },
  {
    label: 'Entregados',
    value: 'DELIVERED',
  },
];

export const defaultDeltas = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export const maxLengthOfShippingDetails = 280;
