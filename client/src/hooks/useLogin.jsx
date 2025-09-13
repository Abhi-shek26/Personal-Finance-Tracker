import { useState } from "react";
import api from '../utils/api';
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
      setIsLoading(true);
      setError(null);

      try {
          const response = await api.post('/user/login', {
              email,
              password
          });

          const data = response.data;
          if (!data) {
              throw new Error("Invalid email or password");
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
      }
  };

  return { login, isLoading, error };
};