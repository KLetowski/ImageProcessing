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
import { filter } from '../utils/filterHelpers';

type Props = {
  filter: FilterType;
};

type State = {};

export default class MaskFilter extends Component<Props, State> {
  private imageRef = React.createRef<HTMLImageElement>();
  private canvasRef = React.createRef<HTMLCanvasElement>();

  constructor(props: Props) {
    super(props);

    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter(mask: number[]) {
    const img: HTMLImageElement = this.imageRef.current as HTMLImageElement;
    const canvas: HTMLCanvasElement = this.canvasRef
      .current as HTMLCanvasElement;
    canvas.width = img.offsetWidth;
    canvas.height = img.offsetHeight;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(img, 0, 0);

    const contextImageData = ctx.getImageData(
      0,
      0,
      img.offsetWidth,
      img.offsetHeight
    );

    const imageData = filter(contextImageData, mask);
    img.style.display = 'none';
    canvas.width = imageData.width;
    canvas.height = imageData.height;
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
          <Button onClick={() => this.applyFilter(filter.mask)}>
            run filte
          </Button>
        </FilterDescription>
      </Content>
    );
  }
}
