import { createContext } from "react";
import { useEffect, useState } from "react";
import RetroshareService from "../../../Service/RetroshareService";

export const MessagesContext = createContext();

const MessagesContextProvider = ({ children }) => {
  const [messages, setProduct] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getMessages().then((response) => {
      const { data } = response;
      setProduct(data);
    });
  };

  return (
    <MessagesContext.Provider value={{ messages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;