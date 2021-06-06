import UserAPI from "../../lib/UserAPI";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import RetroshareService from "../../Service/RetroshareService";
import React,{ useState } from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const UserComponent = () => {
  const [disabledBorrar,setDisabledBorrar] = useState(true);
  const [disabledEditar,setDisabledEditar] = useState(true);
  const [miarray,setmiarray] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  function eliminarSeleccionados() {
    

    for(var i=0;i<miarray.length;i++){
      console.log(miarray[i]);
      RetroshareService.disabled(miarray[i]);
    }
    window.location.reload();
      
    
  }

  function desactivarboton(x){
   var long=x.length;
    if(long===1){
      setDisabledEditar(false);

    }
    else{
      setDisabledEditar(true);

    }

    if(long>=1){
      setDisabledBorrar(false);
    }
    else{
      setDisabledBorrar(true);
    }

    setmiarray(x);
    console.log(x);
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
        onSelectionModelChange={itm => desactivarboton(itm.selectionModel)}
        
      />
      
     <Button
    disabled={disabledBorrar}
     style={{
       backgroundColor:"white",
       marginTop: "20px"
     }}
     onClick={eliminarSeleccionados}
     >Deshabilitar seleccionados</Button>

<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar Perfil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Inserta los nuevos datos
          </DialogContentText>
          <TextField label="Introduce tu nombre"></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleClose}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
};

export default UserComponent;
