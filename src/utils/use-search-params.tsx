import { useSearchParams } from "react-router-dom";

const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParam = (key, value) => {
    console.log(key, value);
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  return updateSearchParam;
};

export default useUpdateSearchParams;
