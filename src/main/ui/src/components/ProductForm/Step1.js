import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useData } from "./DataContext";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
}));

export const Step1 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { name: data.name, price: data.price },
    mode: "onBlur",
  });
  const classes = useStyles();

  const onSubmit = (data) => {
    history.push("./step2");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Producto que quieres añadir
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
          id="name"
          type="text"
          label="Nombre de Producto*"
          name="name"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <Input
          ref={register({
            required: { value: true, message: "Valor requerido" },
          })}
          id="price"
          type="number"
          label="Precio*"
          name="price"
          error={!!errors.price}
          helperText={errors?.price?.message}
        />

        <InputLabel className={classes.label} htmlFor="productType">
          Tipo de producto
        </InputLabel>
        <NativeSelect
          className={classes.selector}
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={register({
            required: { value: true, message: "Valor requerido" },
          })}
          inputProps={{
            name: "productType",
            id: "productType",
            label: "productType",
          }}
        >
          <option value={"game"}>Juego</option>
          <option value={"gameconsole"}>Video Consola</option>
          <option value={"vinyl"}>Vinilo</option>
          <option value={"recordplayer"}>Tocadiscos</option>
        </NativeSelect>
        <FormHelperText>
          Elige una de las 4 categorías
        </FormHelperText>
        <PrimaryButton>Siguiente</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
