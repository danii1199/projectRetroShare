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
import UserAPI from "../../lib/UserAPI";
import "./style.css";

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
function handleClick(e) {
  e.preventDefault();
}

const Chat = () => {
  const classes = useStyles();
  const currentUser = AuthService.getCurrentUser();
  const users = UserAPI();
  

  return (
    <div>
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
                  <ListItem button key={user.id}>
                    <ListItemIcon>
                      <Avatar alt={user.avatar} src={user.avatar} />
                    </ListItemIcon>
                    <ListItemText primary={user.firstName}>
                      {user.firstName}
                    </ListItemText>
                  </ListItem>
                );
              }
              return (
                <ListItem button key={user.id}>
                  <ListItemIcon>
                    <Avatar alt={user.avatar} src={user.avatar} />
                  </ListItemIcon>
                  <ListItemText primary={user.firstName}>
                    {user.firstName}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
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
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" onClick={handleClick} aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
