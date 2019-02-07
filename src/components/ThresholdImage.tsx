import React, { Component } from 'react';
import { Button } from '@material-ui/core';

type Props = {};

type State = {};

export default class ThresholdImage extends Component<Props, State> {
  private imageRef = React.createRef<HTMLImageElement>();
  private canvas = React.createRef<HTMLCanvasElement>();

  constructor(props: Props) {
    super(props);

    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const threshold = 127;
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let red = imageData.data[i];
      let green = imageData.data[i + 1];
      let blue = imageData.data[i + 2];
      let coefficient =
        0.2126 * red + 0.7152 * green + 0.0722 * blue >= threshold ? 255 : 0;
      imageData.data[i] = imageData.data[i + 1] = imageData.data[
        i + 2
      ] = coefficient;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.applyFilter}>
        threshold
      </Button>
    );
  }
}
