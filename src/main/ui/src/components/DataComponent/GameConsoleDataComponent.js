import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import RetroshareService from "../../Service/RetroshareService";

const GameConsoleDataComponentAdmin = () => {
  var miarray =[];
  function eliminarSeleccionados() {

    for(var i=0;i<miarray.length;i++){
      console.log(miarray[i]);
      RetroshareService.deleteProduct(miarray[i]);
    }
    window.location.reload();
  }
  const [gameConsole, setGameConsole] =useState([]);

 useEffect(() => {
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
    { field: "useName", headerName: "Buy user", width: 130, valueFormatter: (game) => game.row?.userBuyer?.userName},
    {
      field: "userName",
      headerName: "Owner user",
      width: 130,
      valueFormatter: (game) => game.row?.userOwner?.userName,
    },
    { field: "productStatus", headerName: "Product Status", width: 150 ,valueFormatter: (gameConsole) => gameConsole.row?.productStatus?.status},
  ];

  
  return (
    <div style={{ height: 400, width: "100%",backgroundColor:"white"}}>
      <DataGrid
        rows={gameConsole}
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

export default GameConsoleDataComponentAdmin;