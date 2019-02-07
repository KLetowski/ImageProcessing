import styled from 'styled-components';

export const List = styled.ul`
  padding: 0;
  margin: 0;
`;

export const ListElement = styled.li`
  height: 100vh;
  scroll-snap-align: start;
  background-color: #031d44;
  align-items: center;

  &:nth-child(odd) {
    background-color: #0c7c59;
  }

  &:nth-child(even) {
    background-color: #58a4b0;

    div:first-child {
      flex-direction: row-reverse;
    }
  }
`;
