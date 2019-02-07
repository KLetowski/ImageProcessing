import styled from 'styled-components';

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
  display: flex;
  flex-direction: column;

  * {
    cursor: pointer;
  }
`;
