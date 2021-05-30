import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardProduct from "../CardProduct/CardProduct";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext, Suspense } from "react";

import Caru1 from "../Carousel/Caru1";
import PrincipalButtons from "../Buttons/PrincipalButtons";

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
  h3: {
    margin: "30px",
    color: theme.palette.text.secondary,
  },
  product: {
    margin: theme.spacing(10),
  },
}));

const Products = () => {
  const { products } = useContext(ProductsContext);

  const classes = useStyles();

  return (
    <Suspense fallback={<Grid>Loading...</Grid>}>
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
              return (
                <Grid key={product.id} item sm={6} md={3}>
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
