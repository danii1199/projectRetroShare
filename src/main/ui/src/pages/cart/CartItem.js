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
  fade,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";
import { makeStyles } from "@material-ui/core/styles";

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
    color: theme.palette.common.black,
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

const CartItem = ({ product }) => {
  const { decrease, removeProduct } = useContext(CartContext);
  const classes = useStyles();

  return (
    <Grid item>
      <Card className="custom-card">
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
            <Typography field="price" className={classes.title} variant="h5">
              {formatNumber(product.price)}
            </Typography>
            <Typography field="cant" className={classes.title} variant="h5">
              Qty: {product.quantity}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="actions-content">
          {product.quantity > 1 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => decrease(product)}
              className={classes.button}
            >
              <RemoveIcon className={classes.icon} />
            </Button>
          )}
          {product.quantity === 1 && (
            <Button
            variant="contained"
              color="secondary"
              onClick={() => removeProduct(product)}
              className={classes.button}
            >
              <DeleteIcon className={classes.icon} />
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CartItem;
