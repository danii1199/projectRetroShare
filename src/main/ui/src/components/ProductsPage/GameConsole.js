import { Grid, Container, Typography } from "@material-ui/core";
import GameConsoleAPI from "../../lib/GameConsoleAPI";
import CardProduct from "../CardProduct/CardProduct";
import PrincipalButtons from "../Buttons/PrincipalButtons";

const GameConsoleComponent = () => {
  const consoles = GameConsoleAPI();

  return (
    <>
      <PrincipalButtons />

      <Container xs id="products">
        <Grid container spacing={8}>
          {consoles.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h3">Videoconsoles</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {consoles.map((product) => {
              return (
                <Grid key={consoles.id} item xs={12} sm={6} md={3}>
                  <CardProduct key={consoles.id} product={product} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GameConsoleComponent;
