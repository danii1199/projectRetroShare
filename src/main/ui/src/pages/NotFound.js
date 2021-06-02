import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



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

const NotFound = (props) => {
  const classes = useStyles();

  return (
    <Container>
        <Typography variant="h1" className={classes.titulo} align="center">
          404
        </Typography>

        <Typography variant="h4" className={classes.titulo} align="center">
          Page Not Found
        </Typography>
      </Container>
  );
}

export default NotFound;
