import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, withStyles } from "@material-ui/core";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import clsx from "clsx";

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    transition: theme.transitions.create(["height"]),
  },
  /* Styles applied to the toolbar component. */
  toolbar: {
    flex: 1,
    padding: 0,
  },
  /* Styles applied when the header is "sticky" after scrolling */
  stuck: {},
  /* Styles applied when the header is shrunk */
  shrunk: {},
  /* Styles for fixed header offset */
  offset: {},
});

/**
 * The Header component is used or adding a header to a page.  Typically it has Branding and Navigation components added to it.  This component provides functionality for:
 *
 * - making the header sticky, either always or after scrolling a certain amount
 * - shrinking the header on scroll
 * - applying different styles to the header once it is "stuck" or "shrunk"
 */
const Header = ({
  classes,
  children,
  height,
  sticky,
  shrink,
  shrinkOffset,
  stickyOffset,
  ToolbarProps,
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
        <Toolbar
          disableGutters
          className={clsx("HypHeader-toolbar", classes.toolbar)}
          {...ToolbarProps}
        >
          {children}
        </Toolbar>
      </AppBar>
      {stuck && (
        <div
          className={clsx("HypHeader-offset", classes.offset)}
          style={{ minHeight: height }}
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
  ToolbarProps: {},
};

Header.propTypes = {
  /**
   * Override classNames used within the component (valid keys: `root`, `toolbar`, `stuck`, `shrunk`, `offset`)
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
  /** Props passed to the Material UI Toolbar */
  ToolbarProps: PropTypes.object,
};

export { Header };
const exportComponent = withStyles(styles, { name: "HypHeader" })(Header);

// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Header.displayName;
  exportComponent.propTypes = Header.propTypes;
  exportComponent.defaultProps = Header.defaultProps;
}

export default exportComponent;
