import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ImageStoreType } from '../store/ImageStore';

type Props = {
  imageUrl: string;
  store?: {
    imageStory: ImageStoreType;
  };
};

type State = {};

export class ImageInformations extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  printPixelsAmount() {
    const { image } = (this.props.store as any).imageStory;

    return (
      <p>
        {image.width}px x {image.height}px
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

export default inject('store')(observer(ImageInformations));
