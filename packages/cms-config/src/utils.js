import file from "./collections/file";
import folder from "./collections/folder";

function slugify(text) {
  const a = "àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Extends a field config if a field name matches a property in the updates object
 * @param {Array<{name, label, widget}>} fields
 * @param {object} updates
 * @returns
 */
export const extendFieldConfig = (fields, updates = {}) => {
  return fields.map((f) => {
    if (updates[f.name]) return { ...f, ...updates[f.name] };
    return f;
  });
};

/**
 * Helper for creating a file config
 * (see [file collections](https://www.netlifycms.org/docs/collection-types/#file-collections))
 * @param {*} config
 * @param {*} fieldOverrides
 * @returns
 */
export const createFile = (config, options = {}) => {
  if (!config.file)
    throw new Error("createFile: page config must have file property");
  if (!config.label)
    throw new Error("createFile: page config must have label property");
  const { mergeFields = true, fieldOverrides } = options;
  const pageConfig = {
    ...file,
    name: slugify(config.label),
    ...config,
    fields:
      mergeFields && config.fields
        ? [...file.fields, ...config.fields]
        : config.fields
        ? config.fields
        : file.fields,
  };
  return {
    ...pageConfig,
    fields: extendFieldConfig(pageConfig.fields, fieldOverrides),
  };
};

/**
 * Helper for creating a folder collection config
 * (see [file collections](https://www.netlifycms.org/docs/collection-types/#file-collections))
 * @param {*} config
 * @param {*} fieldOverrides
 * @returns
 */
export const createFolderCollection = (config, options = {}) => {
  if (!config.label)
    throw new Error("createFolder: folder config must have label property");
  if (!config.folder)
    throw new Error("createFolder: folder config must have a folder property");
  const { mergeFields = true, fieldOverrides } = options;
  const folderConfig = {
    ...folder,
    name: slugify(config.label),
    ...config,
    fields:
      mergeFields && config.fields
        ? [...folder.fields, ...config.fields]
        : config.fields
        ? config.fields
        : folder.fields,
  };
  return {
    ...folderConfig,
    fields: extendFieldConfig(folderConfig.fields, fieldOverrides),
  };
};

/**
 * Helper function for creating file collections
 */
export const createFileCollection = ({ label, files, ...rest }) => {
  if (!files || !Array.isArray(files))
    throw new Error(
      "createFileCollection: files property must be an array of file configs"
    );
  if (!label)
    throw new Error(
      "createFileCollection: file collection requires a label property"
    );
  return {
    label,
    name: slugify(label),
    files,
    ...rest,
  };
};
