import {
  Grid,
  makeStyles,
  TextField,
  withStyles,
  fade,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router";
import ProductsAPI from "../../lib/ProductsAPI";

const CssTextField = withStyles({})(TextField);

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  var product = ProductsAPI();

  let hash = {};
  product = product.filter(o => hash[o.name.toLowerCase()] ? false : hash[o.name.toLowerCase()] = true);



  const history = useHistory();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <Autocomplete
        freeSolo
        options={product}
        renderOption={(product) => (
          <Grid
            item
            onClick={() => {
              history.push(`/search/`+product.name);
              history.go();
            }}
          >
            {product.name}
          </Grid>
        )}
        getOptionLabel={(product) => product.name}
        renderInput={(params) => (
          <Grid container>
            <Grid item>
              <CssTextField
                className="text"
                {...params}
                style={{
                  width: 150,
                  marginLeft: 40,
                }}
                placeholder="Buscar"
              />
            </Grid>
          </Grid>
        )}
      />
    </div>
  );
};
export default SearchBar;
