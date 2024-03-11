import axios from '@api';

export const listOfClients = async () => {
  const {data} = await axios.get('/client/list');
  return data;
};
