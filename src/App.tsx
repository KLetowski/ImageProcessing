import React, { Component } from 'react';
import SampleComponent from './components/SampleComponent';
import { Routing } from './utils/routing';
import { theme } from './utils/matrialUITheme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BasicImageOperations from './components/BasicImageOperations';
import { Provider } from 'mobx-react';
import { onPatch } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';
import { store } from './store/Store';

makeInspectable(store);

onPatch(store.imageStory, patch => {
  console.log(patch);
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path={Routing.start}
                component={BasicImageOperations}
              />
              <Route exact path="/asd" component={SampleComponent} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
