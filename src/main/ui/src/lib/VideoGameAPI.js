import RetroshareService from "../Service/RetroshareService";

import { useEffect, useState } from "react";

const VideoGameAPI = () => {
  const [game, setGame] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getGame().then((response) => {
      const { data } = response;
      setGame(data);
    });
  };
  return game;
};

export default VideoGameAPI;
