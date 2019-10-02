# webpacker

[![Build Status](https://travis-ci.com/wearereasonablepeople/webpacker.svg?branch=master)](https://travis-ci.com/wearereasonablepeople/webpacker)
[![Coverage Status](https://coveralls.io/repos/github/wearereasonablepeople/webpacker/badge.svg?branch=master)](https://coveralls.io/github/wearereasonablepeople/webpacker?branch=master)

[Webpack](https://github.com/webpack/webpack) configuration manager

## Motivation

Setting up webpack with a bunch of plugins and environments every time you start a new project can be time consuming and often confusing. Webpacker aims to provide you with an easy way to use standard webpack configurations without the hassle of setting them up yourself all the time.

## Installation

```bash
npm i --save-dev webpacker
```

## Usage

### Commands

For now there are 3 commands you can use.

- `webpacker serve` => Webpacker will serve your project for development purposes.
- `webpacker build` => Webpacker will build your project and output it to a folder.
- `webpacker stats` => Webpacker will build your project and output it to a folder and it will open
a browser window with information about your bundle sizes.

### Loaders

|Name|Additional parameters allowed|Description|
|:--|:---|:---|
|[css][css-loader]|`{env, postcssOpts}`|Loads a CSS file|
|[cyclejs][cyclejs-loader]|`{excludePattern, plugins, presets}`|A functional and reactive JavaScript framework for predictable code. Uses [babel-loader][babel-loader]|
|[graphql][graphql-loader]|`{excludePattern}`|A query language for your API|
|[react][babel-loader]|`{excludePattern, plugins, presets}`|A JavaScript library for building user interfaces. Uses [babel-loader][babel-loader]|
|[typescript][ts-loader]|`{excludePattern, transpileOnly, tsconfigPath}`|TypeScript loader for webpack. Uses [ts-loader][ts-loader]|
|[scss][sass-loader]|`{env, scssVariables, postcssOpts}`|Loads a Sass/SCSS file and compiles it to CSS.|
|utils|`{env, postcssOpts}`|An aggregation of [postcss-loader][postcss-loader], [url-loader][url-loader] and [style-loader][style-loader]|

[babel-loader]: https://github.com/babel/babel-loader
[ts-loader]: https://github.com/TypeStrong/ts-loader
[css-loader]: https://github.com/webpack-contrib/css-loader
[cyclejs-loader]: https://cycle.js.org/
[graphql-loader]: https://graphql.org/
[postcss-loader]: https://github.com/postcss/postcss-loader
[sass-loader]: https://github.com/webpack-contrib/sass-loader
[style-loader]: https://github.com/webpack-contrib/style-loader
[url-loader]: https://github.com/webpack-contrib/url-loader

## Plugins

|Name|Additional parameters allowed|Description|
|:--|:---|:---|
|[configure][environment-plugin]|`{env, constants}`|Shorthand for using the DefinePlugin on process.env keys|
|[copy][copy-webpack-plugin]|`{copy}`|Copies individual files or entire directories to the build directory|
|[clean][clean-webpack-plugin]|`{dry, cleanStaleWebpackAssets, protectWebpackAssets}`|A webpack plugin to remove/clean your build folder(s)|
|[css][mini-css-extract-plugin]|`{devServer}`|It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps|
|[favicon][favicons-webpack-plugin]|`{cwd, logo}`|Allows to use the favicons generator with webpack|
|[html][html-webpack-plugin]|`{cwd, index}`|Plugin that simplifies creation of HTML files to serve your bundles|
|[stats][webpack-bundle-analyzer]||Visualize size of webpack output files with an interactive zoomable treemap|
|[compress][compression-webpack-plugin]|`{devServer}`|Prepare compressed versions of assets|
|[lodash][lodash-webpack-plugin]|`opts`|Treeshaking plugin for lodash-es|
|[forkTsChecker][fork-ts-checker-plugin]|`{tsconfigPath}`|Webpack plugin that runs TypeScript type checker on a separate process.|

[copy-webpack-plugin]: https://github.com/webpack-contrib/copy-webpack-plugin
[clean-webpack-plugin]: https://github.com/johnagan/clean-webpack-plugin
[environment-plugin]: https://webpack.js.org/plugins/environment-plugin/
[favicons-webpack-plugin]: https://github.com/jantimon/favicons-webpack-plugin
[html-webpack-plugin]: https://github.com/jantimon/html-webpack-plugin
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-bundle-analyzer]: https://github.com/webpack-contrib/webpack-bundle-analyzer
[compression-webpack-plugin]: https://github.com/webpack-contrib/compression-webpack-plugin
[lodash-webpack-plugin]: https://github.com/lodash/lodash-webpack-plugin
[fork-ts-checker-plugin]: https://github.com/TypeStrong/fork-ts-checker-webpack-plugin

[cyclejs-usage]: samples/cyclejs/
[react-favicon-usage]: samples/react-and-favicon/
[react-graphql-usage]: samples/react-and-graphql/
[react-scss-usage]: samples/react-and-scss/
[react-emotion-ramda-hmr]: samples/react-emotion-ramda-hmr/
[react-typescript]: samples/react-typescript/
[root-usage]: samples/

## Dotfile

To provide configuration to webpacker, you'll need to add a `.webpacker.js` file in the root of your project. The location of the config file can be changed by passing `--config path/to/my/file.js` when running webpacker.

The `.webpacker.js` file needs to export an object with at least the `preset` key.

### Preset

The preset defines which loaders and plugins will be used. If the loader or plugin you need is not available, please submit an issue or a PR.

To provide a consistent way of providing arguments to the loaders and plugins, 2 functions are available to help:
`setLoader` and `setPlugin`.

These functions can be called with the name of the plugin/loader as the first argument and with optional additional arguments as the second.

For a list of available loaders, please check `./loaders/index.js`.
For a list of available plugins, please check `./plugins/index.js`.

### Other options

The following options can be adjusted by returning them as a key in `.webpacker.js`. The options should be functions and their only argument is the function that webpacker itself uses internally. You can choose to call this given function and extend on its return value, or choose to not use the function and return a value of your choosing (refer to the documentation of each option to see what has to be returned).

#### devServer

`devServer` is used to define options for [webpack-dev-server](https://github.com/webpack/webpack-dev-server), which is used when running `webpacker serve`.

#### entry

`entry` is for [webpack](https://webpack.js.org/concepts/#entry)'s `entry` option. By default its value is `./src/index.js`.

#### output

`output` is for [webpack](https://webpack.js.org/concepts/#output)'s `output` option.

#### devtool

`devtool` is for [webpack](https://webpack.js.org/configuration/devtool/)'s `devtool` option.

#### Example file

```js
const path = require('path');
const {setLoader, setPlugin} = require('webpacker/utils');
const constants = require(`./config/${process.env.NODE_ENV || 'development'}`);

module.exports = {
  output: fn => fn({path: path.join(__dirname, 'build')}),
  preset: {
    loaders: [
      setLoader('react'),
      setLoader('typescript'),
      setLoader('css'),
      setLoader('scss'),
    ],
    plugins: [
      setPlugin('configure', {constants}),
      setPlugin('css'),
      setPlugin('favicon', {logo: './public/img/streamline.svg'}),
      setPlugin('html'),
    ],
  }
};
```

## Samples

- [Samples][root-usage]
  - [Cyclejs][cyclejs-usage]
  - [React/Favicon][react-favicon-usage]
  - [React/Graphql][react-graphql-usage]
  - [React/SCSS][react-scss-usage]
  - [React/EmotionJS/Ramda/HotModuleReplacement][react-emotion-ramda-hmr]
  - [React/Typescript][react-typescript]

## Help us

Support us by giving feedback, opening a pull request or just by starring the project!

## License

ISC
