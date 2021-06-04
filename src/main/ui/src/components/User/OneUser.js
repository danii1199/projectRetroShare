import OneUser from "../../lib/OneUser";
import { Grid, Container, Typography } from "@material-ui/core";
import CardProduct from "../CardProduct/CardProduct";
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
    color: theme.palette.common.black,
    fontSize:"20px"
  },
  titulo: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.common.black,
    fontSize:"30px"
  },
  otrotitulo:{
    color: theme.palette.common.white,
    marginBottom: "30px",
  },

  infoUser: {
    color: theme.palette.common.white,
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: theme.palette.primary.main,
    borderRadius:"6px",
    marginTop:"100px"
  },
  linea: {
    borderTop:"1px solid black"
  }
}));

const UserProfile = () => {
  const user = OneUser(window.location.pathname.split("/")[2]);
  const { products } = useContext(ProductsContext);
  const classes = useStyles();
  let fecha =
  user.date?.substring(8, 10) +
  "-" +
  user.date?.substring(5, 7)+
  "-" +
  user.date?.substring(0, 4);
  //const fecha=fechaReg?.substring(8,10)+"-"+fechaReg.substring(5,7)+"-"+fechaReg.substring(0,4);
  return (
    <Container>
       <Grid>
      <Grid className={classes.infoUser}>
      {user.avatar!==null?
        <Grid item>
          <img alt={user.avatar} className={classes.avatar} src={user.avatar} />
        </Grid>
        :
        <Grid item>
        <img alt="anonymous" className={classes.avatar} src="https://c1.klipartz.com/pngpicture/74/8/sticker-png-circle-silhouette-user-logo-user-profile-avatar-head-line-art-oval.png" />
      </Grid>
          }
        <Grid container>
          <Typography variant="h5" className={classes.titulo}>
            {user.userName}
          </Typography>
          <Grid container className={classes.linea}>
            <Typography className={classes.texto}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography className={classes.texto}>
              Correo: {user.email}
            </Typography>
            <Typography className={classes.texto}>
              Registrado en: {fecha}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <Grid item>
        <Typography variant="h4" className={classes.otrotitulo}>
          Sus productos
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        {products.map((product) => {
          console.log(product.userOwner.id);
          if (product.userOwner.id === user.id)
            return (
              <Grid key={product.id} item sm={6} md={3}>
                <CardProduct product={product} />
              </Grid>
            );
          return <></>;
        })}
      </Grid>
    </Container>
  );
};

export default UserProfile;
