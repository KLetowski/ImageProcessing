import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Wrapper } from './styles/ImageInformations';
import { InjectedProps } from '../store/Store';

type Props = {};

type State = {};

export class ImageInformations extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  get injected() {
    return (this.props as InjectedProps).store;
  }

  renderView() {
    const { imageUpload } = this.injected;
    const isImageUpload: boolean = imageUpload.source.length > 0;
    return (
      <Wrapper>
        {isImageUpload ? (
          <div>
            <h4>{imageUpload.title}</h4>
            <h4>Width: {imageUpload.width}px</h4>
            <h4>Height: {imageUpload.height}px</h4>
            <h4>
              Upload: {imageUpload.uploadDateTime.getHours()}:
              {imageUpload.uploadDateTime.getMinutes()}
              <span>
                {imageUpload.uploadDateTime.getDate()}/
                {imageUpload.uploadDateTime.getMonth() + 1}/
                {imageUpload.uploadDateTime.getFullYear()}
              </span>
            </h4>
          </div>
        ) : (
          <h4>No image upload</h4>
        )}
      </Wrapper>
    );
  }

  render() {
    return this.renderView();
  }
}

export default inject('store')(observer(ImageInformations));
