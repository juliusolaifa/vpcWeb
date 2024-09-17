const BASE_URL = 'http://127.0.0.1:3240';

// Utility function to fetch data from the API
const fetchData = async (endpoint, queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${BASE_URL}${endpoint}?${queryString}` : `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${fullUrl}:`, error.message);
    throw error;
  }
};

export default fetchData;
