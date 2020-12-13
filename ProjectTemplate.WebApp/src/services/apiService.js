import axios from 'axios';

async function getDataFromApi() {
  const response = await axios.get(
    process.env.REACT_APP_WebAPI + '/api/todolists'
  );
  return response.data;
}

export { getDataFromApi };
