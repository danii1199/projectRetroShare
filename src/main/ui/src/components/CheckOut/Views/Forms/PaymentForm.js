import { TextField, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const PaymentForm = ({ formContent }) => {
  const methods = useFormContext();
  const { reset, register } = methods;

  useEffect(() => {
    reset({ ...formContent.two }, { errors: true });
  }, [reset, formContent]);

  const cardsLogo = [
    "amex",
    "cirrus",
    "diners",
    "dankort",
    "discover",
    "jcb",
    "maestro",
    "mastercard",
    "visa",
    "visaelectron",
  ];

  return (
    <>
      <Grid container item xs={12}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Datos de Pago</Typography>
        </Grid>
        <Grid container item xs={12} sm={9} justify="space-between">
          {cardsLogo.map((e) => (
            <img
              key={e}
              src={`./cards/${e}.png`}
              alt={e}
              width="50px"
              height="40px"
              align="bottom"
              style={{ padding: "0 5px" }}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={6} sm={6}>
        <Autocomplete
          options={currencies}
          getOptionLabel={(option) => option.code}
          renderOption={(option) => (
            <>
              {option.name} ({option.code})
            </>
          )}
          renderInput={(params) => (
            <TextField
              label="Moneda"
              name="currency"
              variant="outlined"
              fullWidth
              {...params}
            />
          )}
          inputRef={register}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          label="Precio"
          name="amount"
          variant="outlined"
          required
          fullWidth
          inputRef={register}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          inputRef={register}
          label="Titular de la Tarjeta"
          name="ccname"
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          inputRef={register}
          label="Número de la tarjeta de Crédito"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          inputRef={register}
          label="Caducidad"
          name="ccexp"
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <TextField
          inputRef={register}
          label="CVC"
          name="cvc"
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
    </>
  );
};

export default PaymentForm;

const currencies = [
  {
    symbol: "€",
    name: "Euro",
    symbol_native: "€",
    decimal_digits: 2,
    rounding: 0,
    code: "EUR",
    name_plural: "euros",
  },
  {
    symbol: "$",
    name: "US Dollar",
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: "USD",
    name_plural: "US dollars",
  },
];
