import axios from 'axios';

async function getDataFromApi() {
  const response = await axios.get('https://localhost:44334/api/todolists');
  return response.data;
}

export { getDataFromApi };
