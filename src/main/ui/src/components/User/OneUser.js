import OneUser from "../../lib/OneUser";
import { Grid, Container, Typography } from "@material-ui/core";
import CardInfo from "../CardProduct/CardInfo";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(2),
    width: "160px",
    height: "160px",
    borderRadius: "80px",
  },
  texto: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.common.white,
  },
  titulo: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(5),
  },
  infoUser: {
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "space-around",
  },
}));

const UserProfile = () => {
  const user = OneUser(window.location.pathname.split("/")[2]);
  const { products } = useContext(ProductsContext);
  const classes = useStyles();
  const fechaReg = user.date;
  //const fecha=fechaReg.substring(8,10)+"-"+fechaReg.substring(5,7)+"-"+fechaReg.substring(0,4);
  return (
    <Container>
      <Grid>
        <Grid className={classes.infoUser}>
          <Grid item>
            <img
              alt={user.avatar}
              className={classes.avatar}
              src={user.avatar}
            />
          </Grid>
          <Grid container>
            <Typography variant="h5" className={classes.texto}>
              UserName: {user.userName}
            </Typography>
            <Grid container>
              <Typography className={classes.texto}>
                Name: {user.firstName} {user.lastName}
              </Typography>
              <Typography className={classes.texto}>
                Email: {user.email}
              </Typography>
              <Typography className={classes.texto}>
                City: {user.city}
              </Typography>
              <Typography className={classes.texto}>
                Registrado en: {fechaReg}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
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
