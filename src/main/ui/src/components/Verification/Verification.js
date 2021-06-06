import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import RetroshareService from "../../Service/RetroshareService"

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

const Verification = (props) => {
  const classes = useStyles();

  const localizacion=(props.location.pathname).split("/");
  const userName=localizacion[(localizacion.length)-1];

  useEffect(() => {
    RetroshareService.verification(userName);
    console.log(RetroshareService.verification(userName));
  });
  return (
    <Container>
        <Typography variant="h4" className={classes.titulo} align="center">
          Felicidades! Tu correo ha sido verificado con éxito.
        </Typography>
      </Container>
  );
}

export default Verification;
