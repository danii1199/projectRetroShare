import React, { useEffect } from "react";
import { Container, Paper, Box } from "@material-ui/core";
import CustomizedSteppers from "./Stepper";
import { useForm, FormProvider } from "react-hook-form";

const Main = () => {

  const methods = useForm({
    mode: "onBlur",
  });

  const { watch, errors } = methods;

  useEffect(() => {
    console.log("FORM CONTEXT", watch(), errors);
  }, [watch, errors]);

  const onSubmit = (data) => console.log(data);

  return (
    <Box component="main">
      <Container maxWidth="md">
        <Paper elevation={5}>
          <FormProvider {...methods}>
            <CustomizedSteppers onSubmit={methods.handleSubmit(onSubmit)} />
          </FormProvider>
        </Paper>
      </Container>
    </Box>
  );
};

export default Main;
