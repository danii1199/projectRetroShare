import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const VinylComponentAdmin = () => {
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
      <DataGrid rows={vinyl} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default VinylComponentAdmin;