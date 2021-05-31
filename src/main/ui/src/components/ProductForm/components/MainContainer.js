import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.primary.light,
    borderRadius: "20px" 
    
  },
}));

export const MainContainer = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Container
      className={styles.root}
      component="main"
      maxWidth="sm"
      {...props}
    >
      {children}
    </Container>
  );
};