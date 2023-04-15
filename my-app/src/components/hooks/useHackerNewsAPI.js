import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function useHackerNewsAPI(initialUrl, initialData) {
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFetchData = useRef({});
  const [url, setUrl] = useState(initialUrl);

  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setData(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    handleFetchData.current();
  }, [url]);

  return {
    query,
    setQuery,
    setUrl,
    loading,
    errorMessage,
    data,
  };
}
