import axios from 'axios';

/**
 * @template T
 * @param {string} url
 * @return {Promise<T>} data
 */
export const axiosFetcher = async (url) => {
  /** @type {import('axios').AxiosPromise<T>} */
  const response = axios.get(url);
  const res = await response;
  return res.data;
};

export const DEFAULT_AXIOS_OPTIONS = {
  fetcher: axiosFetcher,
};
export default axiosFetcher;
