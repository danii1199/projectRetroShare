import { createContext, useEffect, useState } from "react";
import RetroshareService from "../Service/RetroshareService";

export const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getAll().then((response) => {
      const { data } = response;
      setUser(data);
    });
  };

  return (
    <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>
  );
};
export default UsersContextProvider;
