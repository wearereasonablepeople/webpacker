import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {Global} from '@emotion/core';
import HMR from './components/HMR';
import globalStyles from './styles/globals';
import {theme} from './styles/theme';
import history from './utils/history';

const dom = (<Router history={history}>
  <React.Fragment>
    <HMR />
    <Global styles={globalStyles} />
  </React.Fragment>
</Router>);

theme.setTheme('default');
render(dom, document.getElementById('root'));
