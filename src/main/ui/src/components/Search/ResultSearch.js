import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardProduct from "../CardProduct/CardProduct";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext, Suspense } from "react";
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

const Products = (props) => {
  const { products } = useContext(ProductsContext);
  
  const localizacion=(props.location.pathname).split("/");
  
  const classes = useStyles();
  const searchName=localizacion[(localizacion.length)-1];

  return (
    <Suspense fallback={<Grid>Loading...</Grid>}>
      <Grid item>
        <PrincipalButtons />
      </Grid>
      <Container id="products">
        <Grid container spacing={8}>
          <Grid container>
            <Typography variant="h3" className={classes.h3}>
              Resultados de la busqueda "{searchName}"
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {products.map((product) => {
              if(product.name===searchName)
              return (
                <Grid item sm={6} md={3}>
                  <CardProduct product={product} />
                </Grid>
              );
              return(<></>)
            })}
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
};

export default Products;