import { useState, useEffect, useCallback } from 'react';
import api from '../service/api';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔥 reusable fetch function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get(url);
      setData(res.data);

    } catch (error) {
      // ✅ better error message
      setError(error.response?.data?.message || "Something went wrong");

      // 🔐 optional: auto logout if token invalid
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }

    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export { useFetch };