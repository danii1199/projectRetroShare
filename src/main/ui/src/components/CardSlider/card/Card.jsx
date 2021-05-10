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
import "./style.css";
import ProductsAPI from "../../../lib/ProductsAPI";
import { useHistory } from "react-router-dom";

const Cards = () => {
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
      <Slider {...settings}>
        {products.map((product) => {
          return (
            
            <Card key={product} className="card-design">
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
                    className="title"
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
