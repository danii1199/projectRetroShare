import { useState, useContext } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
  Container,
} from "@material-ui/core";
import ContactForm from "../Views/Forms/ContactForm";
import ServiceForm from "../Views/Forms/ServiceForm";
import PaymentForm from "../Views/Forms/PaymentForm";
import StepperIcons from "./StepperIcons";
import { makeStyles } from "@material-ui/core/styles";
import StepConnector from "./StepConnector";
import {
  SentimentVerySatisfied,
  SentimentVeryDissatisfied,
} from "@material-ui/icons";
import http from "../../../Http-common";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import AuthService from "../../../Service/Auth/AuthService";
import RetroshareService from "../../../Service/RetroshareService";

const style = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  mainBox: {
    position: "relative",
    padding: "10px 20px",
    borderBottomRightRadius: "4px",
    borderBottomLeftRadius: "4px",
  },
  stepper: {
    minHeight: "55px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonWrapper: {
    justifyContent: "flex-end",
  },
}));

function getSteps() {
  return ["Contacto", "Envio", "Pago"];
}

function StepContent({ step }, formContent) {
  switch (step) {
    case 0:
      return <ContactForm {...{ formContent }} />;
    case 1:
      return <ServiceForm {...{ formContent }} />;
    case 2:
      return <PaymentForm {...{ formContent }} />;
    default:
      return "Unknown step";
  }
}

const FormStepper = () => {
  const { watch, errors } = useFormContext();
  const [activeStep, setActiveStep] = useState(0);
  const [compiledForm, setCompiledForm] = useState({});
  const steps = getSteps();
  const form = watch();
  const classes = style();
  const [cardStatus, setCardStatus] = useState(true);
  const [cardMessage, setCardMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const currentCart = RetroshareService.getCurrentCart();
  const { handleCheckout } = useContext(CartContext);
  const history = useHistory();

  const handleNext = () => {
    let canContinue = true;
    switch (activeStep) {
      case 0:
        setCompiledForm({ ...compiledForm, one: form });
        canContinue = handleSubmit({ ...compiledForm, form });

        http.post(`/update/${currentUser.id}`, form).then((res) => {
          if (res.status === 200) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        });
        break;
      case 1:
        //Informacion de envio sin usar
        setCompiledForm({ ...compiledForm, two: form });
        canContinue = handleSubmit({ ...compiledForm, two: form });
        canContinue = true;
        break;
      case 2:
        //Informacion de pago sin usar y envio de mail
        setCompiledForm({ ...compiledForm, three: form });
        canContinue = handleSubmit({ ...compiledForm, three: form });
        currentCart.map(async (articles) => {
          return http
            .post(`/pr-buy/${articles.id}/${currentUser.id}`, articles)
            .then((resCart) => {
              if (resCart.status === 200) {
                Swal.fire("Great job!", "Your buy is done", "success");
                setSuccess(true);
                handleCheckout();
              }
            });
        });
        break;
      default:
        return "not a valid step";
    }
    if (canContinue) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (errors) {
      setCardStatus(false);
      setCardMessage(errors.message);
    }
  };

  if (success) {
    history.push("./");
  }

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      switch (activeStep) {
        case 1:
          setCompiledForm({ ...compiledForm, two: form });
          break;
        case 2:
          setCompiledForm({ ...compiledForm, three: form });
          break;
        default:
          return "not a valid step";
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompiledForm({});
  };

  const handleSubmit = (form) => {
    if (_.isEmpty(errors)) {
      console.log("submit", form);
    }
  };

  return (
    <Container>
      <Stepper
        alternativeLabel
        className={classes.stepper}
        connector={<StepConnector />}
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} StepIconComponent={StepperIcons}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box className={classes.mainBox}>
        {activeStep === 3 ? (
          <Grid
            container
            spacing={3}
            direction="column"
            justify="space-around"
            alignItems="center"
            style={{ height: "400px" }}
          >
            {cardStatus ? (
              <SentimentVerySatisfied fontSize="large" color="primary" />
            ) : (
              <SentimentVeryDissatisfied fontSize="large" color="error" />
            )}

            <Typography variant="h4">{cardMessage}</Typography>
            <Button
              onClick={cardStatus ? handleReset : handleBack}
              className={classes.button}
            >
              {cardStatus ? "Reset" : "Back"}
            </Button>
          </Grid>
        ) : (
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <Grid container spacing={3}>
              <StepContent step={activeStep} formContent={compiledForm} />
              <Grid container item justify="flex-end">
                <Button
                  disabled={activeStep === 0}
                  className={classes.button}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default FormStepper;
