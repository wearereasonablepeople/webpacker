import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  background: #ccc;
`;

class Container extends React.Component {
  render() {
    return <div>Hello to you<Button>Click</Button></div>;
  }
}

export default Container;
