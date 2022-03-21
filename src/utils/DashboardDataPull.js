import { useState} from 'react';

export function useAPIPuller(apiFunc) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
  
    const request = async (...args) => {
        console.log(...args)
      try {
        const result = await apiFunc(...args);
        setData(result.data);
      } catch (err) {
        setError(err.message || "Unexpected Error!");
      } 
    };
  
    return {
      data,
      error,
      request
    };
  };