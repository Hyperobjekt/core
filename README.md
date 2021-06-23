# Hyperobjekt Core

This a monorepo containing core packages used for data visualization tools created by Hyperobjekt.

## Contributing

This project uses the following tools:

- lerna: for monorepo management and publishing
- yarn: for managing dependencies and workspaces
- storybook: for developing and documenting components
- jest: for unit testing

You can start development by running the following commands:

```
yarn install
yarn bootstrap
yarn dev
```

This will start the storybook interface where you may develop your components.

### Building a release

```
yarn build
```

### Publishing to npm

Before publishing, update the `CHANGELOG.md` for each package that has changes, with the new version number and a list of changes in that version.

Publishing packages is managed by `lerna`, running `yarn package` will perform the following actions:

- performs a build of all packages
- detects packages with changed code
- prompts you for a version number to increment to
- increments version in `package.json` and publishes to NPM
- updates the github repo with the updated `package.json` and adds a release + tag for the new version

> Note: if you are publishing a new package, you will have to run the first publish manually by navigating to the package directory and running `npm publish --access public` to specify it is a public package.

## Attributions

This repository has been based on the article [Creating a Monorepo with Lerna & Yarn Workspaces](https://leerob.io/blog/monorepo-lerna-yarn-workspaces).
