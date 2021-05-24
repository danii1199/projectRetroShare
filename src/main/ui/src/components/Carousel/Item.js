import { Paper, CardMedia, CardActionArea } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  padding: {
    marginTop: theme.spacing(2),
    
  },
  image: {
    height: "500px"
  }
}));

const Item = (props) => {
  const classes = useStyles();
  
    return (
      <Paper className={classes.padding} key={props.i}>
        <CardActionArea component={Link} to={`pr/${props.item.id}`}>
          <CardMedia
            component="img"
            alt={props.item.image}
            className={classes.image}
            image={props.item.image}
            title={props.item.name}
          >
          </CardMedia>
          
        </CardActionArea>
        
      </Paper>
    );
  };

  export default Item;