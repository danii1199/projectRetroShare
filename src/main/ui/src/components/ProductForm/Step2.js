import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useData } from "./DataContext";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";

export const Step2 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      status: data.status,
      hasDescription: data.hasDescription,
      description: data.description,
    },
    mode: "onBlur",
  });
  const hasDescription = watch("hasDescription");

  const onSubmit = (data) => {
    history.push("./step3");
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <InputLabel htmlFor="status">Product type</InputLabel>
          <NativeSelect 
            variant="outlined"
            margin="normal"
            fullWidth
            inputRef={register}
            inputProps={{
              name: "status",
              id: "status",
              label: "status"
            }}
          >
            <option value={1}>New</option>
            <option value={2}>Old</option>
            <option value={3}>Worm Out</option>
            <option value={4}>Used</option>
          </NativeSelect>
          <FormHelperText>Product type</FormHelperText>

        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.hasDescription}
              defaultChecked={data.hasDescription}
              color="primary"
              inputRef={register}
              name="hasDescription"
            />
          }
          label="Do you have a Description"
        />

        {hasDescription && (
          <Input
            ref={register}
            id="description"
            type="text"
            label="Description"
            name="description"
            
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

