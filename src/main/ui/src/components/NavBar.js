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
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchBar from "./Search/SearchBar";
import AuthService from "../Service/Auth/AuthService";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { CartContext } from "../contexts/CartContext";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
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
    borderRadius: theme.shape.borderRadius,
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
    color: "inherit",
  },
  background: {
    background: "#121212",
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

  const isAdmin = AuthService.getRoles() === "Admin";
  const isUser = AuthService.getRoles() === "User";

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isSideMenuOpen = Boolean(sideMenuMoreAnchorEl);
  const logOut = () => AuthService.logout;

  
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
      <MenuItem onClick={handleMenuClose} component={Link} to="/logIn">
        Sing In
      </MenuItem>
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
      {isUser && (
        <>
          <MenuItem>
            <IconButton
              aria-label="chat"
              color="inherit"
              component={Link}
              to="/chat"
            >
              <Badge badgeContent={1} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Chat</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="profile"
              color="inherit"
              component={Link}
              to="/profile"
            >
              <Person />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              edge="end"
              aria-label="exit app"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={logOut()}
              href={"/"}
            >
              <ExitToAppIcon />
            </IconButton>
            <p>Log out</p>
          </MenuItem>
        </>
      )}
      <MenuItem>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
          component={Link}
          to="/logIn"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Log In</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="cart"
          color="inherit"
          component={Link}
          to="/cart"
        >
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
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
      {isAdmin && (
        <>
          <MenuItem>
            <Button
              color="inherit"
              aria-controls={menuId}
              component={Link}
              to="/users"
            >
              Usuarios
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              color="inherit"
              aria-controls={menuId}
              component={Link}
              to="/videogames-admin"
            >
              Games
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              color="inherit"
              aria-controls={menuId}
              component={Link}
              to="/gameconsole-admin"
            >
              G.Console
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              color="inherit"
              aria-controls={menuId}
              component={Link}
              to="/rplayer-admin"
            >
              R.Player
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              color="inherit"
              aria-controls={menuId}
              component={Link}
              to="/vinyl-admin"
            >
              Vinyl
            </Button>
          </MenuItem>
        </>
      )}
      {isUser && (
        <MenuItem>
          <Button
            color="inherit"
            aria-controls={menuId}
            component={Link}
            to="/step1"
          >
            New Product
          </Button>
        </MenuItem>
      )}
    </Menu>
  );
  if (AuthService.getRoles() === "Admin") {
    //BARRA DE ADMINISTRADOR
    return (
      <div className={classes.grow}>
        {renderSideMenu}
        <AppBar position="fixed" className={classes.background}>
          <Toolbar>
            <div className={classes.sectionMobile}>
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
            </div>
            <IconButton
              src="../public/discoVinilo.png"
              color="inherit"
              component={Link}
              to="/"
            >
              <img
                alt={"pokeball"}
                width={"50"}
                src={
                  "https://www.pikpng.com/pngl/b/59-590145_pokeball-8-bit-pixel-art-pokemon-clipart.png"
                }
              />{" "}
              RetroShare
            </IconButton>
            <SearchBar />
            <div className={classes.sectionDesktop}>
              <Button
                color="inherit"
                aria-controls={menuId}
                component={Link}
                to="/users"
              >
                Usuarios
              </Button>
              <Button
                color="inherit"
                aria-controls={menuId}
                component={Link}
                to="/videogames-admin"
              >
                Games
              </Button>
              <Button
                color="inherit"
                aria-controls={menuId}
                component={Link}
                to="/gameconsole-admin"
              >
                G.Console
              </Button>
              <Button
                color="inherit"
                aria-controls={menuId}
                component={Link}
                to="/rplayer-admin"
              >
                R.Player
              </Button>
              <Button
                color="inherit"
                aria-controls={menuId}
                component={Link}
                to="/vinyl-admin"
              >
                Vinyl
              </Button>
              <Button
                color="inherit"
                aria-controls={menuId}
                component={Link}
                to="/step1"
              >
                New Product
              </Button>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="chat"
                color="inherit"
                component={Link}
                to="/chat"
              >
                <Badge badgeContent={1} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>

              <IconButton
                aria-label="cart"
                color="inherit"
                component={Link}
                to="/cart"
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
              >
                <Person />
              </IconButton>

              <IconButton
                edge="end"
                aria-label="exit app"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={logOut()}
                href={"/"}
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  }
  if (AuthService.getRoles() === "User") {
    //BARRA DE USER
    return (
      <div className={classes.grow}>
        {renderSideMenu}
        <AppBar position="fixed" className={classes.background}>
          <Toolbar>
            <div className={classes.sectionMobile}>
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
            </div>
            <IconButton
              src="../public/discoVinilo.png"
              color="inherit"
              component={Link}
              to="/"
            >
              <img
                alt={"pokeball"}
                width={"50"}
                src={
                  "https://www.pikpng.com/pngl/b/59-590145_pokeball-8-bit-pixel-art-pokemon-clipart.png"
                }
              />{" "}
              RetroShare
            </IconButton>
            <SearchBar />
            <div className={classes.sectionDesktop}>
              <Button color="inherit" component={Link} to="/step1">
                New Product
              </Button>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="chat"
                color="inherit"
                component={Link}
                to="/chat"
              >
                <Badge badgeContent={1} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="cart"
                color="inherit"
                component={Link}
                to="/cart"
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
              >
                <Person />
              </IconButton>

              <IconButton
                edge="end"
                aria-label="exit app"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                onClick={logOut()}
                href={"/"}
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  } else {
    //BARRA DE ANON
    return (
      <div className={classes.grow}>
        {renderSideMenu}
        <AppBar position="fixed" className={classes.background}>
          <Toolbar>
            <div className={classes.sectionMobile}>
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
            </div>
            <IconButton
              src="../public/discoVinilo.png"
              color="inherit"
              component={Link}
              to="/"
            >
              <img
                alt={"pokeball"}
                width={"50"}
                src={
                  "https://www.pikpng.com/pngl/b/59-590145_pokeball-8-bit-pixel-art-pokemon-clipart.png"
                }
              />{" "}
              RetroShare
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="cart"
                color="inherit"
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={itemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
                component={Link}
                to="/logIn"
              >
                <p>Log In</p>
                <ExitToAppIcon />
              </IconButton>
              
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  }
};

export default NavBar;
