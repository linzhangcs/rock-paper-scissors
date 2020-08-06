import React, { useState } from 'react';
import styled from 'styled-components';
import GameOptions from './components/GameOptioins';
import Score from './components/Score';

const GameLayout = styled.div`
      box-sizing: border-box;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 30px 0; 
    `;

const RockPaperScissorsGame = () =>{
    const [gameScore, setGameScore] = useState(0);

    function generateHousePick(options){
      const randomIndex = Math.floor(Math.random()*(options.length-1));
      return options[randomIndex];
    }
      return (
      <GameLayout>
          <Score score = { gameScore }></Score>
          <GameOptions setGameScore = { setGameScore } getHousePick = {generateHousePick} ></GameOptions>
          <Rules></Rules>
      </GameLayout>
    );
  }
  
  export default RockPaperScissorsGame;
  
  const RuleButton = styled.button`
    align-self:center;
  `;
  const Rules = () => {
    return(
      <RuleButton>rules</RuleButton>
    );
  }

