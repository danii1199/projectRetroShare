import OneUser from "../../lib/OneUser";
import AuthService from "../../Service/Auth/AuthService";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardInfo from "../CardProduct/CardInfo";

const useStyles = makeStyles({
  avatar: {
    width: "160px",
    height: "160px",
    borderRadius: "80px",
  },
  texto: {
    paddingLeft: "30px",
  },
  titulo: {
    marginBottom: "30px",
  },
  infoUser: {
    display: "flex",
    justifyContent: "space-around",
  },
  messageArea: {
    height: "65vh",
    overflowY: "auto",
  },
  background: {
    marginTop: "90px",
  },
});

const UserProfile = () => {
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();
  const user = OneUser(currentUser.id);

  return (
    <Container>
      <Grid>
        <Grid
          className={classes.infoUser}
        >
          <Grid item>
            <img
              alt={user.avatar}
              className={classes.avatar}
              src={user.avatar}
            />
          </Grid>
          <Grid container>
            <Typography variant="h5" className={classes.texto}>
              UserName: {user.userName}
            </Typography>
            <Typography className={classes.texto}>
              First Name: {user.firstName}
            </Typography>
            <Typography className={classes.texto}>
              Last Name: {user.lastName}
            </Typography>
            <Grid container>
              <Typography className={classes.texto}>
                Email: {user.email}
              </Typography>
              <Typography className={classes.texto}>
                Last Name: {currentUser.name}
              </Typography>
              <Typography className={classes.texto}>
                Phone Number: {currentUser.phoneNumer}
              </Typography>
              <Typography className={classes.texto}>
                City: {currentUser.city}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          className="file-field input-field"
          style={{ margin: "10px" }}
        ></Grid>
      </Grid>
      <Grid item>
        <Typography variant="h4" className={classes.titulo}>
          Your Products:
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {user.products?.map((product) => {
          return (
            <Grid key={product.id} item sm={6} md={3}>
              <CardInfo product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default UserProfile;
