import React from 'react';
import ReactDOM from 'react-dom';
import graphqlquery from './query.graphql';

ReactDOM.render(
  <div>
    <h1>Hello, world!</h1>
    <code>{JSON.stringify(graphqlquery)}</code>
  </div>,
  document.getElementById('root')
);
