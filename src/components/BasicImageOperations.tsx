import React, { Component } from 'react';
import {
  Content,
  ButtonsWrapper,
  FileUploadWrapper,
  FileUploadInput
} from './styles/BasicImageOperationsStyle';
import { Button } from '@material-ui/core';
import { AddPhotoIcon } from './styles/icons';
import DraggableImage from './DraggableImage';
import ImageInformations from './ImageInformations';
import { observer, inject } from 'mobx-react';
import { ImageModel } from '../types/ImageUpload';
import { ImageStoreType } from '../store/ImageStore';

type Props = {
  store: {
    imageStory: ImageStoreType;
  };
};

type State = {
  imgPath: string;
};

export class BasicImageOperations extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imgPath: ''
    };

    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(event: any) {
    const { store } = this.props;
    const imageSource = URL.createObjectURL(event.target.files[0]);

    this.setState({
      imgPath: imageSource
    });

    store.imageStory.add({
      title: '',
      source: imageSource,
      width: 0,
      height: 0
    });
  }

  render() {
    return (
      <Content>
        <ButtonsWrapper>
          <FileUploadWrapper>
            <Button variant="contained" color="primary">
              <AddPhotoIcon />
            </Button>
            <FileUploadInput
              type="file"
              accept="image/png, image/jpeg"
              onChange={this.uploadImage}
            />
          </FileUploadWrapper>
          <ImageInformations imageUrl={this.state.imgPath} />
        </ButtonsWrapper>
        <DraggableImage imgPath={this.state.imgPath} />
      </Content>
    );
  }
}

export default inject('store')(observer(BasicImageOperations));
