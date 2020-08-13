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
      padding: 46px 0 30px; 
    `;

const RockPaperScissorsGame = () =>{
    const [gameScore, setGameScore] = useState(12);
    const [userPick, setUserPick] = useState(null);
    const [housePick, setHousePick] = useState(null);
    const [waitingForHousePick, setWaitingForHousePick] = useState(true);
    const [waitingForScoreUpdate, setWaitingForScoreUpdate] = useState(true);
    const [waitingForUserPick, setWaitingForUserPick] = useState(true);
    const WAITINGDURATION = 1000;

    const gameOptions = [
      {text: 'paper', bg: paper}, 
      {text: 'scissors', bg: scissors}, 
      {text: 'rock', bg: rock}];

    function generateHousePick(options){
      const randomIndex = Math.floor(Math.random()*(options.length));
      return options[randomIndex];
    }

    function replayClickHandler(event){
      // console.log(event.target);
      //reset Game
      setUserPick(null);
      setHousePick(null);
      setWaitingForUserPick(true);
      setWaitingForHousePick(true);
      setWaitingForScoreUpdate(true);
    }

    function optionClickHandler(event){
      console.log(event.target);
      const userOption = event.target.dataset.option;
      console.log("clicked", userOption);
      // setUserPick(userOption);
      setTimeout(() => setUserPick(userOption), WAITINGDURATION/2);
      setTimeout(() => {setHousePick(generateHousePick(gameOptions.map(option => option.text)))}, WAITINGDURATION);
    }

    useEffect(() => {
      console.log("userPick UPDATED!!!");
      console.log(userPick);
      setWaitingForUserPick(false);
    }, [userPick]);


    useEffect(() => {
      console.log("housePicked UPDATED!!!")
      setWaitingForHousePick(false);
      setTimeout(() => setGameScore(getGameScore(userPick, housePick)), WAITINGDURATION);
      if(housePick === userPick){
        // setTimeout(()=> {console.log("Draw!!!"); setWaitingForScoreUpdate(false)}, WAITINGDURATION);
      }
    }, [housePick]);

    useEffect(() => {
      console.log("gameScore UPDATED!!!")
      if(gameScore != 12){
        setTimeout(()=>setWaitingForScoreUpdate(false), 1000);
      }
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
            loading = {waitingForScoreUpdate}
            replayClick = {(event) => replayClickHandler(event)}
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

