import { useState, useCallback, useRef, useEffect } from "react";
import { shallowEqual, useSelector } from 'react-redux';
export const useHttpClient = () => {
  const {token} = useSelector(state => state.data, shallowEqual);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess]= useState();
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers ={ "Content-Type": "application/json" }) => {
      
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(process.env.REACT_APP_AVAILO_BACKEND_URL + url, {
          method,
          body,
          headers:{...headers,  'token':token ? token:''  },
          signal: httpAbortCtrl.signal,
        });
         
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
    
        if (!responseData.success) {
      
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        setSuccess(responseData.message || 'Operation Successful');
        return responseData;
      } catch (err) {
       
        setError(err.message);
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
    setSuccess(null)
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, success, error, sendRequest, clearError };
};
