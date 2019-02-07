import React, { Component } from 'react';
import { FilterType } from '../types/FilterMethod';
import { LazyImage } from 'react-lazy-images';
import {
  ImageWrapper,
  Content,
  Title,
  FilterDescription
} from './styles/SampleFilter';
import { Button } from '@material-ui/core';
import { greyScaleFilter, filter } from '../utils/filterHelpers';

type Props = {
  filter: FilterType;
};

type State = {};

export default class SobelFilter extends Component<Props, State> {
  private imageRef = React.createRef<HTMLImageElement>();
  private canvasRef = React.createRef<HTMLCanvasElement>();

  constructor(props: Props) {
    super(props);

    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter() {
    const img: HTMLImageElement = this.imageRef.current as HTMLImageElement;
    const canvas: HTMLCanvasElement = this.canvasRef
      .current as HTMLCanvasElement;
    canvas.width = img.offsetWidth;
    canvas.height = img.offsetHeight;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(img, 0, 0);

    const contextImageData = greyScaleFilter(
      ctx.getImageData(0, 0, img.offsetWidth, img.offsetHeight)
    );

    const tmpCanvas = document.createElement('canvas');
    const tmpCtx = tmpCanvas.getContext('2d') as CanvasRenderingContext2D;

    const vertical = filter(contextImageData, [-1, 0, 1, -2, 0, 2, -1, 0, 1]);
    const horizontal = filter(contextImageData, [-1, -2, -1, 0, 0, 0, 1, 2, 1]);
    const imageData = tmpCtx.createImageData(vertical.width, vertical.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.abs(vertical.data[i]);
      imageData.data[i] = v;
      const h = Math.abs(horizontal.data[i]);
      imageData.data[i + 1] = h;
      imageData.data[i + 2] = (v + h) / 4;
      imageData.data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  render() {
    const { filter } = this.props;

    return (
      <Content>
        <Title>{filter.title}</Title>
        <ImageWrapper>
          <LazyImage
            src={filter.imageSource}
            alt="Buildings with tiled exteriors, lit by the sunset."
            placeholder={({ imageProps, ref }) => (
              <img
                ref={ref}
                src="/img/porto_buildings_lowres.jpg"
                alt={imageProps.alt}
              />
            )}
            actual={({ imageProps }) => (
              <img {...imageProps} ref={this.imageRef} />
            )}
          />
          <canvas ref={this.canvasRef} />
        </ImageWrapper>
        <FilterDescription>
          <p>{filter.description}</p>
          <Button onClick={this.applyFilter}>run filte</Button>
        </FilterDescription>
      </Content>
    );
  }
}
