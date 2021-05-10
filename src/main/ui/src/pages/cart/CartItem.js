import { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";

const CartItem = ({ product }) => {
  const { decrease, removeProduct } = useContext(CartContext);

  return (
    <Grid item xs>
      <Card className="custom-card">
        <CardActionArea component={Link} to={`pr/${product.id}`}>
          <CardMedia
            component="img"
            alt={product.image}
            height="100"
            className="card-image"
            image={product.image}
            title={product.name}
          />{" "}
          <CardContent className="content">
            <Typography
              align="left"
              className="title"
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product.name}
            </Typography>
            <Typography
              align="right"
              className="status"
              gutterBottom
              variant="h5"
              component="h2"
              color="secondary"
            >
              {product.productStatus?.status}
            </Typography>
            <Typography field="price" gutterBottom variant="h5" component="h2">
              {formatNumber(product.price)}
            </Typography>
            <Typography field="cant" gutterBottom variant="h5" component="h2">
              Qty: {product.quantity}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="actions-content">
          {product.quantity > 1 && (
            <Button onClick={() => decrease(product)} className="custom-button">
              <RemoveIcon />
            </Button>
          )}
          {product.quantity === 1 && (
            <Button
              onClick={() => removeProduct(product)}
              className="custom-button"
            >
              <DeleteIcon />
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CartItem;
