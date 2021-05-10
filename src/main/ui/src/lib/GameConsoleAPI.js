import RetroshareService from "../Service/RetroshareService";
import { useEffect, useState } from "react";

const GameConsoleAPI = () => {
  const [gameConsole, setGameConsole] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    
    RetroshareService.getGameConsole().then((response) => {
      const { data } = response;
      setGameConsole(data);
    });
  };

  return gameConsole;
};

export default GameConsoleAPI;
