import { useEffect, useState } from "react";
import RetroshareService from "../Service/RetroshareService";

const OneUser = (id) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    obtenerDatos();
    // eslint-disable-next-line
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.get(id).then((response) => {
      const { data } = response;
      setUser(data);
    });
  };
  
  return user;
};
export default OneUser;