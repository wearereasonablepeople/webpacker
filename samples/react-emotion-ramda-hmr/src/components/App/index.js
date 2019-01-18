import React from 'react';
import {Switch, Route} from 'react-router';
import Container from '../Container';

export default class Cms extends React.Component {

  render() {
    return <Switch>
      <Route component={Container} />
    </Switch>;
  }
}
