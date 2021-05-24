import { Grid, Container, Typography } from "@material-ui/core";
import VinylAPI from "../../lib/VinylAPI";
import CardProduct from "../CardProduct/CardProduct";
import PrincipalButtons from "../Buttons/PrincipalButtons";

const RecordPlayerDataComponent = () => {
  const vinyls = VinylAPI();

  return (
    <>
      <PrincipalButtons />

      <Container item>
        <Grid container spacing={8}>
          {vinyls.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h3">Vinyls</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {vinyls.map((product) => {
              return (
                <Grid key={vinyls.id} item xs={12} sm={6} md={3}>
                  <CardProduct key={vinyls.id} product={product} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RecordPlayerDataComponent;
