import { withStyles } from "@material-ui/core";
import { Navigation } from "./Navigation";

const exportComponent = withStyles((theme) => ({
  root: {},
  depth0: {},
  depth1: {
    background: theme.palette.background.paper,
    minWidth: 120,
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
  depth2: {},
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
    "&:hover $depth1, &:focus-within $depth1": {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "all",
    },
    "&:hover > $link, &:focus-within > $link": {
      background: theme.palette.action.hover,
    },
  },
  listItemActive: {},
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
    fontSize: "inherit", // keeps fonts the same size when different components are used
    transition: theme.transitions.create(["background"]),
  },
  linkActive: {
    fontWeight: "bold",
  },
  separator: {
    margin: `0 1px 0 0`,
  },
  arrow: {
    marginRight: theme.spacing(-1),
  },
}))(Navigation);

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = "HorizontalNavigation";
  exportComponent.propTypes = Navigation.propTypes;
  exportComponent.defaultProps = Navigation.defaultProps;
}
export default exportComponent;
