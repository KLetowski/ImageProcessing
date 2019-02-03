import styled, { keyframes } from 'styled-components';

export const ImageWrapper = styled.div`
  border: 0.25rem dashed #ccc;
  height: 100%;
  width: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const Img = styled.img``;

export const Wrapper = styled.div`
  cursor: move;
  position: absolute;
  display: flex;

  &:hover {
    svg {
      display: inline;
    }
  }

  svg {
    display: none;
    position: absolute;
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    transition: all 0.3s ease-in-out;

    :hover {
      transform: rotate(-45deg);
    }
  }
`;
