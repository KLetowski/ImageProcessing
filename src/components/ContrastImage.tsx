import React, { Component } from 'react';
import { Button } from '@material-ui/core';

type Props = {};

type State = {};

export default class ContrastImage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.contrast = this.contrast.bind(this);
  }

  contrast() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;
    const contrast = 6;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i] - 128;
      let g = data[i + 1] - 128;
      let b = data[i + 2] - 128;

      r = r * contrast;
      g = g * contrast;
      b = b * contrast;

      data[i] = (data[i] - 128) * contrast + 128;
      data[i + 1] = (data[i + 1] - 128) * contrast + 128;
      data[i + 2] = (data[i + 2] - 128) * contrast + 128;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.contrast}>
        contrast
      </Button>
    );
  }
}
