import React, { Component } from 'react';

type Props = {
  imageUrl: string;
};

type State = {
  imageWidth: number;
  imageHeight: number;
};

export default class ImageInformations extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imageWidth: 0,
      imageHeight: 0
    };
  }

  printPixelsAmount(): any {
    let params = {
      imageWidth: 0,
      imageHeight: 0
    };

    return (
      <p>
        {this.state.imageWidth}px x {this.state.imageHeight}px
      </p>
    );
  }

  render() {
    return (
      <div>
        <div>{this.printPixelsAmount()}</div>
      </div>
    );
  }
}
