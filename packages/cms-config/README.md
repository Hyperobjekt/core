# Netlify CMS Configuration Modules

This repository has default configuration for pages and folder collections for use with `gatsby-theme-hypersite`.

## Getting started

In order to use this config, you must configure the gatsby netlify CMS plugin for manual initialization.

`gatsby-config.js`

```js
{
  resolve: "gatsby-plugin-netlify-cms",
  options: {
    manualInit: true,
    modulePath: `${__dirname}/src/cms/cms.js`,
  },
},
```

then, in your `cms.js` add your configuration:

`src/cms/cms.js`

```js
import CMS from "netlify-cms-app";
import { config, createFolderCollection } from "@hyperobjekt/cms-config";

window.CMS_MANUAL_INIT = true;

CMS.init({
  config: {
    load_config_file: false,
    // remember to run npx netlify-cms-proxy-server if running locally
    local_backend: process.env.CI !== true,
    backend: {
      name: "git-gateway",
      repo: "YOUR_GIT_REPO",
      branch: "YOUR_CMS_BRANCH",
    },
    media_folder: "/static/images",
    public_folder: "/images",
    collections: [
      createFolderCollection({
        label: "Pages",
        folder: "content/pages",
      }),
    ],
  },
});
```

You now have a functioning CMS for editing site config + pages!

## Static Config

This package contains static configuration objects for frontmatter used in `gatsby-theme-hypersite`.

- `src/config`: contains configuration objects for site metadata config
- `src/partials`: contains configuration for page frontmatter (seo, name, embeddedImages, store, etc.)

## Utility Functions

A few utility functions are provided to help simplify file and folder configuration creation.

### `createFile(config, options)`

Returns a file configuration for a page to use within a file collection.

**Params**

- `config`: a folder collection configuration. at minimum, it should have `label` and `file` keys.
- `options`:
  - `mergeFields`: boolean indicating if fields in the config should be merged with the base config (true), or if they should be replaced (false).
  - `fieldOverrides`: contains an object with properties corresponding to field names, and values that consist of value overrides for the corresponding field config.

### `createFileCollection(config)`

Returns a [file collection configuration](https://www.netlifycms.org/docs/collection-types/#file-collections) based on the provided config.

**Params**

- `config`: a folder collection configuration. at minimum, it should have `label` and `files` keys.

### `createFolderCollection(config, options)`

Returns a [folder collection configuration](https://www.netlifycms.org/docs/collection-types/#folder-collections) based on the provided config and options.

**Params**

- `config`: a folder collection configuration. at minimum, it should have `label` and `folder` keys.
- `options`:
  - `mergeFields`: boolean indicating if fields in the config should be merged with the base config (true), or if they should be replaced (false).
  - `fieldOverrides`: contains an object with properties corresponding to field names, and values that consist of value overrides for the corresponding field config.
