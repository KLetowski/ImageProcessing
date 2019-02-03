import React, { Component } from 'react';
import { ImageWrapper, Img, Wrapper } from './styles/DraggableImageStyle';
import { RotateLeftIcon } from './styles/icons';
import InfoIcon from '@material-ui/icons/Info';

type Props = {
  imgPath: string;
};

type State = {
  imagePosition: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  imageRotation: number;
};

type Size = {
  width: number;
  height: number;
};

type Position = {
  top: number;
  left: number;
};

export default class DraggableImage extends Component<Props, State> {
  private imageRef = React.createRef<HTMLDivElement>();
  private imgWrapperRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      imagePosition: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      imageRotation: 0
    };

    this.dragMouseDown = this.dragMouseDown.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);
    this.rotateLeftClick = this.rotateLeftClick.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.imgPath !== this.props.imgPath) {
      this.dragImage(this.imageRef.current as HTMLDivElement);
    }
  }

  dragImage(element: HTMLDivElement) {
    element.onmousedown = this.dragMouseDown;
  }

  dragMouseDown(event: any) {
    const imageRef = this.imageRef.current as HTMLElement;
    imageRef.style.transition = `none`;

    event = event || window.event;
    event.preventDefault();
    this.setState({
      imagePosition: {
        left: this.state.imagePosition.left,
        top: this.state.imagePosition.top,
        right: event.clientX,
        bottom: event.clientY
      }
    });
    document.onmouseup = this.closeDragElement;
    document.onmousemove = this.elementDrag;
  }

  elementDrag(event: any) {
    event = event || window.event;
    event.preventDefault();
    const imageRef = this.imageRef.current as HTMLElement;
    const imgWrapperRef = this.imgWrapperRef.current as HTMLElement;

    this.setState({
      imagePosition: {
        left: this.state.imagePosition.right - event.clientX,
        top: this.state.imagePosition.bottom - event.clientY,
        right: event.clientX,
        bottom: event.clientY
      }
    });

    const imgWrapperRefStyle = getComputedStyle(imgWrapperRef);
    let position = this.calculatePosition(
      {
        top: imageRef.offsetTop - this.state.imagePosition.top,
        left: imageRef.offsetLeft - this.state.imagePosition.left
      },
      {
        height: imageRef.offsetHeight,
        width: imageRef.offsetWidth
      },
      {
        height:
          imgWrapperRef.offsetHeight -
          Number.parseInt(imgWrapperRefStyle.borderWidth as string),
        width:
          imgWrapperRef.offsetWidth -
          Number.parseInt(imgWrapperRefStyle.borderWidth as string) * 2
      }
    );

    imageRef.style.top = position.top + 'px';
    imageRef.style.left = position.left + 'px';
  }

  calculatePosition(
    position: Position,
    element: Size,
    wrapper: Size
  ): Position {
    if (position.left < 0) {
      position.left = 0;
    }
    if (position.top < 0) {
      position.top = 0;
    }
    if (position.left + element.width >= wrapper.width) {
      position.left = wrapper.width - element.width;
    }
    if (position.top + element.height >= wrapper.height - 8) {
      position.top = wrapper.height - element.height - 8;
    }

    return position;
  }

  closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  rotateLeftClick() {
    const imageRef = this.imageRef.current as HTMLElement;
    let { imageRotation } = this.state;
    imageRotation -= 15;

    this.setState({
      imageRotation: imageRotation
    });

    imageRef.style.transition = `all 0.3s ease`;
    imageRef.style.transform = `rotateZ(${imageRotation}deg)`;
  }

  render() {
    return (
      <ImageWrapper ref={this.imgWrapperRef}>
        <Wrapper ref={this.imageRef}>
          <Img src={this.props.imgPath} />
          <RotateLeftIcon onClick={this.rotateLeftClick} />
        </Wrapper>
      </ImageWrapper>
    );
  }
}
