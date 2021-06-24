import {
  embeddedImages,
  name,
  body,
  path,
  store,
  draft,
} from "../partials/fields";
import seo from "../partials/seo";

/**
 * This is a base page that is extended via `createFile` util
 */
const file = {
  file: "",
  label: "Page",
  name: "page",
  extension: "mdx",
  format: "frontmatter",
  media_folder: "./images",
  public_folder: "./images",
  editor: {
    preview: false,
  },
  fields: [draft, seo, path, name, embeddedImages, store, body],
};

export default file;
