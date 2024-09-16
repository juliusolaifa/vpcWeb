// utils/fetchData.js
const fetchData = async ({ url, queryParams = {} }) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

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
