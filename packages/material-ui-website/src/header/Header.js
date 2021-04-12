import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, withStyles } from "@material-ui/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import clsx from "clsx";

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    background: theme.palette.primary.main,
    transition: theme.transitions.create(["height"]),
    padding: theme.spacing(0, 2),
    flex: 0,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 3),
    },
  },
  /* Styles applied to the toolbar component. */
  toolbar: {
    alignItems: "stretch",
    justifyContent: "space-between",
    flex: 1,
    padding: 0,
  },
  /* Styles applied when the header is "sticky" after scrolling */
  stuck: {},
  /* Styles applied when the header is shrunk */
  shrunk: {},
  /** Styles for fixed header offset */
  offset: {},
});

const Header = ({
  classes,
  children,
  height,
  sticky,
  shrink,
  shrinkOffset,
  stickyOffset,
  ...props
}) => {
  // state indicating whether header is condensed
  const [shrunk, setShrunk] = useState(false);
  // state indicating if the header is "stuck"
  const [stuck, setStuck] = useState(sticky && !stickyOffset);

  const isShrinky = Boolean(shrink);

  const headerHeight = shrunk ? shrink : height;

  useScrollPosition(({ prevPos, currPos }) => {
    // only shrink header if proper settings are defined
    if (isShrinky && (shrinkOffset || shrinkOffset === 0)) {
      // check if conditions are met and shrink header
      currPos.y >= -shrinkOffset && shrunk && setShrunk(false);
      currPos.y < -shrinkOffset && !shrunk && setShrunk(true);
    }
    // only sticky header if proper settings are defined
    if (sticky) {
      const outOfZone = stickyOffset > 0 && currPos.y >= -stickyOffset;
      // check if conditions are met and shrink header
      outOfZone && stuck && setStuck(false);
      !outOfZone && !stuck && setStuck(true);
    }
  });

  return (
    <React.Fragment>
      <AppBar
        className={clsx("HypHeader-root", classes.root, {
          "HypHeader-shrunk": shrunk,
          [classes.shrunk]: shrunk,
          "HypHeader-stuck": stuck,
          [classes.stuck]: stuck,
        })}
        position={stuck ? "fixed" : "static"}
        style={{ height: headerHeight }}
        {...props}
      >
        <Toolbar className={clsx("HypHeader-toolbar", classes.toolbar)}>
          {children}
        </Toolbar>
      </AppBar>
      {stuck && (
        <div
          className={clsx("HypHeader-offset", classes.offset)}
          style={{ height: height }}
        />
      )}
    </React.Fragment>
  );
};

Header.defaultProps = {
  height: 64,
  sticky: false,
  shrink: 0,
  stickyOffset: false,
  shrinkOffset: 0,
  classes: {},
};

Header.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /** Height for the header (in px) */
  height: PropTypes.number,
  /** Boolean indicating if header should stick to top of window */
  sticky: PropTypes.bool,
  /** Size header should shrink to on scroll */
  shrink: PropTypes.number,
  /** Scroll offset before making header sticky */
  stickyOffset: PropTypes.number,
  /** Scroll offset before making header shrink */
  shrinkOffset: PropTypes.number,
};

export { Header };
const exportComponent = withStyles(styles, { name: "HypHeader" })(Header);
exportComponent.displayName = "Header";
export default exportComponent;
