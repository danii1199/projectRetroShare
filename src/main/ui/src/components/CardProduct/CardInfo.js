import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import "./styleCard.css";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import { useHistory } from "react-router-dom";

const CardProduct = ({ product }) => {
  const history = useHistory();

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
          height="260"
          className="card-image"
          image={process.env.PUBLIC_URL + "/" + product.image}
          title={product.name}
        />
        <CardContent className="content">
          <Typography
            align="left"
            display="inline"
            className="title"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {product.name}
          </Typography>
          <Typography
            className="status"
            align="right"
            gutterBottom
            variant="h6"
            component="h2"
          >
            {product.productStatus?.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="actions-content">
        <Typography field="price" gutterBottom variant="h5" component="h2">
          {product.price} <EuroSymbolIcon />
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CardProduct;
