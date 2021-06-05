import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button  from "@material-ui/core/Button";
import { useHistory } from "react-router";
import Image from 'material-ui-image'

const useStyles = makeStyles((theme) => ({
 
  titulo: {
    color: theme.palette.common.white,
    marginBottom: "30px",
    width:"700px"
  },
  container: {
    width:"auto",
    height:"100px",
    borderRadius:"8px",
    marginTop: "350px",
    marginLeft: "-200px"
  },
  button: {
    padding: theme.spacing(2, 8),
    boxShadow: "0 4px 10px 0 #D9B504",
    backgroundColor:theme.palette.common.white,
    color:theme.palette.primary.main,
  },
  foto: {
    backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')",
    backgroundSize:"cover",
    width:"900px",
    height:"500px",
    marginLeft:"550px",
    marginTop:"-250px"

  }
}));

const HomePage = () => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Container >
      <Grid className={classes.container}>
        <Typography variant="h2" className={classes.titulo}>
          Bienvenido a Retroshare!
        </Typography>
      
        <Typography variant="h4" className={classes.titulo}>
          Aquí podrás comprar y vender cualquier consola retro, videojuego retro, tocadisco o vinilo. 
        </Typography>
        <Button
        className={classes.button}
      onClick={() => {
        history.push(`/home`);
        history.go();
      }}
     >Acceder al inicio</Button>
      </Grid>
      <Grid className={classes.foto}>
      </Grid>
      </Container>
  );
}

export default HomePage;
