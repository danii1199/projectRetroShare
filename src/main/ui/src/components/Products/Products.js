import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardProduct from "../CardProduct/CardProduct";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext, Suspense } from "react";

import Caru1 from "../Carousel/Caru1";
import PrincipalButtons from "../Buttons/PrincipalButtons";

import AuthService from "../../Service/Auth/AuthService";
import OneUser from "../../lib/OneUser";


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
  h6: {
    margin: "30px",
    color: theme.palette.text.secondary,
    backgroundColor: "white",
    opacity:0.5,
  },
  h3: {
    color: theme.palette.text.secondary,
  },
  product: {
    margin: theme.spacing(10),
  },
}));

const Products = () => {
  const { products } = useContext(ProductsContext);

  const currentUser = AuthService.getCurrentUser();

  if(currentUser!==null){var user= OneUser(currentUser.id);}

  const classes = useStyles();
  var cont=0;
 

  return (
    
    <Suspense fallback={<Grid>Loading...</Grid>}>
      {currentUser!==null ?
      (user.verificate !== "true"?
      (<Grid>
        <Typography variant="h6" className={classes.h6} align="center">
           Por favor, verifica tu cuenta de correo
        </Typography>
      </Grid>):null
      ):null
  }
      <Grid className={classes.carousel}>
        <Container maxWidth="lg">
          <Caru1 />
        </Container>
      </Grid>
      <Grid item>
        <PrincipalButtons />
      </Grid>
      <Container id="products">
        <Grid container spacing={8}>
          <Grid container>
            <Typography variant="h3" className={classes.h3}>
              Ultimas Subidas
            </Typography>
          </Grid>

          <Grid container spacing={2}>
            {products.map((product) => {
            if(currentUser!==null&&product.userBuyer===null)
             if(product.userOwner.email!==currentUser.name)
              return (
                <Grid item sm={6} md={3}>
                  <CardProduct product={product} />
                </Grid>
              );

            if(currentUser===null)
            return (
              <Grid item sm={6} md={3}>
                <CardProduct product={product} />
              </Grid>
            );
            })}
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
};

export default Products;
