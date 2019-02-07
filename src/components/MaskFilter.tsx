import React, { Component } from 'react';
import { FilterType } from '../types/FilterMethod';
import { LazyImage } from 'react-lazy-images';
import {
  ImageWrapper,
  Content,
  Title,
  FilterDescription,
  Canvas,
  Description
} from './styles/SampleFilter';
import { Button } from '@material-ui/core';
import { filter, resetColor, greyScaleFilter } from '../utils/filterHelpers';
import AOS from 'aos';

enum FilterBrand {
  SOBEL = 'SOBEL',
  WITH_MASK = 'WITH_MASK'
}

type Props = {
  filter: FilterType;
};

type State = {};

export default class MaskFilter extends Component<Props, State> {
  private imageRef = React.createRef<HTMLImageElement>();
  private canvasRef = React.createRef<HTMLCanvasElement>();

  constructor(props: Props) {
    super(props);
    AOS.init();

    this.resetColor = this.resetColor.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  sampleFilter() {
    const { mask } = this.props.filter;
    const img: HTMLImageElement = this.imageRef.current as HTMLImageElement;
    const canvas: HTMLCanvasElement = this.canvasRef
      .current as HTMLCanvasElement;
    canvas.width = img.offsetWidth > 0 ? img.offsetWidth : canvas.width;
    canvas.height = img.offsetHeight > 0 ? img.offsetHeight : canvas.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(img, 0, 0);

    const contextImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageData = filter(contextImageData, mask);
    img.style.display = 'none';

    canvas.style.display = 'block';
    ctx.putImageData(imageData, 0, 0);
  }

  sobel() {
    const img: HTMLImageElement = this.imageRef.current as HTMLImageElement;
    const canvas: HTMLCanvasElement = this.canvasRef
      .current as HTMLCanvasElement;
    canvas.width = img.offsetWidth > 0 ? img.offsetWidth : canvas.width;
    canvas.height = img.offsetHeight > 0 ? img.offsetHeight : canvas.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(img, 0, 0);

    const contextImageData = greyScaleFilter(
      ctx.getImageData(0, 0, canvas.width, canvas.height)
    );

    const tmpCanvas = document.createElement('canvas');
    const tmpCtx = tmpCanvas.getContext('2d') as CanvasRenderingContext2D;
    img.style.display = 'none';

    const vertical = filter(contextImageData, [-1, 0, 1, -2, 0, 2, -1, 0, 1]);
    const horizontal = filter(contextImageData, [-1, -2, -1, 0, 0, 0, 1, 2, 1]);
    const imageData = tmpCtx.createImageData(vertical.width, vertical.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
      const verticalData = Math.abs(vertical.data[i]);
      imageData.data[i] = verticalData;
      const horizontalData = Math.abs(horizontal.data[i]);
      imageData.data[i + 1] = horizontalData;
      imageData.data[i + 2] = (verticalData + horizontalData) / 4;
      imageData.data[i + 3] = 255;
    }

    canvas.style.display = 'block';
    ctx.putImageData(imageData, 0, 0);
  }

  applyFilter(mask: number[]) {
    this.props.filter.type === FilterBrand.WITH_MASK
      ? this.sampleFilter()
      : this.sobel();
  }

  resetColor() {
    resetColor(
      this.imageRef.current as HTMLImageElement,
      this.canvasRef.current as HTMLCanvasElement
    );
  }

  render() {
    const { filter } = this.props;

    return (
      <Content>
        <ImageWrapper>
          <LazyImage
            src={filter.imageSource}
            alt="Buildings with tiled exteriors, lit by the sunset."
            placeholder={({ imageProps, ref }) => (
              <img ref={ref} src="" alt={imageProps.alt} />
            )}
            actual={({ imageProps }) => (
              <img {...imageProps} ref={this.imageRef} />
            )}
          />
          <Canvas ref={this.canvasRef} />
        </ImageWrapper>
        <FilterDescription data-aos="fade-down">
          <Title>{filter.title}</Title>
          <Description>{filter.description}</Description>
          <Button onClick={() => this.applyFilter(filter.mask)}>
            run filter
          </Button>
          <Button onClick={this.resetColor}>reset</Button>
        </FilterDescription>
      </Content>
    );
  }
}
