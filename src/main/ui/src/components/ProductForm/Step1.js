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
  selector: {
    background: "#ffffff"
  },
}));

export const Step1 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { name: data.name, price: data.price },
    mode: "onBlur",
  });
  const styles = useStyles();

  const onSubmit = (data) => {
    history.push("./step2");
    setValues(data);
  };

  

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        New Product
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="name"
          type="text"
          label="Product name*"
          name="name"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <Input
          ref={register}
          id="price"
          type="number"
          label="Price*"
          name="price"
          error={!!errors.price}
          helperText={errors?.price?.message}
        />

        <InputLabel htmlFor="productType">Product type</InputLabel>
        <NativeSelect
          
          className={styles.selector}
          variant="outlined"
          margin="normal"
          fullWidth
          inputRef={register}
          inputProps={{
            name: "productType",
            id: "productType",
            label: "productType",
          }}
        >
          <option value={"game"}>Game</option>
          <option value={"gameconsole"}>Game Console</option>
          <option value={"vinyl"}>Vinyl</option>
          <option value={"recordplayer"}>Record Player</option>
        </NativeSelect>
        <FormHelperText>Product type</FormHelperText>
        
        <div id="consola" hidden="hidden">
        <Input
          ref={register}
          id="year"
          type="number"
          label="Product year"
          name="year"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
         </div>

         <div id="juegos">
        <Input
          ref={register}
          id="developer"
          type="text"
          label="Product developer"
          name="developer"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />

        <Input
          ref={register}
          id="gender"
          type="text"
          label="Product gender"
          name="gender"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
         </div>

         
         <div id="vinilos" hidden="hidden">
         <Input
          ref={register}
          id="year"
          type="number"
          label="Product year"
          name="year"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />

          <Input
          ref={register}
          id="artist"
          type="text"
          label="Artists separate with ,"
          name="artist"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />

        <Input
          ref={register}
          id="songs"
          type="text"
          label="Songs separate with ,"
          name="songs"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        
         </div>

         <div id="tocadiscos" hidden="hidden">
        <Input
          ref={register}
          id="brand"
          type="text"
          label="Product brand"
          name="brand"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />

        <Input
          ref={register}
          id="model"
          type="model"
          label="Product model"
          name="model"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <Input
          ref={register}
          id="year"
          type="number"
          label="Product year"
          name="year"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
         </div>
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
