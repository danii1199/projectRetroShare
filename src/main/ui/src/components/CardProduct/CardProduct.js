import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  fade,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { makeStyles } from "@material-ui/core/styles";
import { AddCartButton, CartButton } from "../Buttons/PrincipalButtons";
import { UserButton } from "../Buttons/PrincipalButtons";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(3),
    boxShadow: "5px 6px 15px 1px #0D0D0D",
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
  icon: {
    color: theme.palette.primary.light,
  },
}));

const CardProduct = ({ product }) => {
  const classes = useStyles();
  const { cartItems } = useContext(CartContext);

  const isInCart = (product) => {
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
          image={process.env.PUBLIC_URL + "/" + product.image}
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

        <UserButton product={product} />

        {!isInCart(product) && <AddCartButton product={product}/>}
        {isInCart(product) && <CartButton />}
      </CardActions>
    </Card>
  );
};

export default CardProduct;
