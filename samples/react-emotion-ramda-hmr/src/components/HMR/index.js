import React from 'react';
import Cms from '../App';
let App = Cms;

// run hot module reloading
if(module.hot && process.env.NODE_ENV !== 'production') {
  const RawApp = App;
  App = class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {App: RawApp};
      module.hot.accept('../App', () => {
        import('../App').then(({default: App}) => {
          this.setState({App});
        });
      });
    }

    render() {
      return <this.state.App />;
    }
  };
}

export default App;
