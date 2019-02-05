import React, { Component } from 'react';
import { Routing } from './utils/routing';
import { theme } from './utils/matrialUITheme';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BasicImageOperations from './components/BasicImageOperations';
import { Provider } from 'mobx-react';
import { onPatch } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import { store } from './store/Store';
import AdvancedImageOperations from './components/AdvancedImageOperations';
import { history } from './store/History';

makeInspectable(store);

onPatch(store.imageUpload, patch => {
  console.log(patch);
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route
                exact
                path={Routing.start}
                component={BasicImageOperations}
              />
              <Route
                exact
                path={Routing.advancedOperations}
                component={AdvancedImageOperations}
              />
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
