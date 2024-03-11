import axios from '@api';

export const getUser = async () => {
  const {data} = await axios.get('/user');

  return data;
};

export const getMeliAuthUrl = async () => {
  const {data} = await axios.get('/meli/getAuthUrl');
  return data;
};

export const signup = async form => {
  const {data} = await axios.post('/user/signup', form);

  return data;
};

export const updateBusiness = async business => {
  const {data} = await axios.put('/business', {business});
  return data;
};
