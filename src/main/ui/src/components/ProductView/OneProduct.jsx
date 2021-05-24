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
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "auto",
  },
  imagenes: {
    margin: "auto",
    width: "auto",
    height: "auto",
    position: "absolute",
  },
  h3: {
    margin: "30px",
    color: theme.palette.text.secondary
  },
  product: {
    margin: theme.spacing(10)
  },
}));

const OneProduct = ({ product }) => {
  const { addProduct, cartItems } = useContext(CartContext);
  const history = useHistory();
  const classes = useStyles();
  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <Container className="product-view">
      <Grid container spacing={12}>
        <Grid item xs={6} className="image-wrapper">
          <Card className="custom-card">
            <CardMedia
              component="img"
              alt={product.image}
              height="300"
              className="card-image"
              image={process.env.PUBLIC_URL + "/" + product.image}
              title={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={6} className="text">
          <Typography style={{marginTop:"10px"}}variant="h2">{product.name}</Typography>
          <Typography variant="h6">{product.description}</Typography>
          <Typography variant="h3">Price: {product.price}€</Typography>
          <Typography style={{marginTop:"170px",marginLeft:"10px"}} variant="h5" >Sell by: {product?.userOwner?.userName}</Typography>
        </Grid>
        <Grid item xs={12} className="action-part">
          {!isInCart(product) && (
            <>
              <Button
                size="large"
                className="custom-button"
                onClick={() => addProduct(product)}
              >
                <ShoppingCart /> Cart
              </Button>
            </>
          )}
          {isInCart(product) && (
          <>
            <Button
              size="large"
              className="custom-button"
              
              onClick={() => {
                history.push(`/cart`);
                history.go();
              }}
            >
              To Cart
            </Button>
          </>
        )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default OneProduct;
