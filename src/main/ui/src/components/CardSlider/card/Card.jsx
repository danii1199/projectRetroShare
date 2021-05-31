import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductsAPI from "../../../lib/ProductsAPI";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.palette.common.black
  },
  slider: {
    margin: theme.spacing(5),
    width: "auto%",
  },
  text: {
    margin: "30px",
    color: theme.palette.common.white,
  },
  item: {
    margin: theme.spacing(1),
  },
  button: {
    float: "right",
    boxShadow: "0 4px 10px 0 #D9B504",
  },
}));

const Cards = () => {
  const classes = useStyles();

  let settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 5,
    slideToScroll: 1,
  };
  const history = useHistory();
  const products = ProductsAPI();

  return (
    <Container>
      <Slider {...settings} className={classes.slider}>
        {products.map((product) => {
          return (
            <Card key={product} className={classes.item}>
              <CardActionArea
                onClick={() => {
                  history.push(`/pr/${product.id}`);
                  history.go();
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.image}
                  height="260"
                  className="card-image"
                  image={process.env.PUBLIC_URL + "/" + product.image}
                  title={product.name}
                />
                <CardContent className="content">
                  <Typography
                    align="left"
                    className={classes.title}
                    gutterBottom
                    variant="h5"
                  >
                    {product.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Slider>
    </Container>
  );
};
export default Cards;
