import React, { Component } from 'react';
import { InjectedProps } from '../store/Store';
import { inject, observer } from 'mobx-react';
import MaskFilter from './MaskFilter';
import { List, ListElement } from './styles/AdvancedImageOperations';

type Props = {};

type State = {};

export class AdvancedImageOperations extends Component<Props, State> {
  get injection() {
    return (this.props as InjectedProps).store;
  }

  componentWillMount = () => {
    this.injection.filterMethods.loadData('/data.json');
  };

  render() {
    return (
      <List>
        {this.injection.filterMethods.methods.map(method => (
          <ListElement key={method.id}>
            <MaskFilter filter={method} />
          </ListElement>
        ))}
      </List>
    );
  }
}

export default inject('store')(observer(AdvancedImageOperations));
