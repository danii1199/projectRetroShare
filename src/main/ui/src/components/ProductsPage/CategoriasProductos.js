import { Grid, Container, Typography } from "@material-ui/core";
import VideoGameAPI from "../../lib/VideoGameAPI";
import CardProduct from "../CardProduct/CardProduct";
import PrincipalButtons from "../Buttons/PrincipalButtons";
import RecordPlayerAPI from "../../lib/RecordPlayerAPI";
import GameConsoleAPI from "../../lib/GameConsoleAPI";
import VinylAPI from "../../lib/VinylAPI";




const CategoriasProductos = (props) => {
  const games = VideoGameAPI();
  const consoles = GameConsoleAPI();
  const recordplayers = RecordPlayerAPI();
  const vinyls = VinylAPI();

  const localizacion = props.match.path;

  const RESPUESTAS_POSIBLES = {
    '/videogames':  games,
    '/gameconsole': consoles,
    '/rplayer': recordplayers,
    '/vinyl': vinyls,
  }

  const RESPUESTA = RESPUESTAS_POSIBLES[localizacion];

  return (
    <>
      <PrincipalButtons />

      <Container>
        <Grid container spacing={8}>
          {RESPUESTA.length > 0 && (
            <Grid item>
              <Typography variant="h3" color="secondary">Productos</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {RESPUESTA.map((product) => {
              return (
                <Grid key={RESPUESTA.id} item sm={6} md={3}>
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

export default CategoriasProductos;
