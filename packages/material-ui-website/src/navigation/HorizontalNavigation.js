import { withStyles } from "@material-ui/core";
import { Navigation } from "./Navigation";

export default withStyles((theme) => ({
  root: {},
  list: {
    display: "flex",
    justifyContent: "flex-start",
  },
  listItem: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    position: "relative",
    padding: 0,
    flex: 0,
    background: theme.palette.background.default,
    "&:hover $depth1, &:focus-within $depth1": {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "all",
    },
    "&:hover > $link, &:focus-within > $link": {
      background: theme.palette.action.hover,
    },
  },
  link: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    lineHeight: 1,
    padding: theme.spacing(1, 2),
    minHeight: 40,
    minWidth: "100%",
    transition: theme.transitions.create(["background"]),
  },
  linkActive: {
    fontWeight: "bold",
  },
  depth1: {
    position: "absolute",
    top: "100%",
    opacity: 0,
    visibility: "hidden", // hide from screen reader
    pointerEvents: "none", // ignore mouse events
    transition: theme.transitions.create(["opacity", "visibility"]),
    "& $list": {
      flexDirection: "column",
    },
    "& $link": {
      justifyContent: "flex-start",
    },
  },
  separator: {
    margin: `0 1px 0 0`,
  },
  arrow: {
    marginRight: theme.spacing(-1),
  },
}))(Navigation);
