import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(6, 8, 6, 6),
    padding: theme.spacing(2, 8),
    boxShadow: "0 4px 10px 0 #D9B504",
  },
  buttonCart: {
    boxShadow: "0 4px 10px 0 #D9B504",
    float: "right"
  },
}));

const PrincipalButtons = () => {
  const classes = useStyles();
  return (
    <>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        component={Link}
        to="/videogames"
      >
        Games
      </Button>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        component={Link}
        to="/gameconsole"
      >
        Consoles
      </Button>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        component={Link}
        to="/rplayer"
      >
        R.Player
      </Button>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        component={Link}
        to="/vinyl"
      >
        Vinyl
      </Button>
    </>
  );
};

export const CartButton = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Button
      className={classes.buttonCart}
      size="large"
      color="secondary"
      variant="contained"
      onClick={() => {
        history.push(`/cart`);
        history.go();
      }}
    >
      To Cart
    </Button>
  );
};
export default PrincipalButtons;
