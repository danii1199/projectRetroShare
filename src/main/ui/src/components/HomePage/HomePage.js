import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useState, useRef, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  titulo: {
    color: theme.palette.primary.light,
  },
  container: {
    alignItems: "center",
    marginTop: "40vh",
    marginLeft: "40vh",
  },

  button: {
    marginLeft: "20%",
    boxShadow: "0 4px 10px 0 #D9B504",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  foto: {
    background: "url('./fondoHome.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },

  fabProgress: {
    color: theme.palette.primary.light,
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: theme.palette.primary.light,
    top: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  if (success) {
    history.push(`/home`);
    history.go();
  }

  return (
    <Grid container className={classes.foto}>
      <Grid className={classes.container}>
        <Grid container>
          <Typography variant="h4" className={classes.titulo}>
            Empieza tú aventura
          </Typography>
        </Grid>
        <Grid className={classes.wrapper}>
          <Button
            children="Inicio"
            className={classes.button}
            onClick={handleButtonClick}
            disabled={loading}
            variant="contained"
            color="secondary"
          />
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
