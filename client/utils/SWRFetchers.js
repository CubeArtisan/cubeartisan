import axios from 'axios';

export const axiosFetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const DEFAULT_AXIOS_OPTIONS = Object.freeze({
  fetcher: axiosFetcher,
});

export default axiosFetcher;
