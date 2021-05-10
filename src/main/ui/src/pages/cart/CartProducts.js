import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Container, Grid } from "@material-ui/core";

import CartItem from "./CartItem";

const CartProducts = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid container spacing={4}>
          {cartItems.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
              <CartItem product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartProducts;
