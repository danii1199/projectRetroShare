import OneUser from "../../lib/OneUser";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardInfo from "../CardProduct/CardInfo";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext } from "react";


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
    color: theme.palette.common.white
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
  const user = OneUser(window.location.pathname.split("/")[2]);
  const { products } = useContext(ProductsContext);
  const fechaReg = user.date;
  //const fecha=fechaReg.substring(8,10)+"-"+fechaReg.substring(5,7)+"-"+fechaReg.substring(0,4);
  console.log(user);

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
                Nombre: {user.firstName} {user.lastName}
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

        <Grid
          className="file-field input-field"
          style={{ margin: "10px" }}
        ></Grid>
      </Grid>
      <Grid item>
        <Typography variant="h4" className={classes.titulo}>
          Productos subidos por {user.userName}
        </Typography>
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
      <Grid item>
        <Typography variant="h4" className={classes.titulo}>
          Tus compras:
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {products.map((product) => {
          console.log(product.userOwner.id);
          if(product.userBuyer!==null)
          if (product.userBuyer.id === user.id)
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
