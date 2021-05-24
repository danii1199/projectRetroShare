import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardProduct from "../CardProduct/CardProduct";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useContext, Suspense } from "react";
import VideoGameAPI from "../../lib/VideoGameAPI";
import GameConsoleAPI from "../../lib/GameConsoleAPI";
import VinylAPI from "../../lib/VinylAPI";
import RecordPlayerAPI from "../../lib/RecordPlayerAPI";
import Caru1 from "../Carousel/Caru1";
import OneUser from "../../lib/OneUser";
import AuthService from "../../Service/Auth/AuthService";
import PrincipalButtons from "../Buttons/PrincipalButtons";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "auto",
  },
  imagenes: {
    margin: "auto",
    width: "auto",
    height: "auto",
    position: "absolute",
  },
  h3: {
    margin: "30px",
    color: theme.palette.text.secondary
  },
  product: {
    margin: theme.spacing(10)
  },
}));

const Products = () => {
  const currentUser = AuthService.getCurrentUser();
  const user = OneUser(currentUser?.id);
  const { products } = useContext(ProductsContext);

  const classes = useStyles();
  const games = VideoGameAPI();
  const consoles = GameConsoleAPI();
  const vinyls = VinylAPI();
  const recordPlayers = RecordPlayerAPI();
  var con = [];
  console.log(products);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={classes.carousel}>
        <Container maxWidth="lg">
          <Caru1 />
        </Container>
      </div>
      <div>
        <Grid item>
          <PrincipalButtons/>
        </Grid>
      </div>

      <Container id="products">
        <Grid container spacing={8}>
          <Grid container>
            <Typography variant="h3" className={classes.h3}>
              Ultimas Subidas
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            {products
              .map((product) => {
                if (
                  product.userBuyer &&
                  product.userOwner.id !== user?.id &&
                  product.userBuyer.id !== user?.id
                )
                  return (
                    <Grid key={product.id} item sm={6} md={3}>
                      <CardProduct product={product} />
                    </Grid>
                  );
                return <></>;
              })}
          </Grid>
          <Grid container spacing={2}>
            {games.slice(games.length - 4, games.length).map((product) => {
              if (product.userBuyer === null)
                if (product.userOwner.id !== user?.id)
                  if (con.length === 0) {
                    con.push(product.id);
                    return (
                      <Grid container>
                        <Typography variant="h3" className={classes.h3}>
                          Games
                        </Typography>
                      </Grid>
                    );
                  }
              return <></>;
            }, (con = []))}
          </Grid>
          <Grid container spacing={2}>
            {games.slice(games.length - 4, games.length).map((product) => {
              if (product.userBuyer === null)
                if (product.userOwner.id !== user?.id)
                  return (
                    <Grid key={games.id + product.id} item sm={6} md={3}>
                      <CardProduct product={product} className={classes.product} />
                    </Grid>
                  );
              return <></>;
            })}
          </Grid>
          <Grid container spacing={2}>
            {consoles
              .slice(consoles.length - 4, consoles.length)
              .map((product) => {
                if (product.userBuyer === null)
                  if (product.userOwner.id !== user?.id)
                    if (con.length === 0) {
                      con.push(product.id);
                      return (
                        <Grid container>
                          <Typography variant="h3" className={classes.h3}>
                            Videoconsoles
                          </Typography>
                        </Grid>
                      );
                    }
                return <></>;
              }, (con = []))}
          </Grid>
          <Grid container spacing={2}>
            {consoles
              .slice(consoles.length - 4, consoles.length)
              .map((product) => {
                if (product.userBuyer === null)
                  if (product.userOwner.id !== user?.id)
                    return (
                      <Grid key={consoles.id} item sm={6} md={3}>
                        <CardProduct product={product} />
                      </Grid>
                    );
                return <></>;
              })}
          </Grid>
          <Grid container spacing={2}>
            {vinyls.slice(vinyls.length - 4, vinyls.length).map((product) => {
              if (product.userBuyer === null)
                if (product.userOwner.id !== user?.id)
                  if (con.length === 0) {
                    con.push(product.id);
                    return (
                      <Grid container>
                        <Typography variant="h3" className={classes.h3}>
                          Vinyls
                        </Typography>
                      </Grid>
                    );
                  }
              return <></>;
            }, (con = []))}
          </Grid>
          <Grid container spacing={2}>
            {vinyls.slice(vinyls.length - 4, vinyls.length).map((product) => {
              if (product.userBuyer === null)
                if (product.userOwner.id !== user?.id)
                  return (
                    <Grid key={vinyls.id} item sm={6} md={3}>
                      <CardProduct product={product} />
                    </Grid>
                  );
              return <></>;
            })}
          </Grid>
          <Grid container spacing={2}>
            {recordPlayers
              .slice(recordPlayers.length - 4, recordPlayers.length)
              .map((product) => {
                if (product.userBuyer === null)
                  if (product.userOwner.id !== user?.id)
                    if (con.length === 0) {
                      con.push(product.id);
                      return (
                        <Grid container>
                          <Typography variant="h3" className={classes.h3}>
                            Record Players
                          </Typography>
                        </Grid>
                      );
                    }

                return <></>;
              }, (con = []))}
          </Grid>
          <Grid container spacing={2}>
            {recordPlayers
              .slice(recordPlayers.length - 4, recordPlayers.length)
              .map((product) => {
                if (product.userBuyer === null)
                  if (product.userOwner.id !== user?.id)
                    return (
                      <Grid key={recordPlayers.id} item sm={6} md={3}>
                        <CardProduct product={product} />
                      </Grid>
                    );
                return <></>;
              })}
          </Grid>
        </Grid>
      </Container>
    </Suspense>
  );
};

export default Products;
