import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import AuthService from "../../Service/Auth/AuthService";
import RetroService from "../../Service/RetroshareService"
import { isEmail } from "validator";
import { useHistory } from "react-router-dom";
import { useData } from "../ProductForm/DataContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        retroshare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const emailVer = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Esto no es un correo válido
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SingIn() {
  const { setValues, data } = useData();
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email: data.email, password: data.password },
    mode: "onBlur",
  });
  const history = useHistory();



  const onSubmit = (data) => {
    AuthService.login(data).then(() => {
      var correo=document.getElementById("email").value;
       RetroService.findEmail(correo).then((x) => {
    if(x.data.role.id===3){
      history.push("/disabled");
      history.go()
    }else{
      history.push("/home");
      history.go()
    }
  });
      setValues(data);
    });
  };
  console.log(RetroService.findByEmail(data.email))
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de Sesión
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register({
              required: { value: true, message: "required field" },
            })}
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            validations={[emailVer]}
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                name="remember"
                color="primary"
                defaultValue={false}
              />
            }
            label="Recuérdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            INICIAR SESIÓN
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
              </Link>
            </Grid>
            <Grid item>
              <Link href="/singup" variant="body2">
                {"¿Aún no te has resgistrado? Registrarse"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
