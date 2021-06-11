import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  fade,
} from "@material-ui/core";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import AuthService from "../../Service/Auth/AuthService";
import RetroshareService from "../../Service/RetroshareService";

const useStyles = makeStyles((theme) => ({
  image: {
    objectFit: "fill"
  },
  button: {
    margin: theme.spacing(0, 1, 0, 3),
    boxShadow: "5px 6px 15px 1px #0D0D0D",
    float: "inline-end",
  },
  customCard: {
    transition: "all 0.2s ease-in-out",
    backgroundColor: theme.palette.background.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.light, 0.85),
      boxShadow: "0px 0px 20px 1px #8C8C8C",
      transform: "scale(1.02)",
    },
    color: theme.palette.common.white,
    padding: "5px",
    borderRadius: "10px",
    margin: "5px",
  },
  content: {
    paddingBottom: theme.spacing(0),
  },
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  price: {
    marginTop: theme.spacing(1),
  },
  status: {
    marginTop: theme.spacing(0),
    color: theme.palette.common.black,
  },
  actionsContent: {
    padding: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.light,
  },
}));

const CardProduct = ({ product }) => {
  const history = useHistory();
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();

  return (
    <Card className="custom-card">
      <CardActionArea
        onClick={() => {
          history.push(`/pr/${product.id}`);
          history.go();
        }}
      >
        <CardMedia
          component="img"
          alt={product.image}
          height="220"
          className={classes.image}
          image={process.env.PUBLIC_URL + "/" + product.images}
          title={product.name}
        />
        <CardContent className={classes.content}>
          <Typography
            align="left"
            display="inline"
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {product.name}
          </Typography>
          <Typography
            className={classes.status}
            align="right"
            gutterBottom
            variant="h6"
            component="h2"
          >
            {product.productStatus?.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionsContent}>
        <Typography
          className={classes.price}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {product.price} <EuroSymbolIcon />
        </Typography>
        {currentUser.name === product.userOwner.email && (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            className={classes.button}
            onClick={() => {
              RetroshareService.deleteProduct(product.id);
              history.push(`/profile`);
              history.go();
            }}
          >
            <Delete />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CardProduct;
