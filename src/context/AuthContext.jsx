import { createContext, useEffect, useState } from "react";
import PropType from "prop-types";

import axios from "axios";
import { Spinner } from "@nextui-org/react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState();
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create();

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  /* Axe d'amélioration, stocker le token de manière sécurisé et ne peut rappeler la route login à chaque fois */
  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post("/login", {
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        });
        let token = response.data.token;
        setAuthState(token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
      }
    };

    login();
  }, [axiosInstance.defaults.headers.common]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropType.node.isRequired,
};
