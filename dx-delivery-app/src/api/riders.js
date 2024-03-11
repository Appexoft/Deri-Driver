import axios from '@api';

export const listRiders = async () => {
  const {data} = await axios.get('/rider/list');
  return data;
};
