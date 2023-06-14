
import axios from 'axios';

const token = process.env.REACT_APP_TOKEN
const baseUrl = process.env.REACT_APP_BASE_URL
const fetchRepos = async (query, sortOrder, ITEMS_PER_PAGE, currentPage, setRepos, setTotalCount) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search/repositories?q=${query}&order=${sortOrder}&per_page=${ITEMS_PER_PAGE}&page=${currentPage + 1}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;

    console.log(data.items);
    setRepos(data.items);
    setTotalCount(data.total_count);

    return data;

  } catch (error) {

    console.log('I catch error: ' + error.message);
  }
};

export default fetchRepos;






