import React, { Component } from 'react';
import { Content, ButtonsWrapper } from './styles/BasicImageOperationsStyle';
import { Button } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import DraggableImage from './DraggableImage';
import ImageInformations from './ImageInformations';
import GrayScale from './GrayScale';
import RotateImage from './RotateImage';
import UploadImage from './UploadImage';
import { RouterStore } from 'mobx-react-router';
import { ImageUploadType } from '../types/ImageUpload';
import BrightnessImage from './BrightnessImage';
import InversionImage from './InversionImage';
import ContrastImage from './ContrastImage';
import ThresholdImage from './ThresholdImage';

type Props = {
  store: {
    imageUpload: ImageUploadType;
    routing: RouterStore;
  };
};

type State = {};

export class BasicImageOperations extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.resetColor = this.resetColor.bind(this);
  }

  resetColor(event: any) {
    const { imageUpload } = this.props.store;

    imageUpload.resetColor();
  }

  render() {
    return (
      <Content>
        <ButtonsWrapper>
          <UploadImage />
          <RotateImage />
          <GrayScale />
          <BrightnessImage />
          <InversionImage />
          <ContrastImage />
          <ThresholdImage />
          <Button color="primary" variant="contained" onClick={this.resetColor}>
            reset color
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              this.props.store.routing.push('/advanced-operations')
            }
          >
            more options
          </Button>
          <ImageInformations />
        </ButtonsWrapper>
        <DraggableImage />
      </Content>
    );
  }
}

export default inject('store')(observer(BasicImageOperations));
