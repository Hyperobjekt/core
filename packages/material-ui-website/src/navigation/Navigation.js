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
    /** Styles applied to the sub menu root */
    subMenu: { marginLeft: theme.spacing(2) },
    /** Styles applied to each sub menu list item */
    subMenuListItem: { padding: 0 },
    /** Styles applied to each sub menu link */
    subMenuLink: {
      display: "flex",
      flex: 1,
      padding: theme.spacing(2),
    },
  };
};

const isActive = (menuItem, active) => {
  if (typeof active === "string")
    return menuItem.name === active || menuItem.link === active;
  if (typeof active === "function") return active(menuItem);
  return false;
};

const Navigation = ({
  classes,
  className,
  component: Component = "nav",
  depth = 0,
  maxDepth = 999,
  active,
  links,
  LinkProps,
  ArrowIcon = DefaultArrowIcon,
  onSelect,
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
            <Link
              className={clsx("HypNavigation-link", classes.link)}
              href={menuItem.link}
              {...LinkProps}
            >
              {menuItem.name}
              {menuItem.subMenu?.length > 0 && showSubmenu && <ArrowIcon />}
            </Link>
            {menuItem.subMenu?.length > 0 && showSubmenu && (
              <Navigation
                classes={classes}
                component="div"
                depth={depth + 1}
                maxDepth={maxDepth}
                links={menuItem.subMenu}
                active={active}
                onClick={onSelect}
              ></Navigation>
            )}
          </ListItem>
        ))}
      </List>
    </Component>
  );
};

Navigation.defaultProps = {
  onSelect: () => {},
  links: [],
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
};

export { Navigation };
const exportComponent = withStyles(styles, { name: "HypNavigation" })(
  Navigation
);
exportComponent.displayName = "Navigation";
export default exportComponent;
