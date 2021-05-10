import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const GameConsoleDataComponentAdmin = () => {
  const [gameConsole, setGameConsole] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:8080/retroshare/gc-all");
    const gameConsoles = await data.json();
    setGameConsole(gameConsoles);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "firstName", headerName: "Owner user", width: 130, valueFormatter: (gameConsole) => gameConsole.row?.user?.userName},
    { field: "productStatus", headerName: "Product Status", width: 150 ,valueFormatter: (gameConsole) => gameConsole.row?.productStatus?.status},
  ];

  
  return (
    <div style={{ height: 400, width: "100%",backgroundColor:"white"}}>
      <DataGrid
        rows={gameConsole}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default GameConsoleDataComponentAdmin;