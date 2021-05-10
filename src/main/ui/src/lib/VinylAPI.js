import { useEffect, useState } from "react";
import RetroshareService from "../Service/RetroshareService";

const VinylAPI = () => {
  const [vinyl, setVinyl] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getVinyl().then((response) => {
      const { data } = response;
      setVinyl(data);
    });
  };
  return vinyl;
};
export default VinylAPI;
