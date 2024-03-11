import axios from '@api';

export const listCompanies = async () => {
  const {data} = await axios.get('/company/list');
  return data;
};
