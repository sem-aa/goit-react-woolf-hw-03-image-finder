import axios from 'axios';

const KEY = '41181401-cfbb9dc400356a899a7dc1037';

export const fetchImg = (query = 'cat', page = 1) => {
  const URL_PIXABY = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios
    .get(URL_PIXABY)
    .then(data => data.data)
    .catch(error => console.log(error));
};
