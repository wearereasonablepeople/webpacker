# webpacker
Webpack configuration manager

## But why?
Setting up webpack with a bunch of plugins and environments every time you start a new project can be time consuming and often confusing. Webpacker aims to provide you with an easy way to use standard webpack configurations without the hassle of setting them up yourself all the time.

# Installation
```bash
npm i [-D] webpacker
yarn add [-D] webpacker
```

# Usage
## Commands
For now there are 3 commands you can use.
- `serve` => Webpacker will serve your project for development purposes.
- `build` => Webpacker will build your project and output it to a folder.
- `stats` => Webpacker will build your project and output it to a folder and it will open a browser window with information about your bundle sizes.

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

#### serve
`serve` is used to define options for [webpack-serve](https://github.com/webpack-contrib/webpack-serve), which is used when running `webpacker serve`.

### entry
`entry` is for [webpack](https://webpack.js.org/concepts/#entry)'s `entry` option.

### output
`output` is for [webpack](https://webpack.js.org/concepts/#output)'s `output` option.

### Example file
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
