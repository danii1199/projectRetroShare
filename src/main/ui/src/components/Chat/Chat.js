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
  const [reciberUser, setReciberUser] = useState();
  //const [mensaje, setMensaje] = useState("");
  const { reset, register, handleSubmit } = useForm();
  const history = useHistory();

  const { messages } = useContext(MessagesContext);

  

  const handleSelectUser = (props) => {
    //props.preventDefault()
    setReciberUser(props);
  };

  const onSubmit = async (data) => {
    http.post(`/chat-save/${currentUser.id}/${reciberUser}`, data).then(reset);
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
            <ListItem button key={currentUser.id}>
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
              if (currentUser.id !== user.id) {
                return (
                  <List
                    value={reciberUser}
                    exclusive
                    onClick={() => {
                      handleSelectUser(user.id);
                    }}
                    key={user.id}
                  >
                    <ListItem button value={user.id}>
                      <ListItemIcon>
                        <Avatar alt={user.avatar} src={user.avatar} />
                      </ListItemIcon>

                      <ListItemText primary={user.firstName}>
                        {user.firstName}
                      </ListItemText>
                    </ListItem>
                  </List>
                );
              }
              return <></>;
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {messages.map((message) => {
              console.log(message.date)
              var dia=parseInt((message.date?.substring(11, 13)));
              var numerodia=dia+2;

              let fecha =
                numerodia +
                ":" +
                message.date?.substring(14, 16) +
                " " +
                message.date?.substring(8, 10) +
                "-" +
                message.date?.substring(5, 7);
              if (
                (message.userSend.id === currentUser.id &&
                  message.userReciber.id === reciberUser) ||
                (message.userReciber.id === currentUser.id &&
                  reciberUser === message.userSend.id)
              )
                return (
                  <ListItem key={message.id}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align={
                            message.userSend.id === currentUser.id
                              ? "right"
                              : "left"
                          }
                          primary={message.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align={
                            message.userSend.id === currentUser.id
                              ? "right"
                              : "left"
                          }
                          secondary={fecha}
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              return <></>;
            })}
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
