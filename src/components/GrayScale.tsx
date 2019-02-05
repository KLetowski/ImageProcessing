import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class GrayScale extends Component {
  constructor(props: any) {
    super(props);

    this.setGrayScale = this.setGrayScale.bind(this);
  }

  setGrayScale() {
    var canvas: any = document.getElementById('canvas') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.setGrayScale}>
        Gray scale
      </Button>
    );
  }
}
