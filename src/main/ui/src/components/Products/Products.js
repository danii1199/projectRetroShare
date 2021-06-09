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
    width: "auto",
    alignItems: "center",
  },
  imagenes: {
    margin: "auto",
    width: "auto",
    height: "auto",
    position: "absolute",
  },
  h6: {
    color: theme.palette.text.secondary,
    backgroundColor: "white",
    opacity: 0.5,
  },
  h3: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  product: {
    margin: theme.spacing(10),
  },
  contenedor: {
    padding: theme.spacing(1),
    alignItems: "center"
  }
}));

const Products = () => {
  const { products } = useContext(ProductsContext);

  const currentUser = AuthService.getCurrentUser();

  if (currentUser !== null) {
    var user = OneUser(currentUser.id);
  }

  const classes = useStyles();

  return (
    <Grid>
      <Grid className={classes.carousel}>
        <Caru1 />
        {currentUser !== null ? (
          user.verificate !== "true" ? (
            <Typography variant="h6" className={classes.h6} align="center">
              Por favor, verifica tu cuenta de correo
            </Typography>
          ) : null
        ) : null}
      </Grid>

      <Suspense fallback={<Grid>Loading...</Grid>}>
        <Container className={classes.contenedor}>
          <PrincipalButtons />
          <Grid container spacing={8}>
            <Grid container>
              <Typography variant="h3" className={classes.h3}>
                Echa un vistazo a nuestros productos
              </Typography>
            </Grid>

            <Grid container spacing={2}>
              {products.map((product) => {
                if (currentUser !== null && product.userBuyer === null)
                  if (product.userOwner.email !== currentUser.name)
                    return (
                      <Grid item sm={6} md={3}>
                        <CardProduct product={product} />
                      </Grid>
                    );

                if (currentUser === null && product.userBuyer === null)
                  return (
                    <Grid item sm={6} md={3}>
                      <CardProduct product={product} />
                    </Grid>
                  );
                return <></>;
              })}
            </Grid>
          </Grid>
        </Container>
      </Suspense>
    </Grid>
  );
};

export default Products;
