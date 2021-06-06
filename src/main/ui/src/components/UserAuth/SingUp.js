import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useData } from "../ProductForm/DataContext";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../ProductForm/components/PrimaryButton";

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

const schema = yup.object().shape({
  email: yup
    .string()
    .email("El correo debe tener el formato correcto")
    .required("El email es un campo requerido"),

    userName: yup
    .string()
    .min(3,"El mínimo de caracteres es 3")
    .max(25,"El maximo de caracteres es 25")
    .required("El nombre de usuario es obligatorio"),
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "El nombre no puede contener números")
    .min(3,"El mínimo de caracteres es 3")
    .max(25,"El maximo de caracteres es 25")
    .required("El nombre es obligatorio"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Los apellidos no pueden contener números")
    .min(5,"El mínimo de caracteres es 5")
    .max(50,"El maximo de caracteres es 50")
    .required("Los apellidos son obligatorios"),
  password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial")
    .required('Por favor introduce una contraseña'),
});

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
    color: "#282c34",
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const { setValues, data } = useData();
  const history = useHistory();
  const classes = useStyles();

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    history.push("./SignUpResult");
    setValues(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                inputRef={register({
                  required: { value: true, message: "Valor requerido" },
                })}
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                inputRef={register({
                  required: { value: true, message: "Valor requerido" },
                })}
                fullWidth
                id="lastName"
                label="Apellidos"
                name="lastName"
                autoComplete="lname"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="uname"
                name="userName"
                variant="outlined"
                fullWidth
                id="userName"
                label="Nombre de usuario"
                inputRef={register({
                  required: { value: true, message: "Valor requerido" },
                })}
                error={!!errors.userName}
                helperText={errors?.userName?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register({
                  required: { value: true, message: "Valor requerido" },
                })}
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={register({
                  required: { value: true, message: "Valor requerido" },
                })}
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                required
              />
            </Grid>
          </Grid>
          <PrimaryButton>Resgistrar</PrimaryButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/singin" variant="body2">
                ¿Ya estas registrado? Inica sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
