import { useContext, useState } from "react";

import CartProducts from "./CartProducts";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Main from "../../components/CheckOut/Views/Main";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(6, 8, 6, 6),
    padding: theme.spacing(2, 8),
    boxShadow: "0 4px 10px 0 #D9B504",
    float: "rigth",
  },
  buttonCart: {
    boxShadow: "0 4px 10px 0 #D9B504",
    float: "right",
  },
  text: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.common.white,
  },
}));

const Cart = () => {
  const styles = useStyles();
  const { total, cartItems, itemCount, clearCart, checkout } =
    useContext(CartContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container >
      <Grid >
        <Typography className={styles.text} variant={"h2"}>
          Cart
        </Typography>
      </Grid>

      <Grid >
        {cartItems.length > 0 ? (
          <CartProducts />
        ) : (
          <Grid className="p-3 text-center text-muted">Your cart is empty</Grid>
        )}

        {checkout && (
          <Grid >
            <Typography>Checkout successfull</Typography>
            <Link children="BUY MORE" to="/" className="btn btn-outline-success btn-sm"/>
          </Grid>
        )}
      </Grid>
      {cartItems.length > 0 && (
        <Grid >
          <Grid >
            <Typography className={styles.text}>Total Items</Typography>
            <Typography className={styles.text} variant="h4">
              {itemCount}
            </Typography>
            <Typography className={styles.text}>Total Payment</Typography>
            <Typography className={styles.text} variant="h3">
              {formatNumber(total)}
            </Typography>
            <Grid item>
              <Button
                children="CHECKOUT"
                variant="contained"
                color="secondary"
                className={styles.button}
                onClick={handleClickOpen}
              />

              <Dialog
                open={open}
                onClose={handleClose}
                
              >
                <DialogTitle>
                  Pasarela de Pago
                </DialogTitle>
                <DialogContent>
                  <Main />
                </DialogContent>
              </Dialog>
              <Button
                children="VACIAR"
                variant="contained"
                color="secondary"
                className={styles.button}
                onClick={clearCart}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
