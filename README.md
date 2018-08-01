<div align="center">

![image](https://hmp.me/bzzr)

# webpacker
[Webpack](https://github.com/webpack/webpack) configuration manager

## But why?
Setting up webpack with a bunch of plugins and environments every time you start a new project can be time consuming and often confusing. Webpacker aims to provide you with an easy way to use standard webpack configurations without the hassle of setting them up yourself all the time.

</div>

# Installation

```bash
npm i [-D] webpacker
```

# Usage

## Commands
For now there are 3 commands you can use.
- `webpacker serve` => Webpacker will serve your project for development purposes.
- `webpacker build` => Webpacker will build your project and output it to a folder.
- `webpacker stats` => Webpacker will build your project and output it to a folder and it will open a browser window with information about your bundle sizes.


# Loaders
|Name|Additional parameters allowed|Description|
|:--|:---|:---|
|[css][css-loader]|`{env, postcssPresetEnvOptions}`|Loads a CSS file|
|[cyclejs][cyclejs-loader]|`{excludePattern, plugins, presets}`|A functional and reactive JavaScript framework for predictable code. Uses [babel-loader][babel-loader]|
|[graphql][graphql-loader]|`{excludePattern}`|A query language for your API|
|[react][babel-loader]|`{excludePattern, plugins, presets}`|A JavaScript library for building user interfaces. Uses [babel-loader][babel-loader]|
|[scss][sass-loader]|`{env, cwd, scssPath, useScssVariables, postcssPresetEnvOptions}`|Loads a Sass/SCSS file and compiles it to CSS.|
|utils|`{env, postcssPresetEnvOptions}`|An aggregation of [postcss-loader][postcss-loader], [url-loader][url-loader] and [style-loader][style-loader]|

[babel-loader]: https://github.com/babel/babel-loader
[css-loader]: https://github.com/webpack-contrib/css-loader
[cyclejs-loader]: https://cycle.js.org/
[graphql-loader]: https://graphql.org/
[postcss-loader]: https://github.com/postcss/postcss-loader
[sass-loader]: https://github.com/webpack-contrib/sass-loader
[style-loader]: https://github.com/webpack-contrib/style-loader
[url-loader]: https://github.com/webpack-contrib/url-loader

# Plugins
|Name|Additional parameters allowed|Description|
|:--|:---|:---|
|[configure][environment-plugin]|`{env, constants}`|Shorthand for using the DefinePlugin on process.env keys.
|[copy][copy-webpack-plugin]|`{copy}`|Copies individual files or entire directories to the build directory|
|[css][mini-css-extract-plugin]|`{devServer}`|It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.|
|[favicon][favicons-webpack-plugin]|`{cwd, logo}`|Allows to use the favicons generator with webpack|
|[html][html-webpack-plugin]|`{cwd, index}`|Plugin that simplifies creation of HTML files to serve your bundles|
|[stats][webpack-bundle-analyzer]||Visualize size of webpack output files with an interactive zoomable treemap|


[copy-webpack-plugin]: https://github.com/webpack-contrib/copy-webpack-plugin
[environment-plugin]: https://webpack.js.org/plugins/environment-plugin/
[favicons-webpack-plugin]: https://github.com/jantimon/favicons-webpack-plugin
[html-webpack-plugin]: https://github.com/jantimon/html-webpack-plugin
[mini-css-extract-plugin]: https://github.com/webpack-contrib/mini-css-extract-plugin
[webpack-bundle-analyzer]: https://github.com/webpack-contrib/webpack-bundle-analyzer

[cyclejs-usage]: samples/cyclejs/
[react-favicon-usage]: samples/react-and-favicon/
[react-graphql-usage]: samples/react-and-graphql/
[react-sass-usage]: samples/react-and-sass/
[root-usage]: samples/

# Dotfile
To provide configuration to webpacker, you'll need to add a `.webpacker.js` file in the root of your project. The location of the config file can be changed by passing `--config path/to/my/file.js` when running webpacker.

The `.webpacker.js` file needs to export an object with at least the `preset` key.

## Preset
The preset defines which loaders and plugins will be used. If the loader or plugin you need is not available, please submit an issue or a PR.

To provide a consistent way of providing arguments to the loaders and plugins, 2 functions are available to help:
`setLoader` and `setPlugin`.

These functions can be called with the name of the plugin/loader as the first argument and with optional additional arguments as the second.

For a list of available loaders, please check `./loaders/index.js`.
For a list of available plugins, please check `./plugins/index.js`.

## Other options
The following options can be adjusted by returning them as a key in `.webpacker.js`. The options should be functions and their only argument is the function that webpacker itself uses internally. You can choose to call this given function and extend on its return value, or choose to not use the function and return a value of your choosing (refer to the documentation of each option to see what has to be returned).

### serve
`serve` is used to define options for [webpack-serve](https://github.com/webpack-contrib/webpack-serve), which is used when running `webpacker serve`.

### entry
`entry` is for [webpack](https://webpack.js.org/concepts/#entry)'s `entry` option. By default its value is `./src/index.js`.

### output
`output` is for [webpack](https://webpack.js.org/concepts/#output)'s `output` option.

## Example .webpacker.js

```js
const path = require('path');
const {setLoader, setPlugin} = require('webpacker/utils');
const constants = require(`./config/${process.env.NODE_ENV || 'development'}`);

module.exports = {
  output: fn => fn({path: path.join(__dirname, 'build')}),
  preset: {
    loaders: [
      setLoader('react'),
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

# Samples

* [Samples][root-usage]
  * [Cyclejs][cyclejs-usage]
  * [React and favicon][react-favicon-usage]
  * [React and graphql][react-graphql-usage]
  * [React and sass][react-sass-usage]

# Help us
Support us by giving feedback, opening a pull request or just by starring the project!

# License
ISC
