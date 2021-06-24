export const draft = {
  label: "Draft",
  name: "draft",
  widget: "boolean",
  hint: "when turned on, this page will not be published to the live site",
  required: false,
};

export const path = {
  label: "Slug (URL path)",
  name: "path",
  widget: "string",
  hint: `Where the page will be created within the site structure.  Be careful changing this, as it could break links to any pages linking here.`,
  required: false,
};

export const name = {
  label: "Page Name",
  name: "name",
  widget: "string",
  hint: `the page name is used to refer to this page within the site`,
  required: false,
};

export const body = {
  label: "Body",
  name: "body",
  widget: "markdown",
  default: "",
  required: false,
};

export const template = {
  label: "Page Template",
  name: "template",
  widget: "hidden",
};

export const embeddedImages = {
  label: "Images",
  name: "embeddedImages",
  widget: "list",
  collapsed: true,
  summary: "{{fields.image}}",
  field: { label: "Image", name: "image", widget: "image" },
  hint:
    "These are images used within the page and will be automatically optimized.",
};

export const store = {
  label: "Key / Value Store",
  name: "store",
  widget: "list",
  collapsed: true,
  summary: "{{fields.key}}",
  fields: [
    { label: "Key", name: "key", widget: "string" },
    { label: "Value", name: "value", widget: "string" },
  ],
};
