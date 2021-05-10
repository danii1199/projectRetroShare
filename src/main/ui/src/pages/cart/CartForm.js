import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../../components/ProductForm/components/PrimaryButton";
import { MainContainer } from "../../components/ProductForm/components/MainContainer";
import { Form } from "../../components/ProductForm/components/Form";
import { Input } from "../../components/ProductForm/components/Input";
import { useData } from "../../components/ProductForm/DataContext";
import parsePhoneNumberFromString from "libphonenumber-js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  userName: yup.string().required("User name is a required field"),
  address: yup.string().required("Address is a required field"),
  phoneNumber: yup
    .string()
    .matches(
      /^([^a-z]*)$/,
      "PhoneNumber should not contain letters and 9 digits length"
    )
    .required("Last name is a required field"),
  zipCode: yup
    .string()
    .matches(/^([^a-z]*)$/, "Last name should not contain letters")
    .required("Last name is a required field"),
  city: yup
    .string()
    .matches(/^([^0-9]*)$/, "City should not contain numbers")
    .required("Last name is a required field"),
  country: yup
    .string()
    .matches(/^([^0-9]*)$/, "Country should not contain numbers")
    .required("Last name is a required field"),
});

export const CartForm = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      userName: data.userName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      zipCode: data.zipCode,
      country: data.country,
      city: data.city,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    history.push("./cartFormResult");
    setValues(data);
  };
  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }
    return phoneNumber.formatInternational();
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Complete your user info
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="userName"
          type="text"
          label="User Name*"
          name="userName"
          error={!!errors.userName}
          helperText={errors?.userName?.message}
        />
        <Input
          ref={register}
          id="phoneNumber"
          type="tel"
          label="Phone Number*"
          name="phoneNumber"
          onChange={(event) => {
            event.target.value = normalizePhoneNumber(event.target.value);
          }}
          error={!!errors.phoneNumber}
          helperText={errors?.phoneNumber?.message}
        />
        <Input
          ref={register}
          id="address"
          type="text"
          label="Address*"
          name="address"
          error={!!errors.address}
          helperText={errors?.address?.message}
        />
        <Input
          ref={register}
          id="zipCode"
          type="number"
          label="Zip Code*"
          name="zipCode"
          error={!!errors.zipCode}
          helperText={errors?.zipCode?.message}
        />
        <Input
          ref={register}
          id="city"
          type="text"
          label="City*"
          name="city"
          error={!!errors.city}
          helperText={errors?.city?.message}
        />
        <Input
          ref={register}
          id="country"
          type="text"
          label="Country*"
          name="country"
          error={!!errors.country}
          helperText={errors?.country?.message}
        />
        <Input
          ref={register}
          id="sex"
          type="text"
          label="Sex*"
          name="sex"
          error={!!errors.sex}
          helperText={errors?.sex?.message}
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
