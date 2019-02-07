import React, { Component } from 'react';
import { Button } from '@material-ui/core';

type Props = {};

type State = {};

export default class InversionImage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.inversion = this.inversion.bind(this);
  }

  inversion() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.inversion}>
        inversion
      </Button>
    );
  }
}
