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
For now there are 2 commands you can use.
- `serve` => Webpacker will run in development mode and serve your project on port `4000`.
- `build` => Webpacker will run in production mode and build + minify/uglify your project and output it to a folder.

## Dotfile
To provide configuration to webpacker, you'll need to add a `.webpacker.json` file in the root of your project. The data inside the dotfile will also be available in your project's source code, which will be explained [here](#environmental-config).

- `index` => The location of your index.ejs file (always has to be .ejs to be able to provide dynamic options).
- `entry` => The location of your index.js file, the entry point to your app.
- `app` => The location of the src folder of your app.
- `config` => The location of the environment config folder of your app. The environment name you pass to webpacker will be used to grab the file (so `production` would tell webpacker to use `<config>/production.js`).
- `output` => The output folder of the build process (only required when running the `build` command).
- `presets` => Array of strings to specify the presets that should be used. You can provide relative file paths to custom presets (more about that [here](#custom-presets)).
- `scss` => The folder location of your scss files. This will make sure that webpacker can grab the `variables.scss` file when using the `scss` preset.

### Example
`.webpacker.json`

```json
{
  "index": "src/index.ejs",
  "entry": "src/index.js",
  "app": "src",
  "config": "config",
  "output": "dist",
  "scss": "src/scss",
  "presets": ["react", "scss"]
}
```

### Supported presets
For now webpacker supports `cyclejs`, `graphql`, `react` and `scss`.
These presets will allow you to get started right away without having to invent the wheel every time you start a new project.

### Custom presets
Webpacker aims to be smart, but not restrictive. For this reason you're able to provide your own custom presets. This can be done by providing a relative path to a `.js` file in the presets array.

```json
"presets": ["react", "scss", "./path/to/file.js"]
```

This `.js` file needs to export a function which returns either a webpack loader object, or an array of webpack loader objects.

**Example**
```js
module.exports = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: [
      ['env', {
        debug: false,
        targets: {browsers: ['last 2 versions']},
        loose: true,
        modules: false
      }],
      require('babel-preset-stage-2')
    ]
  }
});
```

## Command line arguments
Webpacker supports a number of command line arguments.
- `environment` => Provide the environment to webpacker. Webpacker will try to grab the environment config file with the same name from the folder provided with `config` in the dotfile. For more information about the environment config files, see [environmental config](#environmental-config).
- `sourcemap` => Tell webpacker to use source maps when building/serving. When using the `serve` command, source maps will be enabled by default.

## Environmental config
The dotfile supports the `config` property, which specifies the folder that contains environment config files. Based on the environment that webpacker receives through the command line, it will grab the file with the same name from that folder. The return value of this file can be used within your app through `process.env.<some-key>`.

### Example
In `.webpacker.json`
```json
{
  ...
  "config": "config",
  ...
}
```

In `./config/production.js`
```js
module.exports = {
  apiEndpoint: 'http://localhost:3000'
};
```

From the command line
```bash
  webpacker serve --env.environment=production
```

Webpacker will now try to grab `./config/production.js` and expose the return value of this file to your app. Inside your app you can now use `process.env.apiEndpoint`.
