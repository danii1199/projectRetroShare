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
    margin: theme.spacing(1),
    padding: theme.spacing(1),
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
          Carro
        </Typography>
      </Grid>

      <Grid >
        {cartItems.length > 0 ? (
          <CartProducts />
        ) : (
          <Grid>
             <Typography className={styles.text} variant={"h5"}>
             Tu carrito esta vacío
            </Typography>
        </Grid>
        )}

        {checkout && (
          <Grid >
            <Typography>Checkout successfull</Typography>
            <Link children="BUY MORE" to="/home" className="btn btn-outline-success btn-sm"/>
          </Grid>
        )}
      </Grid>
      {cartItems.length > 0 && (
        <Grid >
          <Grid>
            <Typography className={styles.text} variant="h2">Total de productos</Typography>
            <Typography className={styles.text} variant="h4">
              {itemCount}
            </Typography>
            <Typography className={styles.text} variant="h2">Pago Total</Typography>
            <Typography className={styles.text} variant="h4">
              {formatNumber(total)}
            </Typography>
            <Grid item>
              <Button
                children="Realizar compra"
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
