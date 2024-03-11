import axios from '@api';

export const listPackageTypes = async () => {
  try {
    const {data} = await axios.get('/package-type/');
    return data;
  } catch (error) {
    console.log(error);
  }
};
