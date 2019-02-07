import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { greyScaleFilter } from '../utils/filterHelpers';

type Props = {};

type State = {};

export default class GrayScale extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.setGrayScale = this.setGrayScale.bind(this);
  }

  setGrayScale() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.putImageData(
      greyScaleFilter(ctx.getImageData(0, 0, canvas.width, canvas.height)),
      0,
      0
    );
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.setGrayScale}>
        Gray scale
      </Button>
    );
  }
}
