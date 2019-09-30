import React from 'react';
import ReactDOM from 'react-dom';

const title: String = 'Typescript';

interface CustomInterface {
  render(),
};

class App extends React.Component implements CustomInterface {
  render() {
    return (<h1>Hello World in {title}</h1>);
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
