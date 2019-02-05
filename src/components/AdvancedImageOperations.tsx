import React, { Component } from 'react';
import axios from 'axios';

export default class AdvancedImageOperations extends Component {
  componentWillMount = () => {
    axios.get('/data.json').then((res: any) => {
      console.log(res);
    });
  };

  render() {
    return <div>dupa</div>;
  }
}
