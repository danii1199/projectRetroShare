import { Container, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import OneProduct from "./OneProduct";
import Card from "../CardSlider/card/Card";
import RetroshareService from "../../Service/RetroshareService";

const ProductView = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const id = window.location.pathname.split("/")[2];
    RetroshareService.getOneProduct(id).then((response) => {
      const { data } = response;
      setProduct(data);
    });
  };

  return (
    <>
      <div>
        <Container id="products">
          <Grid container spacing={12}>
            <Grid item xs={12}>
              <OneProduct key={products.id} product={products} />
              <Card />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};
export default ProductView;
