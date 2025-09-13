import api from '../utils/api';
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password, confirmPassword, dateofbirth) => {
      setIsLoading(true);
      setError(null);

      if (password !== confirmPassword) {
          setIsLoading(false);
          setError("Passwords do not match");
          return;
      }

      try {
          const response = await api.post('/user/signup', {
                name, 
                email, 
                password,  
                dateofbirth
              });

          const data = await response.data;
            if (!data) {
                throw new Error(data.error || "Signup failed. Try again.");
            }

          const userData = {
              id: data.id,
              name: data.name,
              email: data.email,
              dateofbirth: data.dateofbirth,
              token: data.token,
          };

          localStorage.setItem("user", JSON.stringify(userData));
          dispatch({ type: "LOGIN", payload: userData });

          setIsLoading(false);
          return userData;
      } catch (err) {
          setIsLoading(false);
    setError(err.response.data.errors);
    console.error("Server Response Error:", err.response.data); 
     
    setError(err.response?.data?.error || 'An unknown error occurred.');

      }
  };

  return { signup, isLoading, error };
};