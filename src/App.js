import React, { Component } from 'react';
import styled from 'styled-components';
import Search from './components/Search/Search';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
class App extends Component {
  render() {
    return (
      <Container>
        <Search />
      </Container>
    );
  }
}

export default App;
