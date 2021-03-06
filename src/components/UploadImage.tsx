import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { AddPhotoIcon } from './styles/icons';
import { observer, inject } from 'mobx-react';
import { InjectedProps } from '../store/Store';
import { FileUploadWrapper, FileUploadInput } from './styles/UploadImageStyle';

type Props = {};

type State = {};

export class UploadImage extends Component<Props, State> {
  get injection() {
    return (this.props as InjectedProps).store;
  }

  constructor(props: Props) {
    super(props);

    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(event: any) {
    const { imageUpload } = this.injection;
    const { files } = event.target;
    const imageSource: string = URL.createObjectURL(files[0]);

    imageUpload.addNewImage({
      title: files[0].name,
      source: imageSource,
      width: 0,
      height: 0,
      uploadDateTime: new Date()
    });

    imageUpload.drawImage();
  }

  render() {
    return (
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
    );
  }
}

export default inject('store')(observer(UploadImage));
