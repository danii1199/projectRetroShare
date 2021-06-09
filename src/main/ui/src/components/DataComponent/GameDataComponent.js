import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import RetroshareService from "../../Service/RetroshareService";

const GameComponentAdmin = () => {
  var miarray =[];
  function eliminarSeleccionados() {

    for(var i=0;i<miarray.length;i++){
      console.log(miarray[i]);
      RetroshareService.deleteProduct(miarray[i]);
    }
    window.location.reload();
  }
  const [game, setGame] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("https://retroshare-company.herokuapp.com/retroshare/g-all");
    const games = await data.json();
    setGame(games);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "developer", headerName: "developer", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "useName", headerName: "Buy user", width: 130, valueFormatter: (game) => game.row?.userBuyer?.userName},
    {
      field: "userName",
      headerName: "Owner user",
      width: 130,
      valueFormatter: (game) => game.row?.userOwner?.userName,
    },
    { field: "productStatus", headerName: "Product Status", width: 150,valueFormatter: (game) => game.row?.productStatus?.status},
  ];

  return (
    <div style={{ height: 400, width: "100%" ,backgroundColor:"white"}}>
      <DataGrid rows={game} 
      columns={columns} 
      pageSize={5} 
      checkboxSelection 
      onSelectionModelChange={itm => miarray=itm.selectionModel}
      />
      <Button
       style={{
        backgroundColor:"white",
        marginTop: "20px"
      }}
     onClick={eliminarSeleccionados}
     >Borrar seleccionados</Button>
    </div>
  );
};

export default GameComponentAdmin;