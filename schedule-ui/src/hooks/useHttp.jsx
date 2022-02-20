import { useEffect, useState } from "react";
import api from "../utils/api";

export const useHttp = (url) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;

    setIsFetching(true);
    api
      .get(url)
      .then((res) => {
        if (res.data) {
          setData(res.data.data);
          setIsError(false);
          setIsFetching(false);
        }
      })
      .catch((error) => {
        console.error(`error fetching url ${url}`, error);
        setIsError(true);
        setIsFetching(false);
      });
  }, [url]);

  return [data, isFetching, isError];
};

export const useJobTypes = () => useHttp("/jobs/types/");
