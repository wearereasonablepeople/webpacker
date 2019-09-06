import {themes} from './vars';

export class Theme {
  theme = '';
  themes = {};

  constructor(themeMap) {
    this.themes = {...themeMap};
  }

  setTheme(name) {
    if (!Object.prototype.hasOwnProperty.call(this.themes, name)) {
      throw new Error(`Theme "${name}" is missing`);
    }
    this.theme = name;
    Object.keys(this.themes[this.theme]).forEach(key => {
      this.setVar(key, key);
    });
  }

  setVar(source, target) {
    if (!Object.prototype.hasOwnProperty.call(this.themes[this.theme], source)) {
      throw new Error(`Cannot update css var "${source}" - variable is missing`);
    }
    document.body.style.setProperty(`--${source}`, `${this.themes[this.theme][target]}`);
  }
}

export const theme = new Theme(themes);
