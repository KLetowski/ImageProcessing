import styled, { keyframes } from 'styled-components';

export const Content = styled.section`
  display: flex;
  height: 100vh;
  padding: 0;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileUploadInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
`;

export const FileUploadWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;
