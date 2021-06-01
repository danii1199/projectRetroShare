import OneUser from "../../lib/OneUser";
import AuthService from "../../Service/Auth/AuthService";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardInfo from "../CardProduct/CardInfo";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import Information from "./components/Information";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginTop: "20px",
    width: "160px",
    height: "160px",
    borderRadius: "80px",
  },
  texto: {
    marginTop: "20px",
    paddingLeft: "30px",
    color: theme.palette.common.white,
  },
  titulo: {
    color: theme.palette.common.white,
    marginBottom: "30px",
  },
  infoUser: {
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "space-around",
  },
  messageArea: {
    color: theme.palette.common.white,
    height: "65vh",
    overflowY: "auto",
  },
  background: {
    marginTop: "90px",
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();
  const user = OneUser(currentUser.id);
  const { products } = useContext(ProductsContext);
  return (
    <Container>
      <Information />
      <Grid item>
        <Typography variant="h4" className={classes.titulo}>
          Tus Compras:
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {products.map((product) => {
          console.log(product.userBuyer);
          if (product.userBuyer !== null)
            if (product.userBuyer.id === user.id)
              return (
                <Grid key={product.id} item sm={6} md={3}>
                  <CardInfo product={product} />
                </Grid>
              );

          return <></>;
        })}
      </Grid>
      <Grid item>
        <Typography variant="h4" className={classes.titulo}>
          Productos subidos por {user.userName}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {products.map((product) => {
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
