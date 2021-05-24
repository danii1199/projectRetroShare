import { Grid, Container, Typography } from "@material-ui/core";
import RecordPlayerAPI from "../../lib/RecordPlayerAPI";
import PrincipalButtons from "../Buttons/PrincipalButtons";
import CardProduct from "../CardProduct/CardProduct";

const RecordPlayerDataComponent = () => {
  const recordplayers = RecordPlayerAPI();

  return (
    <>
      <PrincipalButtons />

      <Container>
        <Grid container spacing={8}>
          {recordplayers.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h3">Record Players</Typography>
            </Grid>
          )}
          <Grid container spacing={2}>
            {recordplayers.map((product) => {
              return (
                <Grid key={recordplayers.id} item xs={12} sm={6} md={3}>
                  <CardProduct key={recordplayers.id} product={product} />
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
