import UserAPI from "../../lib/UserAPI";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import RetroshareService from "../../Service/RetroshareService";
import React,{ useState } from "react";


const UserComponent = () => {
  const [disabled,setDisabled] = useState(true);
  
  var miarray =[];
  function eliminarSeleccionados() {

    for(var i=0;i<miarray.length;i++){
      console.log(miarray[i]);
      RetroshareService.remove(miarray[i]);
    }
    window.location.reload();
  }

  function editarSeleccionado() {
   console.log("Estas pulsando editar");
  }

  function desactivarboton(x){
   var long=x.length;
    if(long===1){
      setDisabled(false);

    }
    else{
      setDisabled(true);

    }
    console.log(miarray.length);
  }
  

  const columns = [
    { dataField:"id", field: "id", headerName: "ID", width: 70 },
    { field: "userName", headerName: "User name", width: 130 },
    { field: "date", headerName: "Register Date", width: 150 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue("firstName") || ""} ${
          params.getValue("lastName") || ""
        }`,
    },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phoneNumber", headerName: "Phone number", width: 150 },
    { field: "firstName", headerName: "First name", width: 150 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "sex", headerName: "Sex", width: 90 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "zipCode", headerName: "Zip Code", type: "number", width: 110 },
  
  ];
  return (
    
    <div style={{ height: 400, width: "100%",backgroundColor:"white" }}>
      <DataGrid
        rows={UserAPI()}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={itm => desactivarboton(miarray=itm.selectionModel)}
        
      />
      
     <Button
     style={{
       backgroundColor:"white",
       marginTop: "20px"
     }}
     onClick={eliminarSeleccionados}
     >Borrar seleccionados</Button>

<Button
    disabled={disabled}
     style={{
       backgroundColor:"white",
       marginTop: "20px",
       marginLeft: "10px"
     }}
     onClick={editarSeleccionado}
     >Editar seleccionado</Button>
    </div>
  );
};

export default UserComponent;
