import { Paper, CardMedia, CardActionArea, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  padding: {
    marginTop: theme.spacing(1),
    height: "500px",
    
  },

  image: {
    height: "auto",
    boxShadow: "0 4px 15px 5px #D9B504",
  },
}));

const Item = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.padding} key={props.i}>
      <Paper >
        <CardActionArea
          component={Link}
          className={classes.padding}
          to={`pr/${props.item.id}`}
        >
          <CardMedia
            component="img"
            alt={props.item.image}
            className={classes.image}
            image={props.item.image}
            title={props.item.name}
          ></CardMedia>
        </CardActionArea>
      </Paper>
    </Container>
  );
};

export default Item;
