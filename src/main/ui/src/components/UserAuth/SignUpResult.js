import { useState } from "react";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { MainContainer } from "../ProductForm/components/MainContainer";
import { PrimaryButton } from "../ProductForm/components/PrimaryButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useData } from "../ProductForm/DataContext";
import { useHistory } from "react-router-dom";
import http from "../../Http-common";

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
});

export const SignUpResult = () => {
  const [success, setSuccess] = useState(false);
  const styles = useStyles();
  const { data } = useData();
  const history = useHistory();

  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");

  const onSubmit = async () => {
    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    const res = http.post("/save/2", data).then((res) => {
      if (res.status === 200) {
        Swal.fire("Great job!", "You've been register", "success");
        setSuccess(true);
      }
    });

    if (res.status === 200) {
      Swal.fire("Great job!", "You've been register", "success");
      setSuccess(true);
    }
  };

  if (success) {
    history.push("./login");
  }

  return (
    <>
      <MainContainer>
        <Typography component="h2" variant="h5">
          📋 Form Values
        </Typography>
        <TableContainer className={styles.root} component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell component="th" scope="row">
                    {entry[0]}
                  </TableCell>
                  <TableCell align="right">{entry[1].toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        <Link to="/">Start over</Link>
      </MainContainer>
    </>
  );
};
