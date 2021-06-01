import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import AuthService from "../../Service/Auth/AuthService";
import OneUser from "../../lib/OneUser";
import { useEffect, useState, useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";
import http from "../../Http-common";
import { useForm } from "react-hook-form";
import { MessagesContext } from "./context/MessagesContext";
import { useHistory } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "82vh",
  },
  headBG: {
    backgroundColor: "#FFFFFF",
  },
  borderRight500: {
    borderRight: "1px solid #FFFFFF",
  },
  messageArea: {
    height: "65vh",
    overflowY: "auto",
  },
  background: {
    marginTop: "90px",
  },
});

const Chat = () => {
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();
  const { users } = useContext(UsersContext);
  const [sendUser, setSendUser] = useState();
  //const [mensaje, setMensaje] = useState("");
  const { reset, register, handleSubmit } = useForm();
  const history = useHistory();

  const { messages } = useContext(MessagesContext);

  console.log(sendUser);
  //console.log(mensaje);

  const handleSelectUser = (props) => {
    //props.preventDefault()
    setSendUser(props);
  };

  const onSubmit = async (data) => {
    console.log(data);
    http.post(`/chat-save/${currentUser.id}/${sendUser}`, data).then(reset);
    history.go();
  };

  useEffect(() => {
    handleSelectUser();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container className={classes.background}>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt={currentUser.name}
                  src={OneUser(currentUser.id).image}
                />
              </ListItemIcon>
              <ListItemText primary={currentUser.name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {users.map((user) => {
              if (currentUser.name !== user.firstName) {
                return (
                  <ToggleButtonGroup
                    value={sendUser}
                    exclusive
                    onClick={() => {
                      handleSelectUser(user.id);
                    }}
                    key={user.id}
                  >
                    <ToggleButton value={user.id}>
                      <ListItemIcon>
                        <Avatar alt={user.avatar} src={user.avatar} />
                      </ListItemIcon>

                      <ListItemText primary={user.firstName}>
                        {user.firstName}
                      </ListItemText>
                    </ToggleButton>
                  </ToggleButtonGroup>
                );
              }
              return <></>;
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {messages.map((message) => {
              return (
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary={message.message}
                  ></ListItemText>
                </Grid>
              );
            })}
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Escribe tu mensaje..."
                fullWidth
                name="message"
                inputRef={register({
                  required: { value: true, message: "Valor requerido" },
                })}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab type="submit" color="secondary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Chat;
