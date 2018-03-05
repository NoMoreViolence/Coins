import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
// 검색 시
import Select from './components/Select/Select';
// 검색 바
import List from './components/List/List';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Switch>
            <Route path="/:CoinName" component={Select} />
            <Route path="/" component={List} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
//           <Route path="/:coin" component={Select} />
export default App;
