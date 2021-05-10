import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const GameComponentAdmin = () => {
  const [game, setGame] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:8080/retroshare/g-all");
    const games = await data.json();
    setGame(games);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "developer", headerName: "developer", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "firstName",
      headerName: "Owner user",
      width: 130,
      valueFormatter: (game) => game.row?.user?.userName,
    },
    { field: "productStatus", headerName: "Product Status", width: 150,valueFormatter: (game) => game.row?.productStatus?.status},
  ];

  return (
    <div style={{ height: 400, width: "100%" ,backgroundColor:"white"}}>
      <DataGrid rows={game} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default GameComponentAdmin;