import axios from 'axios';

const API_KEY = '50307425-541b949c038afe75b2e77934f';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  };
  // const { data } = await axios.get(BASE_URL, { params });
  // return data;
   const response = await axios.get(BASE_URL, { params });
  return response.data;
}