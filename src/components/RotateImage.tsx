import React, { Component } from 'react';
import { RotateLeftIcon, RotateRightIcon } from './styles/icons';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Wrapper } from './styles/RotateImage';

enum RotationDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

type Props = {};

type State = {
  imageCurrentRotation: number;
  rotationDegree: number;
};

export default class RotateImage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imageCurrentRotation: 0,
      rotationDegree: 15
    };

    this.rotateClick = this.rotateClick.bind(this);
    this.rotateValueChanged = this.rotateValueChanged.bind(this);
  }

  rotateClick(direction: RotationDirection) {
    const imageRef = document.getElementById('canvas') as HTMLCanvasElement;
    let { imageCurrentRotation, rotationDegree } = this.state;

    imageCurrentRotation =
      direction === RotationDirection.LEFT
        ? (imageCurrentRotation -= rotationDegree)
        : (imageCurrentRotation += rotationDegree);

    this.setState({
      imageCurrentRotation: imageCurrentRotation
    });

    imageRef.style.transition = `all 0.3s ease`;
    imageRef.style.transform = `rotateZ(${imageCurrentRotation}deg)`;
  }

  rotateValueChanged(event: any) {
    let { value } = event.currentTarget;
    value = Number.parseInt(value);

    this.setState({
      rotationDegree: Number.isInteger(value) ? value : 15
    });
  }

  render() {
    return (
      <Wrapper>
        <TextField
          label="rotate value"
          placeholder="0 - 360"
          onChange={this.rotateValueChanged}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.rotateClick(RotationDirection.LEFT)}
        >
          <RotateLeftIcon />
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.rotateClick(RotationDirection.RIGHT)}
        >
          <RotateRightIcon />
        </Button>
      </Wrapper>
    );
  }
}
