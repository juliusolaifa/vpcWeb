// utils/generateRandomDesignMatrices.js
import fetchData from './fetchData';

const generateRandomDesignMatrices = async (ns, X = null) => {
  const queryParams = { ns: ns.join(',') };  // Convert ns array to comma-separated string

  if (X) {
    queryParams.X = X.join(',');  // If X is provided, add it as a comma-separated string
  }

  return await fetchData({
    url: 'http://127.0.0.1:3240/random_design_matrices',  // Your Plumber API URL
    queryParams
  });
};

export default generateRandomDesignMatrices;
