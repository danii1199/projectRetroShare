import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import RetroshareService from "../../Service/RetroshareService";

const VinylComponentAdmin = () => {
  var miarray =[];
  function eliminarSeleccionados() {

    for(var i=0;i<miarray.length;i++){
      console.log(miarray[i]);
      RetroshareService.deleteProduct(miarray[i]);
    }
    window.location.reload();
  }
  const [vinyl, setVinyl] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:8080/retroshare/v-all");
    const vinyls = await data.json();
    setVinyl(vinyls);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "artists", headerName: "Artists", width: 150 },
    { field: "songs", headerName: "Songs", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "firstName", headerName: "Owner user", width: 130, valueFormatter: (vinyl) => vinyl.row?.user?.userName},
    { field: "productStatus", headerName: "Product Status", width: 150 ,valueFormatter: (vinyl) => vinyl.row?.productStatus?.status},
  ];

  return (
    <div style={{ height: 400, width: "100%",backgroundColor:"white" }}>
      <DataGrid rows={vinyl} 
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

export default VinylComponentAdmin;