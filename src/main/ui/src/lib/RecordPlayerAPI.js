import RetroshareService from "../Service/RetroshareService";
import { useEffect, useState } from "react";

const RecordPlayerAPI = () => {
  const [recordPlayer, setRecordPlayer] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getRecordPlayer().then((response) => {
      const { data } = response;
      setRecordPlayer(data);
    });
  };

  return recordPlayer;
};

export default RecordPlayerAPI;
