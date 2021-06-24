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
 * This is a base folder collection that is extended via `createFolderCollection` util
 */
const folder = {
  label: "Pages",
  name: "pages",
  folder: "content/pages",
  create: true,
  identifier_field: "name",
  extension: "mdx",
  format: "frontmatter",
  media_folder: "./images",
  public_folder: "./images",
  editor: {
    preview: false,
  },
  fields: [draft, seo, path, name, embeddedImages, store, body],
};

export default folder;
