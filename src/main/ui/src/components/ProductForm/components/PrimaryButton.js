import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
    background: "#121212"
  },
}));

export const PrimaryButton = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={styles.root}
      {...props}
    >
      {children}
    </Button>
  );
};