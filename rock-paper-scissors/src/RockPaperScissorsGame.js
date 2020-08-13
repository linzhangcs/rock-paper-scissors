import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameOptions from './components/GameOptioins';
import Score from './components/Score';
import {colors} from './styles/global';
import {Button} from './styles/elements';

import paper from './images/icon-paper.svg';
import rock from './images/icon-rock.svg';
import scissors from './images/icon-scissors.svg';

const GameLayout = styled.div`
      box-sizing: border-box;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px 0; 
    `;

const RockPaperScissorsGame = () =>{
    const [gameScore, setGameScore] = useState(12);
    const [userPick, setUserPick] = useState(null);
    const [housePick, setHousePick] = useState(null);
    const [waitingForHousePick, setWaitingForHousePick] = useState(true);
    const [waitingForScoreUpdate, setWaitingForScoreUpdate] = useState(true);

    const gameOptions = [
      {text: 'paper', bg: paper}, 
      {text: 'scissors', bg: scissors}, 
      {text: 'rock', bg: rock}];

    function generateHousePick(options){
      const randomIndex = Math.floor(Math.random()*(options.length));
      return options[randomIndex];
    }

    function optionClickHandler(event){
      console.log(event.target);
      const userOption = event.target.dataset.option;
      console.log("clicked", userOption);
      setUserPick(userOption);
      setTimeout(() => {setHousePick(generateHousePick(gameOptions.map(option => option.text)))}, 1000);
    }
    
    useEffect(() => {
      console.log("userPick UPDATED!!!");
      console.log(userPick);
    }, [userPick]);


    useEffect(() => {
      console.log("housePicked UPDATED!!!")
      setWaitingForHousePick(false);
      setTimeout(() => setGameScore(getGameScore(userPick, housePick)), 1000);
      if(housePick === userPick){
        setTimeout(()=> {console.log("Draw!!!"); setWaitingForScoreUpdate(false)}, 1000);
      }
    }, [housePick]);

    useEffect(() => {
      console.log("gameScore UPDATED!!!")
      setWaitingForScoreUpdate(false);
    }, [gameScore]);

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
      <>
      <GameLayout>
          <Score score = { gameScore }></Score>
          <GameOptions  
           onClick= {(event) => optionClickHandler(event)} 
           userPick = {userPick}
           housePick = {housePick}
           gameOptions = {gameOptions} ></GameOptions>
      </GameLayout>
      <Rules></Rules>
      </>
    );
  }
  
  export default RockPaperScissorsGame;

  const RuleLayout = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
  `;
  const Rules = () => {
    return(
      // <Button>play again</Button>
      <RuleLayout>
        <Button outline>rules</Button>
      </RuleLayout>
    );
  }

