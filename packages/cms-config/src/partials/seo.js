const seo = {
  label: "Page Metadata",
  name: "meta",
  widget: "object",
  hint:
    "Page metadata contains page specific values for search engine optimization and social sharing.  If values are not set, the default values set for metadata in the site config will be used.",
  collapsed: true,
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
      hint:
        "this is used for the browser tab, the page name in search results, or when the page is shared on social platforms (<title> tag)",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      widget: "string",
      required: false,
      hint:
        "max 160 characters, this is used as the description in search results or when the page is shared on social platforms",
    },
    {
      label: "Social Image",
      name: "image",
      widget: "image",
      required: false,
      hint:
        "image thumbnail that is used when the page is shared on social platforms",
    },
    {
      label: "Keywords",
      name: "keywords",
      widget: "string",
      required: false,
      hint: "keywords are used for search engine optimization",
    },
    {
      label: "Author(s)",
      name: "author",
      widget: "list",
      required: false,
      hint: "authors are used to link posts to an author",
    },
    {
      label: "Blog Post?",
      name: "isBlogPost",
      widget: "boolean",
      default: false,
      hint: "turn this on for blog posts to ensure proper metadata and linking",
    },
  ],
};

export default seo;
