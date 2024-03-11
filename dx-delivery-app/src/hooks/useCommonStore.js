import {useContext} from 'react';
import {CommonContext} from '@store/common/state';

const useCommonStore = () => {
  const context = useContext(CommonContext);

  return context;
};

export default useCommonStore;
