import React from 'react';
import ReactDOM from 'react-dom';
import graphqlQuery from './query.graphql';

ReactDOM.render(
  <div>
    <h1>Hello, world!</h1>
    <code>{JSON.stringify(graphqlQuery)}</code>
  </div>,
  document.getElementById('root')
);
