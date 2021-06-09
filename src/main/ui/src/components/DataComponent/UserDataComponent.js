import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import RetroshareService from "../../Service/RetroshareService";

const UserDataComponent = () => {
  var miarray =[];
  function eliminarSeleccionados() {

    for(var i=0;i<miarray.length;i++){
      console.log(miarray[i]);
      RetroshareService.disabled(miarray[i]);
    }
    window.location.reload();
  }
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch("https://retroshare-company.herokuapp.com/retroshare/all");
    const users = await data.json();
    setUser(users);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "userName", headerName: "User Name", width: 150 },
    { field: "date", headerName: "Register Date", width: 180 },
    { field: "firstName", headerName: "Fist Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phoneNumber", headerName: "Phone number", width: 180 },
    { field: "sex", headerName: "Sex", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "zipCode", headerName: "ZIP Code", width: 150 },

  ];

  return (
    <div style={{ height: 400, width: "100%" ,backgroundColor:"white"}}>
      <DataGrid rows={user} 
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
     >Deshabilitar seleccionados</Button>
    </div>
  );
};

export default UserDataComponent;
