import { responsiveFontSizes, createMuiTheme } from "@material-ui/core";

let theme = {
    "typography": {
      "fontFamily": [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
      ]
    },
    "palette": {
      "common": {
        "black": "#0D0D0D",
        "white": "#8C8C8C"
      },
      "background": {
        "paper": "#D9B504",
        "default": "#0D0D0D"
      },
      "primary": {
        "light": "#F2CB05",
        "main": "#D9B504",
        "dark": "#A68B03",
        "contrastText": "#0D0D0D"
      },
      "secondary": {
        "light": "#ff4081",
        "main": "#f50057",
        "dark": "#c51162",
        "contrastText": "#fff"
      },
      "error": {
        "light": "#e57373",
        "main": "#f44336",
        "dark": "#d32f2f",
        "contrastText": "#fff"
      },
      "text": {
        "primary": "#8C8C8C",
        "secondary": "#D9B504",
        "disabled": "#8C8C8C",
        "hint": "#8C8C8C"
      }
    }
  };
  
  theme = createMuiTheme(theme);
  theme = responsiveFontSizes(theme);
  export default theme


  
/*

  /* Color Theme Swatches in Hex 
.Diseño-gráfico-1-hex { color: #F2CB05; }
.Diseño-gráfico-2-hex { color: #D9B504; }
.Diseño-gráfico-3-hex { color: #A68B03; }
.Diseño-gráfico-4-hex { color: #8C8C8C; }
.Diseño-gráfico-5-hex { color: #0D0D0D; }

/* Color Theme Swatches in RGBA 
.Diseño-gráfico-1-rgba { color: rgba(242, 202, 4, 1); }
.Diseño-gráfico-2-rgba { color: rgba(216, 181, 4, 1); }
.Diseño-gráfico-3-rgba { color: rgba(165, 138, 3, 1); }
.Diseño-gráfico-4-rgba { color: rgba(140, 140, 140, 1); }
.Diseño-gráfico-5-rgba { color: rgba(12, 12, 12, 1); }

/* Color Theme Swatches in HSLA 
.Diseño-gráfico-1-hsla { color: hsla(50, 96, 48, 1); }
.Diseño-gráfico-2-hsla { color: hsla(50, 96, 43, 1); }
.Diseño-gráfico-3-hsla { color: hsla(50, 96, 33, 1); }
.Diseño-gráfico-4-hsla { color: hsla(0, 0, 55, 1); }
.Diseño-gráfico-5-hsla { color: hsla(0, 0, 5, 1); }

*/