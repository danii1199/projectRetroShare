import { Grid, TextField, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import MenuItem from '@material-ui/core/MenuItem';

const ContactForm = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register, errors } = methods;
  

  useEffect(() => {
    reset({ ...formContent.one }, { errors: true });
  }, [reset, formContent]);

  return (
    <Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Informacion de Contacto</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          inputRef={register}
          type="text"
          label="Product name*"
          name="name"
          defaultValue={formContent.name}
          error={!!errors.name}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          type="number"
          label="Price*"
          name="price"
          inputRef={register}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
      <InputLabel htmlFor="productType">Product type</InputLabel>
        <NativeSelect
          variant="contained"
          inputRef={register}
          inputProps={{
            name: "productType",
            id: "productType",
            label: "productType",
          }}
        >
          <MenuItem value={"game"}>Game</MenuItem >
          <MenuItem value={"gameconsole"}>Game Console</MenuItem >
          <MenuItem value={"vinyl"}>Vinyl</MenuItem >
          <MenuItem value={"recordplayer"}>Record Player</MenuItem >
        </NativeSelect>
      </Grid>
    </Grid>
  );
};

export default ContactForm;