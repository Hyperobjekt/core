import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { List, ListItem, SvgIcon, withStyles, Link } from "@material-ui/core";

const DefaultArrowIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
    </SvgIcon>
  );
};

export const styles = (theme) => {
  return {
    /* Styles applied to the root element. */
    root: {
      flex: "0 1",
      display: "flex",
      alignItems: "stretch",
    },
    /* Styles applied to the list wrapper */
    list: {},
    /* Styles applied to each list item */
    listItem: {
      position: "relative",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: 0,
    },
    listItemActive: {
      "& > a": {
        fontWeight: "bold",
      },
    },
    /* Styles applies to each link */
    link: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(1),
      whiteSpace: "nowrap",
    },
    linkActive: {
      fontWeight: "bold",
    },
  };
};

/**
 * Returns true if the provided menu item matches the active param
 * or the return value of the active function
 * @param {*} menuItem
 * @param {string|function} active
 * @returns {boolean}
 */
const isActive = (menuItem, active) => {
  if (typeof active === "string")
    return menuItem.name === active || menuItem.link === active;
  if (typeof active === "function") return active(menuItem);
  return false;
};

/**
 * The navigation component is used to create a nested list of links, most often used for site navigation.
 */
const Navigation = ({
  classes,
  className,
  component: Component,
  depth,
  maxDepth,
  active,
  links,
  LinkComponent,
  LinkProps,
  isGatsbyLink,
  ArrowIcon,
  ...props
}) => {
  const showSubmenu = depth < maxDepth;
  return (
    <Component
      className={clsx(
        "HypNavigation-root",
        classes.root,
        `HypNavigation-depth${depth}`,
        className
      )}
      {...props}
    >
      <List className={clsx("HypNavigation-list", classes.list)}>
        {links.map((menuItem, index) => (
          <ListItem
            className={clsx("HypNavigation-listItem", classes.listItem, {
              [classes.listItemActive]: isActive(menuItem, active),
            })}
            key={"link" + index}
          >
            <LinkComponent
              className={clsx("HypNavigation-link", classes.link)}
              href={isGatsbyLink ? undefined : menuItem.link}
              to={isGatsbyLink ? menuItem.link : undefined}
              activeClassName={isGatsbyLink ? classes.linkActive : undefined}
              {...LinkProps}
            >
              {menuItem.name}
              {menuItem.subMenu?.length > 0 && showSubmenu && <ArrowIcon />}
            </LinkComponent>
            {menuItem.subMenu?.length > 0 && showSubmenu && (
              <Navigation
                classes={classes}
                component="div"
                depth={depth + 1}
                maxDepth={maxDepth}
                links={menuItem.subMenu}
                active={active}
              ></Navigation>
            )}
          </ListItem>
        ))}
      </List>
    </Component>
  );
};

Navigation.defaultProps = {
  classes: {},
  LinkComponent: Link,
  ArrowIcon: DefaultArrowIcon,
  links: [],
  component: "nav",
  depth: 0,
  maxDepth: 999,
};

Navigation.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /** Array of link objects ({ name, link, submenu }) */
  links: PropTypes.array,
  /** Either a string containing the active page, or a function that accepts a menu item and returns a boolean based on if the menu item is active or not */
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** The maximum depth to nest links to */
  maxDepth: PropTypes.number,
  /** The current depth of navigation */
  depth: PropTypes.number,
  /** Arrow component to indicate there are sublinks */
  ArrowIcon: PropTypes.any,
  /** Component to use for links */
  LinkComponent: PropTypes.any,
  /** Props object to pass to link component */
  LinkProps: PropTypes.object,
  /** boolean that determines if the [Gatsby Link API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/) should be used instead of standard `<a>` tag props  */
  isGatsbyLink: PropTypes.bool,
};

export { Navigation };
const exportComponent = withStyles(styles, { name: "HypNavigation" })(
  Navigation
);
// copy static props for storybook
if (process.env.NODE_ENV !== "production") {
  exportComponent.displayName = Navigation.displayName;
  exportComponent.propTypes = Navigation.propTypes;
  exportComponent.defaultProps = Navigation.defaultProps;
}
export default exportComponent;
