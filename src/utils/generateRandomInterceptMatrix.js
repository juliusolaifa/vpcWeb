// utils/generateRandomInterceptMatrix.js
import fetchData from './fetchData';

const generateRandomInterceptMatrix = async (ns) => {
  const queryParams = { ns: ns.join(',') };  // Convert array to comma-separated string
  return await fetchData({
    url: 'http://127.0.0.1:3240/random_intercept_matrix',  // Your Plumber API URL
    queryParams
  });
};

export default generateRandomInterceptMatrix;
