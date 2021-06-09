import {
  Card,
  Button,
  Container,
  Grid,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { makeStyles } from "@material-ui/core/styles";
import { CartButton } from "../Buttons/PrincipalButtons";
import AuthService from "../../Service/Auth/AuthService";

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: "340px",
    objectFit: "fill"
  },
  productView: {
    margin: theme.spacing(5),
    width: "100%",
    backgroundColor:theme.palette.primary.main,
    padding:"30px",
    borderRadius:"6px",

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
  
  const currentUser = AuthService.getCurrentUser();

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
              alt={product.images}
              className={classes.cardImage}
              image={process.env.PUBLIC_URL + "/" + product.images}
              title={product.name}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.text} style={{marginTop:"-20px",fontWeight:"500"}}variant="h2">
            {product.name}
          </Typography>
          <Typography className={classes.text} variant="h6">
            {product.description}
          </Typography>
          <Typography className={classes.text} style={{marginTop:"100px"}} variant="h4">
            Price: {product.price}€
          </Typography>
          <Typography className={classes.text} style={{marginTop:"50px"}} variant="h5">
            Sell by: {product?.userOwner?.userName}
          </Typography>
        </Grid>
        <Grid item xs={12} className="action-part">
          
          {currentUser!==null && !isInCart(product) && product.userBuyer===null&& (
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
