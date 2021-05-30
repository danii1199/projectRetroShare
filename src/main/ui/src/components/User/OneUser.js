import OneUser from "../../lib/OneUser";
import { Grid, Container } from "@material-ui/core";
import CardInfo from "../CardProduct/CardInfo";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext } from "react";
import Information from "./components/Information";



const UserProfile = () => {
  const user = OneUser(window.location.pathname.split("/")[2]);
  const { products } = useContext(ProductsContext);
  //const fecha=fechaReg.substring(8,10)+"-"+fechaReg.substring(5,7)+"-"+fechaReg.substring(0,4);
  return (
    <Container>
      <Grid>
        <Information/>
      </Grid>
      
      <Grid container spacing={2}>
        {products.map((product) => {
          console.log(product.userOwner.id);
          if (product.userOwner.id === user.id)
            return (
              <Grid key={product.id} item sm={6} md={3}>
                <CardInfo product={product} />
              </Grid>
            );
          return <></>;
        })}
      </Grid>
    </Container>
  );
};

export default UserProfile;
