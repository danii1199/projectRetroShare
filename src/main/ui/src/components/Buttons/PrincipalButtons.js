import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(6, 8, 6, 6),
    padding: theme.spacing(2, 8),
    boxShadow: "0 4px 10px 0 #8C8C8C",
  },
}));

const PrincipalButtons = () => {
    const classes = useStyles();
  return (
    <>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        component={Link}
        to="/videogames"
      >
        Games
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        component={Link}
        to="/gameconsole"
      >
        Consoles
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        component={Link}
        to="/rplayer"
      >
        R.Player
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        component={Link}
        to="/vinyl"
      >
        Vinyl
      </Button>
    </>
  );
};

export default PrincipalButtons;
