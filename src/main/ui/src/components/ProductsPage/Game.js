import { Grid, Container, Typography } from "@material-ui/core";
import VideoGameAPI from "../../lib/VideoGameAPI";
import CardProduct from "../CardProduct/CardProduct";
import PrincipalButtons from "../Buttons/PrincipalButtons";

const GameDataComponent = () => {
  const games = VideoGameAPI();

  return (
    <>
      <PrincipalButtons />

      <Container>
        <Grid container spacing={8}>
          {games.length > 0 && (
            <Grid item>
              <Typography variant="h3">Videogames</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {games.map((product) => {
              return (
                <Grid key={games.id} item sm={6} md={3}>
                  <CardProduct product={product} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GameDataComponent;
