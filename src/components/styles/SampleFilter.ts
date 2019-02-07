import styled from 'styled-components';

export const Content = styled.div`
  height: 100%;
  padding: 2rem 4rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
`;

export const ImageWrapper = styled.div`
  width: 40%;
  align-self: center;
`;

export const Title = styled.h1`
  flex: 0 1 100%;
  text-aligin: center;
  color: #fff;
  font-family: Roboto;
  color: #eee;
`;

export const FilterDescription = styled.div`
  width: 60%;
  padding: 0 3rem;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
`;

export const Canvas = styled.canvas`
  display: none;
`;

export const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.5;
`;
