import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import CardProduct from "../CardProduct/CardProduct";
import { ProductsContext } from "../../contexts/ProductsContext";
import { lazy, useContext, Suspense } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
//import Carousel from "react-material-ui-carousel";
import "./style.css";
import VideoGameAPI from "../../lib/VideoGameAPI";
import GameConsoleAPI from "../../lib/GameConsoleAPI";
import VinylAPI from "../../lib/VinylAPI";
import RecordPlayerAPI from "../../lib/RecordPlayerAPI";
import AlbumIcon from "@material-ui/icons/Album";
import Item from "../Carousel/Item";


const CardProduct = lazy(() => import('../CardProduct/CardProduct'))
const Carousel = lazy(() => import('react-material-ui-carousel'))


const useStyles = makeStyles(() => ({
  carousel: {
    height: "auto",
    
  },
  imagenes: {
    margin: "auto",
    width: "auto",
    height: "auto",
    position: "absolute",
  },
}));

const Products = () => {
  const classes = useStyles();
  const { products } = useContext(ProductsContext);
  const games = VideoGameAPI();
  const consoles = GameConsoleAPI();
  const vinyls = VinylAPI();
  const recordPlayers = RecordPlayerAPI();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={classes.carousel}>
        <Container maxWidth="lg">
          <Carousel
            key={20}
            NextIcon="next" // Change the "inside" of the next button to "next"
            PrevIcon="prev"
            IndicatorIcon={<AlbumIcon />}
            indicatorIconButtonProps={{
              style: {
                padding: "10px", // 1
                color: "#FFFFFF", // 3
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                backgroundColor: "#121212", // 2
              },
            }}
            indicatorContainerProps={{
              style: {
                marginTop: "50px", // 5
                textAligh: "right", // 4
              },
            }}
            NavButton={({ onClick, className, style, next, prev }) => {
              return (
                <Button onClick={onClick} className={className} style={style}>
                  {next && "Next"}
                  {prev && "Previous"}
                </Button>
              );
            }}
          >
            {products.map((item) => (
              <Grid key={item.id}>
                <Item className={classes.imagenes} item={item} />
              </Grid>
            ))}
          </Carousel>
        </Container>
      </div>
      <div>
        <Container id="buttons">
          <Grid container spacing={1}>
            <Button className="button" component={Link} to="/videogames">
              Games
            </Button>
            <Button className="button" component={Link} to="/gameconsole">
              Consoles
            </Button>
            <Button className="button" component={Link} to="/rplayer">
              R.Player
            </Button>
            <Button className="button" component={Link} to="/vinyl">
              Vinyl
            </Button>
          </Grid>
        </Container>
      </div>

      <Container id="products">
        <Grid container spacing={8}>
          <Grid container>
            <Typography fontFamily="BlinkMacSystemFont" variant="h3">
              Recently Add
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {products
              .slice(products.length - 4, products.length)
              .map((product) => {
                return (
                  <Grid key={product.id} item sm={6} md={3}>
                    <CardProduct product={product} />
                  </Grid>
                );
              })}
          </Grid>
          {games.length > 0 && (
            <Grid container>
              <Typography variant="h3">Games</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {games.slice(games.length - 4, games.length).map((product) => {
              return (
                <Grid key={games.id} item sm={6} md={3}>
                  <CardProduct product={product} />
                </Grid>
              );
            })}
          </Grid>
          {consoles.length > 0 && (
            <Grid container>
              <Typography variant="h3">Videoconsoles</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {consoles
              .slice(consoles.length - 4, consoles.length)
              .map((product) => {
                return (
                  <Grid key={consoles.id} item sm={6} md={3}>
                    <CardProduct product={product} />
                  </Grid>
                );
              })}
          </Grid>
          {vinyls.length > 0 && (
            <Grid container>
              <Typography variant="h3">Vinyls</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {vinyls.slice(vinyls.length - 4, vinyls.length).map((product) => {
              return (
                <Grid key={vinyls.id} item sm={6} md={3}>
                  <CardProduct product={product} />
                </Grid>
              );
            })}
          </Grid>
          {recordPlayers.length > 0 && <Grid item></Grid>}
          <Grid container spacing={2}>
            {recordPlayers
              .slice(recordPlayers.length - 4, recordPlayers.length)
              .map((product) => {
                return (
                  <Grid key={recordPlayers.id} item sm={6} md={3}>
                    <CardProduct product={product} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
};

export default Products;
