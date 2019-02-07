import React, { Component } from 'react';
import { InjectedProps } from '../store/Store';
import { inject, observer } from 'mobx-react';
import SampleFilter from './MaskFilter';
import { List, ListElement } from './styles/AdvancedImageOperations';
import SobelFilter from './SobelFilter';

enum FilterType {
  SOBEL = 'SOBEL',
  WITH_MASK = 'WITH_MASK'
}

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
          <ListElement>
            {method.type === FilterType.SOBEL ? (
              <SobelFilter filter={method} />
            ) : null}
            {method.type === FilterType.WITH_MASK ? (
              <SampleFilter filter={method} />
            ) : null}
          </ListElement>
        ))}
      </List>
    );
  }
}

export default inject('store')(observer(AdvancedImageOperations));
