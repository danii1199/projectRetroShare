import { useEffect, useState } from "react";
import RetroshareService from "../Service/RetroshareService";

const UserAPI = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getAll().then((response) => {
      const { data } = response;
      setUser(data);
    });
  };

  return user;
};
export default UserAPI;
