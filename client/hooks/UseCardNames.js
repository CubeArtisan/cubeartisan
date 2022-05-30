import useSWR from 'swr';

const useCardNames = ({ cubeID = null, fullNames = false }) => {
  let url = fullNames ? '/cards/names/full' : '/cards/names';
  if (cubeID) url = `/cube/${cubeID}/cards/names`;
  const { data, error } = useSWR(url);

  return {
    names: data?.cardnames,
    loading: !error && !data,
    error,
  };
};
export default useCardNames;
