import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  List,
  ListItem,
  SvgIcon,
  withStyles,
  Link,
  ButtonBase,
} from "@material-ui/core";

const DefaultArrowIcon = ArrowDropDownIcon;

export const styles = (theme) => {
  return {
    /* Styles applied to the root element. */
    root: {
      flex: "0 1",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "stretch",
    },
    depth0: {},
    depth1: {
      "& $link": {
        paddingLeft: theme.spacing(3),
      },
    },
    depth2: {},
    /* Styles applied to the list wrapper */
    list: { width: "100%" },
    /* Styles applied to each list item */
    listItem: {
      position: "relative",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
      padding: 0,
      "&:hover > $link, &:focus-within > $link": {
        background: theme.palette.action.hover,
      },
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
      fontSize: "inherit", // keeps fonts the same size when different components are used
      whiteSpace: "nowrap",
      transition: theme.transitions.create(["background"]),
    },
    linkActive: {
      fontWeight: "bold",
    },
    separator: {
      margin: theme.spacing(0, 1),
      minWidth: 1,
      minHeight: 24,
    },
    arrow: {
      marginRight: theme.spacing(-1),
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
  if (menuItem.hasOwnProperty("active")) return menuItem.active;
  return false;
};

const NavigationLink = ({
  component = Link,
  activeClassName,
  partiallyActive = true,
  href,
  isGatsbyLink,
  LinkProps,
  children,
  ...props
}) => {
  const LinkComponent = component;

  // use a button instead of a link if this is an empty link
  if (!href || href === "#")
    return (
      <Link component="button" {...props}>
        {children}
      </Link>
    );

  // use gatsby link props if using a gatsby link
  if (isGatsbyLink)
    return (
      <LinkComponent
        to={href}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...props}
      >
        {children}
      </LinkComponent>
    );

  // assume component with same API as <a>
  return (
    <LinkComponent href={href} {...props}>
      {children}
    </LinkComponent>
  );
};

/**
 * The navigation component is used to create a nested list of links, most often used for site navigation.
 *
 * By default, a vertical navigation list is output that mirrors the structure of the `links` prop.
 *
 * The following keys can be passed to the classes prop to provide a custom class name for the following elements:
 *
 * - `root`: root element of the navigation tree
 * - `depth0`: root on the top level of navigation
 * - `depth1`: root on the second level of navigation
 * - `depth2`: root on the third level of navigation
 * - `list`: unordered list element in the navigation tree
 * - `listItem`: each list item within the navigation tree
 * - `listItemActive`: active list item within the navigation tree
 * - `link`: each link in the navigation tree
 * - `linkActive`: active link
 * - `separator`: separator element between links (when separator = true)
 * - `arrow`: arrow element for navigation entries that have submenus
 *
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
  separator,
  ListProps,
  ListItemProps,
  ...props
}) => {
  const showSubmenu = depth < maxDepth;
  return (
    <Component
      className={clsx(
        "HypNavigation-root",
        classes.root,
        `HypNavigation-depth${depth}`,
        {
          [classes.depth0]: depth === 0,
          [classes.depth1]: depth === 1,
          [classes.depth2]: depth === 2,
        },
        className
      )}
      {...props}
    >
      <List
        disablePadding
        className={clsx("HypNavigation-list", classes.list)}
        {...ListProps}
      >
        {links.map((menuItem, index) => (
          <React.Fragment key={"link" + index}>
            <ListItem
              className={clsx("HypNavigation-listItem", classes.listItem, {
                [classes.listItemActive]: isActive(menuItem, active),
              })}
              {...ListItemProps}
            >
              <NavigationLink
                className={clsx("HypNavigation-link", classes.link, {
                  [classes.linkActive]: isActive(menuItem, active),
                })}
                component={LinkComponent}
                href={menuItem.link}
                activeClassName={classes.linkActive}
                isGatsbyLink={isGatsbyLink}
                {...LinkProps}
              >
                {menuItem.name}
                {menuItem.subMenu?.length > 0 && showSubmenu && (
                  <ArrowIcon className={classes.arrow} />
                )}
              </NavigationLink>
              {menuItem.subMenu?.length > 0 && showSubmenu && (
                <Navigation
                  classes={classes}
                  component="div"
                  depth={depth + 1}
                  maxDepth={maxDepth}
                  links={menuItem.subMenu}
                  active={active}
                  isGatsbyLink={isGatsbyLink}
                  LinkComponent={LinkComponent}
                  LinkProps={LinkProps}
                  ListProps={ListProps}
                  ListItemProps={ListItemProps}
                ></Navigation>
              )}
            </ListItem>
            {index !== links.length - 1 && separator && (
              <div className={classes.separator}>
                {typeof separator !== "boolean" && separator}
              </div>
            )}
          </React.Fragment>
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
  LinkProps: {},
  ListProps: {},
  ListItemProps: {},
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
  /** Show separator between links */
  separator: PropTypes.any,
  /** Component to use for links */
  LinkComponent: PropTypes.any,
  /** Props object to pass to link component */
  LinkProps: PropTypes.object,
  /** boolean that determines if the [Gatsby Link API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/) should be used instead of standard `<a>` tag props  */
  isGatsbyLink: PropTypes.bool,
  /** Props object to pass to List component */
  ListProps: PropTypes.object,
  /** Props object to pass to List Items component */
  ListItemProps: PropTypes.object,
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
