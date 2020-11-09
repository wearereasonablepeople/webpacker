import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {Global} from '@emotion/core';
import HmrComponent from './components/HMR';
import globalStyles from './styles/globals';
import {theme} from './styles/theme';
import history from './utils/history';

const dom = (
  <Router history={history}>
    <>
      <HmrComponent />
      <Global styles={globalStyles} />
    </>
  </Router>
);

theme.setTheme('default');
render(dom, document.getElementById('root'));
