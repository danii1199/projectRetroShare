import { useState, useContext } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MailIcon from "@material-ui/icons/Mail";
import Person from "@material-ui/icons/Person";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchBar from "../Search/SearchBar";
import AuthService from "../../Service/Auth/AuthService";
import { CartContext } from "../../contexts/CartContext";
import MenuIcon from "@material-ui/icons/Menu";
import http from "../../Http-common";
import { MessagesContext } from "../Chat/context/MessagesContext";


import {
  AdminButtonsIcons,
  AdminButtons,
  LogedButtons,
} from "./components/Buttons";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: "80px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius.primary,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "ihnerit",
  },
  background: {
    background: theme.palette.primary,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [sideMenuMoreAnchorEl, setSideMenuMoreAnchorEl] = useState(null);
  const { itemCount } = useContext(CartContext);
  const currentUser = AuthService.getCurrentUser();

  const { mensajesNoLeidos } = useContext(MessagesContext);

  


  const isAdmin = AuthService.getRoles() === "Admin";
  const isUser = AuthService.getRoles() === "User";
  const isDisabled = AuthService.getRoles() === "Disabled";

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSideMenuOpen = Boolean(sideMenuMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleSideMenuClose = () => {
    setSideMenuMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSideMenuOpen = (event) => {
    setSideMenuMoreAnchorEl(event.currentTarget);
  };

  const handleReadMessages = () => {
    http.post(`/chat-read/${currentUser.id}`)
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to="/logIn"
      ></MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Grid item>
        <MenuItem>
          <IconButton
            children="chat"
            color="inherit"
            component={Link}
            to="/chat"
            disabled={!(isAdmin || isUser)}
            onClick={handleReadMessages}
          >
            
            <Badge
             badgeContent={mensajesNoLeidos?.length} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton
            children="cart"
            color="inherit"
            component={Link}
            to="/cart"
            disabled={!(isAdmin || isUser)}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton
            children="Profile"
            color="inherit"
            component={Link}
            to="/profile"
            disabled={!(isAdmin || isUser)}
          >
            <Person />
          </IconButton>
        </MenuItem>
        <LogedButtons isUser={isAdmin || isUser} />
      </Grid>
    </Menu>
  );
  const sideMenuId = "primary-search-account-menu-mobile";
  const renderSideMenu = (
    <Menu
      anchorEl={sideMenuMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={sideMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isSideMenuOpen}
      onClose={handleSideMenuClose}
    >
      {(isAdmin || isUser) && <AdminButtonsIcons isAdmin={isAdmin} />}
    </Menu>
  );
  return (
      <Grid className={classes.grow}>
        {renderSideMenu}
        <AppBar position="fixed" className={classes.background}>
          <Toolbar>
            <Grid className={classes.sectionMobile}>
              <IconButton
                onClick={handleSideMenuOpen}
                {...{
                  edge: "start",
                  color: "inherit",
                  "aria-label": "menu",
                  "aria-haspopup": "true",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <IconButton component={Link} to="/">
              <img
                alt={"pokeball"}
                width={"50"}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
                }
              />{" "}
            </IconButton>
            {(isDisabled===false)&&
            <SearchBar />
            }
            <Grid className={classes.sectionDesktop}>
              {(isAdmin || isUser) && <AdminButtons isAdmin={isAdmin} />}
            </Grid>
            <Grid className={classes.grow} />
            <Grid className={classes.sectionDesktop}>
              <IconButton
                aria-label="chat"
                color="inherit"
                component={Link}
                to="/chat"
                onClick={handleReadMessages}
                disabled={!(isAdmin || isUser)}
              >
                <Badge badgeContent={mensajesNoLeidos} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>

              <IconButton
                aria-label="cart"
                color="inherit"
                component={Link}
                to="/cart"
                disabled={!(isAdmin || isUser)}
              >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton
                aria-label="profile"
                color="inherit"
                component={Link}
                to="/profile"
                disabled={!(isAdmin || isUser)}
              >
                <Person />
              </IconButton>
              <LogedButtons isUser={isAdmin || isUser || isDisabled} />
            </Grid>
            <Grid className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Grid>
  );
};

export default NavBar;
