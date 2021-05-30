import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Person, ShoppingCart } from "@material-ui/icons";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import AuthService from "../../Service/Auth/AuthService";

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

const botones = [
  {
    nombre: "Games",
    enlace: "/videogames",
  },
  {
    nombre: "Player",
    enlace: "/rplayer",
  },
  {
    nombre: "Consoles",
    enlace: "/gameconsole",
  },
  {
    nombre: "Vinyl",
    enlace: "/vinyl",
  },
];

const PrincipalButtons = () => {
  const classes = useStyles();
  return botones.map((boton) => {
    return (
      <Button
        children={boton.nombre}
        className={classes.button}
        color="secondary"
        variant="contained"
        component={Link}
        to={boton.enlace}
      ></Button>
    );
  });
};

export const CartButton = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Button
    children= "Al Carro"
      className={classes.buttonCart}
      size="small"
      color="secondary"
      variant="contained"
      onClick={() => {
        history.push(`/cart`);
        history.go();
      }}
    />
      
  );
};

export const UserButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.buttonCart}
      variant="contained"
      size="small"
      color="secondary"
      component={Link}
      to={`user/${props.product.userOwner.id}`}
    >
      <Person className={classes.icon} />
    </Button>
  );
};

export const AddCartButton = (props) => {
  const classes = useStyles();
  const { addProduct } = useContext(CartContext);
  const currentUser = AuthService.getCurrentUser();
  

  const isBuy = props.product?.userBuyer?.id === currentUser.id;
  //const isYour = props.product.userOwner.id !== user.id;

  return (
    <Button
      children={ (isBuy) ? "Comprado":  <ShoppingCart className={classes.icon} /> }
      className={classes.buttonCart}
      variant="contained"
      size="small"
      color="secondary"
      onClick={() => addProduct(props.product)}
      disabled={isBuy}
    >
      
    </Button>
  );
};

export default PrincipalButtons;
