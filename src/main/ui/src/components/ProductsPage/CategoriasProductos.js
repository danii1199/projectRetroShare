import { Grid, Container, Typography } from "@material-ui/core";
import VideoGameAPI from "../../lib/VideoGameAPI";
import CardProduct from "../CardProduct/CardProduct";
import PrincipalButtons from "../Buttons/PrincipalButtons";
import RecordPlayerAPI from "../../lib/RecordPlayerAPI";
import GameConsoleAPI from "../../lib/GameConsoleAPI";
import VinylAPI from "../../lib/VinylAPI";
import AuthService from "../../Service/Auth/AuthService";

const CategoriasProductos = (props) => {
  const games = VideoGameAPI();
  const consoles = GameConsoleAPI();
  const recordplayers = RecordPlayerAPI();
  const vinyls = VinylAPI();

  const localizacion = props.match.path;

  const RESPUESTAS_POSIBLES = {
    "/videogames": games,
    "/gameconsole": consoles,
    "/rplayer": recordplayers,
    "/vinyl": vinyls,
  };

  const RESPUESTA = RESPUESTAS_POSIBLES[localizacion];

  const currentUser = AuthService.getCurrentUser();

  return (
    <>
      <Container>
        <PrincipalButtons />
        <Grid container spacing={8}>
          {RESPUESTA.length > 0 && (
            <Grid item>
              <Typography variant="h3" color="secondary">
                Productos
              </Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {RESPUESTA.map((product) => {
              if (currentUser !== null && product.userBuyer === null)
                if (product.userOwner.email !== currentUser.name)
                  return (
                    <Grid key={RESPUESTA.id} item sm={6} md={3}>
                      <CardProduct product={product} />
                    </Grid>
                  );

              if (currentUser === null)
                return (
                  <Grid item sm={6} md={3}>
                    <CardProduct product={product} />
                  </Grid>
                );
              return <></>;
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CategoriasProductos;
