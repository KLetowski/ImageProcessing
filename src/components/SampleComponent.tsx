import React, { Component } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import { AddPhotoIcon } from './BasicImageOperations'

export default class SampleComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentWillMount = () => {
    axios.get('./data.json').then(response => {
      this.setState({
        data: response.data
      });
    });
  };

  renderData(): any {
    return this.state.data.map((r: any) => (
      <li key={r.id}>
        <h2>{r.title}</h2>
        <LazyLoadImage effect="blur" src={r.src} alt={r.src} height={'100px'} />
      </li>
    ));
  }

  render() {
    return (
      <section>
        <ul>{this.renderData()}</ul>
        {/* <AddPhotoIcon /> */}
      </section>
    );
  }
}
