import { useContext } from "react";

import CartProducts from "./CartProducts";
import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Button: {
    margin:"5px",
    color: "purple",
    background: "yellow",
  },
  text: {
    
    color: "#ffffff",
    
  },
});

const Cart = () => {
  const styles = useStyles();
  const { total, cartItems, itemCount, clearCart, checkout } = useContext(
    CartContext
  );
  const history = useHistory();

  return (
    <Container title="Cart" description="This is the Cart page">
      <Grid>
        <Grid item>
          <Typography variant={"h2"}>Cart</Typography>
        </Grid>

        <Grid align="justify-center">
          <Grid item>
            {cartItems.length > 0 ? (
              <CartProducts />
            ) : (
              <Grid className="p-3 text-center text-muted">
                Your cart is empty
              </Grid>
            )}

            {checkout && (
              <Grid align="justify-center">
                <p>Checkout successfull</p>
                <Link to="/" className="btn btn-outline-success btn-sm">
                  BUY MORE
                </Link>
              </Grid>
            )}
          </Grid>
          {cartItems.length > 0 && (
            <Grid container >
              <Grid item xs={3} align="actions-content">

                <Typography className={styles.text}>Total Items</Typography>
                <Typography variant="h4">{itemCount}</Typography>
                <Typography className={styles.text}>Total Payment</Typography>
                <Typography variant="h3">{formatNumber(total)}</Typography>
                <hr className="my-4" />
                <Grid className="text-center">
                  <Button
                    className={styles.Button}
                    onClick={() => {
                      history.push(`/cartform`);
                    }}
                  >
                    CHECKOUT
                  </Button>
                  <Button className={styles.Button} onClick={clearCart}>
                    CLEAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
