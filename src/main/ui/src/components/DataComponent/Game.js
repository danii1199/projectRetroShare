import { Grid, Container, Typography, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import "./style.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import VideoGameAPI from "../../lib/VideoGameAPI";
import CardProduct from "../CardProduct/CardProduct";

const GameDataComponent = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "sans-serif",
    },
  });

  theme.typography.h3 = {
    fontFamily: "sans-serif",
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };

  const games = VideoGameAPI();

  return (
    <>
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

      <Container xs id="products">
        <Grid container spacing={8}>
          {games.length > 0 && (
            <Grid item>
              <ThemeProvider theme={theme}>
                <Typography variant="h3">Videogames</Typography>
              </ThemeProvider>
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
