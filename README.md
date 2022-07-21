Midas Loop UI
=============

# Usage

## Prerequisites

- [Install `node` (comes with `npm`)](https://nodejs.org/). Suggested version expressed in [.nvmrc](./.nvmrc) file.
- [Install `yarn`](https://yarnpkg.com/getting-started/install)

## Development

- `yarn` - install dependencies
- `yarn start` - start development server
- `yarn test` - run minimal tests (eg: lint javascript files)

### Adding a new page
1. Make a new directory under `src` prefixed with `page-`, e.g. `src/page-login`, with at least a `tmpl.html`
2. In both `webpack.dev.js` and `webpack.prod.js`, extend `module.exports.entry` and `module.plugins` appropriately.

## Production

- `yarn build` to prepare `html`, `css`, `js` files in `dist/` directory
- `yarn preview` - run build and serve production files locally

## Credits

- Based on [webpack-static-html-pages](https://github.com/ivarprudnikov/webpack-static-html-pages)
