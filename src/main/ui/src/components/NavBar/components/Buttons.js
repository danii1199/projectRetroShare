import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Person from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import RadioIcon from "@material-ui/icons/Radio";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import AlbumIcon from "@material-ui/icons/Album";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AuthService from "../../../Service/Auth/AuthService";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(6, 8, 6, 6),
    padding: theme.spacing(2, 8),
    boxShadow: "0 4px 10px 0 #D9B504",
  },
  buttonCart: {
    margin: theme.spacing(0, 1, 0, 3),
    boxShadow: "5px 6px 15px 1px #0D0D0D",
    float: "inline-end",
  },
}));

const botonesAdmin = [
  {
    id: "1",
    nombre: <Person />,
    enlace: "/users",
    icono: <Person />,
  },
  {
    id: "2",
    nombre: <SportsEsportsIcon />,
    enlace: "/videogames-admin",
    icono: <SportsEsportsIcon />,
  },
  {
    id: "3",
    nombre: <RadioIcon />,
    enlace: "/rplayer-admin",
    icono: <RadioIcon />,
  },
  {
    id: "4",
    nombre: <VideogameAssetIcon />,
    enlace: "/gameconsole-admin",
    icono: <VideogameAssetIcon />,
  },
  {
    id: "5",
    nombre: <AlbumIcon />,
    enlace: "/vinyl-admin",
    icono: <AlbumIcon />,
  },
];

const botonesUser = [
  {
    nombre: <AddIcon />,
    enlace: "/step1",
    icono: <AddIcon />,
  },
];

const panelAdmin = [...botonesAdmin, ...botonesUser];

export const AdminButtonsIcons = (props) => {
  const classes = useStyles();

  const esAdmin = props.isAdmin
    ? panelAdmin
    : !props.isAdmin
    ? botonesUser
    : "";

  return esAdmin.map((boton) => {
    return (
      <MenuItem key={boton.id}>
        <Button
          children={boton.icono}
          className={classes.buttonIcon}
          color="secondary"
          variant="contained"
          component={Link}
          to={boton.enlace}
        ></Button>
      </MenuItem>
    );
  });
};

export const AdminButtons = (props) => {
  const classes = useStyles();

  const esAdmin = props.isAdmin
  ? panelAdmin
  : !props.isAdmin
  ? botonesUser
  : "";
  
  return esAdmin.map((boton) => {
    return (
      <MenuItem key={boton.id}>
        <Button
          children={boton.nombre}
          className={classes.buttonIcon}
          color="secondary"
          variant="outlined"
          component={Link}
          to={boton.enlace}
        ></Button>
      </MenuItem>
    );
  });
};

export const LogedButtons = (props) => {
  const logOut = () => AuthService.logout;

  if (props.isUser) {
    return (
      <MenuItem>
        <Button color="inherit" onClick={logOut()} href={"/home"}>
          <ExitToAppIcon />
        </Button>
      </MenuItem>
    );
  } else {
    return (
      <MenuItem>
        <Button children="Log In" color="inherit" component={Link} to="/logIn">
          <ExitToAppIcon />
        </Button>
      </MenuItem>
    );
  }
};
