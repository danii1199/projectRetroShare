import {
  Card,
  Button,
  Container,
  Grid,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import "./StyleProductView.css";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { makeStyles } from "@material-ui/core/styles";
import { CartButton } from "../Buttons/PrincipalButtons";

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: "auto",
  },
  productView: {
    margin: theme.spacing(5),
    width: "70%",
  },
  text: {
    margin: "30px",
    color: theme.palette.common.white,
  },
  product: {
    margin: theme.spacing(10),
  },
  button: {
    float: "right",
    boxShadow: "0 4px 10px 0 #D9B504",
  },
}));

const OneProduct = ({ product }) => {
  const { addProduct, cartItems } = useContext(CartContext);
  const classes = useStyles();

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <Container className={classes.productView}>
      <Grid container spacing={12}>
        <Grid item xs={6} className="image-wrapper">
          <Card className="custom-card">
            <CardMedia
              component="img"
              alt={product.image}
              className={classes.cardImage}
              image={process.env.PUBLIC_URL + "/" + product.image}
              title={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.text} variant="h2">
            {product.name}
          </Typography>
          <Typography className={classes.text} variant="h6">
            {product.description}
          </Typography>
          <Typography className={classes.text} variant="h3">
            Price: {product.price}€
          </Typography>
          <Typography className={classes.text} variant="h5">
            Sell by: {product?.userOwner?.userName}
          </Typography>
        </Grid>
        <Grid item xs={12} className="action-part">
          {!isInCart(product) && (
            <>
              <Button
                className={classes.button}
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => addProduct(product)}
              >
                <ShoppingCart /> Cart
              </Button>
            </>
          )}
          {isInCart(product) && <CartButton className={classes.button} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OneProduct;
