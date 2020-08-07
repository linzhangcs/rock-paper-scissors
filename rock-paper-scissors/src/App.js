import React from 'react';
import './App.css';
import RockPaperScissorsGame from './RockPaperScissorsGame';
import styled from 'styled-components';
import {colors} from './styles/global';
const Background = styled.div`
  height: 100vh;
  background: radial-gradient(circle at top, ${colors.backgroundOne} 18%, ${colors.backgroundTwo} 60%);
`;
function App() {
  return (
    <Background>
      <RockPaperScissorsGame/>
    </Background>
  );
}

export default App;
