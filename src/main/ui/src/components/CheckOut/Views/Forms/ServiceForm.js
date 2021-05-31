import { useEffect } from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";


const ServiceForm = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.three }, { errors: true });
  }, [reset, formContent]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Additional data</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="date"
          label="Fecha de Envio"
          name="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          inputRef={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={deliveris}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              label="Método de envío"
              name="sender"
              variant="outlined"
              required
              fullWidth
              {...params}
              inputRef={register}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Redes Sociales?</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Facebook"
          name="facebook"
          variant="outlined"
          fullWidth
          inputRef={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Twitter"
          name="twitter"
          variant="outlined"
          fullWidth
          inputRef={register}
        />
      </Grid>
    </>
  );
};

export default ServiceForm;

const deliveris = [
  { name: "Correos", code: "COR" },
  { name: "Seur", code: "SEU" },
  { name: "Recogida en tienda", code: "TIEN" },
  { name: "MRW", code: "MRW" },
  { name: "Correos Express", code: "EXP" },
]
