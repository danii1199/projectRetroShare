import { CardMedia, CardActionArea, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  padding: {
    marginTop: theme.spacing(1),
  },

  image: {
    backgroundSize: "cover",
    height: "50vh",
    width: "100vw",
  },
}));

const Item = (props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.padding} key={props.i}>
      <CardActionArea
        component={Link}
        className={classes.padding}
        to={`${props.item.to}`}
      >
        <CardMedia
          component="img"
          alt={props.item.alt}
          className={classes.image}
          image={props.item.src}
          title={props.item.caption}
        ></CardMedia>
      </CardActionArea>
    </Grid>
  );
};

export default Item;
