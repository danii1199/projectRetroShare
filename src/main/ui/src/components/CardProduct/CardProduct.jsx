import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import { Person } from "@material-ui/icons";
import "./styleCard.css";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useHistory } from "react-router-dom";

const CardProduct = ({ product }) => {
  const { addProduct, cartItems } = useContext(CartContext);
  const history = useHistory();

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <Card className="custom-card">
      <CardActionArea component={Link} to={`pr/${product.id}`}>
        <CardMedia
          component="img"
          alt={product.image}
          height="220"
          className="card-image"
          image={product.image}
          title={product.name}
        />
        <CardContent className="content">
          <Typography
            align="left"
            display="inline"
            className="title"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {product.name}
          </Typography>
          <Typography
            className="status"
            align="right"
            gutterBottom
            variant="h6"
            component="h2"
          >
            {product.productStatus?.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="actions-content">
        <Typography field="price" gutterBottom variant="h5" component="h2">
          {product.price} <EuroSymbolIcon />
        </Typography>

        <Button
          size="large"
          className="custom-button"
          component={Link}
          to={`user/${product.user.id}`}
        >
          <Person />
        </Button>

        {!isInCart(product) && (
          <>
            <Button
              size="large"
              className="custom-button"
              onClick={() => addProduct(product)}
            >
              <ShoppingCart />
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
      </CardActions>
    </Card>
  );
};

export default CardProduct;
