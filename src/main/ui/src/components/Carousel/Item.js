import { Paper, CardMedia, CardActionArea } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  padding: {
    marginTop: theme.spacing(8)
  },
  title: {
    marginTop: theme.spacing(0)
  }
}));

const Item = (props) => {
  const classes = useStyles();
  
    return (
      <Paper className={classes.padding}>
        <CardActionArea component={Link} to={`pr/${props.item.id}`}>
          <CardMedia
            component="img"
            alt={props.item.image}
            height="500px"
            width="auto"
            className="card-image"
            image={props.item.image}
            title={props.item.name}
          >
          </CardMedia>
          
        </CardActionArea>
        
      </Paper>
    );
  };

  export default Item;