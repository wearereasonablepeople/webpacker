import {css} from '@emotion/core';
import reset from './reset';
import './icons';

export default css`
  ${reset};

  html, body, #root, {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 24px;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    background: #FAFAFA;
    color: #222;
  }

  img {
    max-width: 100%;
  }

  button, a {
    cursor: pointer;
    outline: none;
  }

  .react-orientation {
    display: none;
  }

  @media all and (orientation: landscape) {
    .react-orientation--landscape {
      display: inherit;
    }
  }

  @media all and (orientation: portrait) {
    .react-orientation--portrait {
      display: inherit;
    }
  }
`;
