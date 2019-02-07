import React, { Component } from 'react';
import { Button } from '@material-ui/core';

type Props = {};

type State = {};

export default class BrightnessImage extends Component<Props, State> {
  private imageRef = React.createRef<HTMLImageElement>();
  private canvas = React.createRef<HTMLCanvasElement>();

  constructor(props: Props) {
    super(props);

    this.brightness = this.brightness.bind(this);
  }

  brightness() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;
    const adjustment = 50;

    for (let i = 0; i < data.length; i += 4) {
      data[i] += adjustment;
      data[i + 1] += adjustment;
      data[i + 2] += adjustment;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.brightness}>
        brightness
      </Button>
    );
  }
}
