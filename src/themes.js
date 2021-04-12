import { createMuiTheme } from "@material-ui/core/styles";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#e50e56" },
  },
});
export const lightTheme = createMuiTheme({
  palette: {
    primary: { main: "#277BB4" },
  },
});
