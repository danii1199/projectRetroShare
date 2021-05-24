import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Button,
  fade,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import { Person } from "@material-ui/icons";
import "./styleCard.css";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(3),
    boxShadow: "0 4px 10px 0 #8C8C8C",
    float: "rigth",
  },
  customCard: {
    transition: "all 0.2s ease-in-out",
    backgroundColor: theme.palette.background.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.light, 0.85),
      boxShadow: "0px 0px 20px 1px #8C8C8C",
      transform: "scale(1.02)",
    },
    color: theme.palette.common.white,
    padding: "5px",
    borderRadius: "10px",
    margin: "5px",
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  price: {
    marginTop: theme.spacing(1),
  },
  status: {
    marginTop: theme.spacing(0),
    color: theme.palette.common.black,
  },
  actionsContent: {
    padding: theme.spacing(1),
  },
  image: {
    
  },

}));

const CardProduct = ({ product }) => {
  const classes = useStyles();
  const { addProduct, cartItems } = useContext(CartContext);
  const history = useHistory();

  const isInCart = (product) => {
    console.log(product);
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <Card className={classes.customCard}>
      <CardActionArea component={Link} to={`pr/${product.id}`}>
        <CardMedia
          component="img"
          alt={product.image}
          height="220"
          className={classes.image}
          image={product.image}
          title={product.name}
        />
        <CardContent className={classes.content}>
          <Typography
            align="left"
            display="inline"
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {product.name}
          </Typography>
          <Typography
            className={classes.status}
            align="right"
            gutterBottom
            variant="h6"
            component="h2"
          >
            {product.productStatus?.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionsContent}>
        <Typography
          className={classes.price}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {product.price} <EuroSymbolIcon />
        </Typography>

        <Button
          className={classes.button}
          variant="contained"
          size="large"
          color="primary"
          component={Link}
          to={`user/${product.userOwner.id}`}
        >
          <Person />
        </Button>

        {!isInCart(product) && (
          <>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              color="primary"
              onClick={() => addProduct(product)}
            >
              <ShoppingCart />
            </Button>
          </>
        )}
        {isInCart(product) && (
          <>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                history.push(`/cart`);
                history.go();
              }}
            >
              To Cart
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CardProduct;
