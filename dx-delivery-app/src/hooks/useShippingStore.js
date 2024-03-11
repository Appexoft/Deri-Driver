import {useContext} from 'react';
import {ShippingContext} from '@store/shipping/state';

const useShippingStore = () => {
  const context = useContext(ShippingContext);

  return context;
};

export default useShippingStore;
