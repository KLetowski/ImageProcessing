import React, { Component } from 'react';
import SampleComponent from './components/SampleComponent';
import { Routing } from './utils/routing';
import { theme } from './utils/matrialUITheme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BasicImageOperations from './components/BasicImageOperations';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={Routing.start}
              component={BasicImageOperations}
            />
            <Route
              exact
              path='/asd'
              component={SampleComponent}
            />
                      </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
