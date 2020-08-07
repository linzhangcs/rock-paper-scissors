import React, { useState, useEffect } from 'react';
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
    const [userPick, setUserPick] = useState(null);
    const [housePick, setHousePick] = useState(null);

    const gameOptionsText = ['paper', 'scissors', 'rock'];

    function generateHousePick(options){
      const randomIndex = Math.floor(Math.random()*(options.length));
      return options[randomIndex];
    }

    function optionClickHandler(event){
      console.log(event.target);
      console.log("clicked", event.target.innerText);
      setHousePick(generateHousePick(gameOptionsText));
      setUserPick(event.target.innerText);
    }

    useEffect(() => {
      console.log("UPDATED!!!")
      setGameScore(getGameScore(userPick, housePick));
    }, [userPick, housePick]);

    function getGameScore(userPick, housePick){
      let delta = 0;
      switch(userPick){
        case "paper": 
          if(housePick === 'scissors'){
            delta = -1;
          }else if(housePick === 'rock'){
            delta = 1;
          }
        break;
        case "rock": 
        if(housePick === 'paper'){
          delta = -1;
        }else if(housePick === 'scissors'){
          delta = 1;
        }
        break;
        case "scissors": 
        if(housePick === 'rock'){
          delta = -1;
        }else if(housePick === 'paper'){
          delta = 1;
        }
        break;
      }
      return gameScore + delta;
    }

    return (
      <GameLayout>
          <Score score = { gameScore }></Score>
          <GameOptions  
           onClick= {(event) => optionClickHandler(event)} 
           userPick = {userPick}
           housePick = {housePick}
           gameOptionsText = {gameOptionsText} ></GameOptions>
          {/* <Rules></Rules> */}
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

