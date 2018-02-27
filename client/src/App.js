import React, { Component } from 'react';
import styled from 'styled-components';
import Search from './components/Search/Search';
import Result from './components/Result/Result';

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
        <Result />
      </Container>
    );
  }
}

export default App;
