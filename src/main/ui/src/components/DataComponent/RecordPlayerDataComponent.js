import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const RecordPlayerComponentAdmin = () => {
  const [recordPlayer, setRecordPlayer] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("http://localhost:8080/retroshare/v-all");
    const recordPlayers = await data.json();
    setRecordPlayer(recordPlayers);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "model", headerName: "Model", width: 150 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "firstName", headerName: "Owner user", width: 130, valueFormatter: (recordPlayer) => recordPlayer.row?.user?.userName},
    { field: "productStatus", headerName: "Product Status", width: 150 ,valueFormatter: (recordPlayer) => recordPlayer.row?.productStatus?.status},
  ];

  return (
    <div style={{ height: 400, width: "100%",backgroundColor:"white" }}>
      <DataGrid
        rows={recordPlayer}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default RecordPlayerComponentAdmin;