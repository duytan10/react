import { useEffect, useRef, useState } from "react";
import axios from "axios";
import _ from "lodash";

export default function useHackerNewsAPI() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFetchData = useRef({});
  const [url, setUrl] = useState("https://hn.algolia.com/api/v1/search?query=''");

  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
      setHits(response.data?.hits || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleUpdateQuery = _.debounce((e) => setQuery(e.target.value), 500);

  useEffect(() => {
    handleFetchData.current();
  }, [url]);

  return {
    hits,
    query,
    setQuery,
    loading,
    errorMessage,
    setUrl
  }
}
