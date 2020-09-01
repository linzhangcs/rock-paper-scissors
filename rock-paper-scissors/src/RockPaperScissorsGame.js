import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import GameOptions from './components/GameOptioins';
import Score from './components/Score';
import {colors} from './styles/global';
import {Button} from './styles/elements';

import paper from './images/icon-paper.svg';
import rock from './images/icon-rock.svg';
import scissors from './images/icon-scissors.svg';

import rules from './images/image-rules.svg';
import close from './images/icon-close.svg';

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
    const [result, setResult] = useState(null);
    const [waitingForHousePick, setWaitingForHousePick] = useState(true);
    const [waitingForScoreUpdate, setWaitingForScoreUpdate] = useState(true);
    const [waitingForUserPick, setWaitingForUserPick] = useState(true);
    const WAITINGDURATION = 1000;
    const isMounted = useMounted();

    const gameOptions = [
      {text: 'paper', bg: paper}, 
      {text: 'scissors', bg: scissors}, 
      {text: 'rock', bg: rock}];

    function generateHousePick(options){
      const randomIndex = Math.floor(Math.random()*(options.length));
      return options[randomIndex];
    }
    function useMounted(){
      const [isMounted, setIsMounted] = useState(false);
      useEffect(() => {
        setIsMounted(true);
      },[]);
      return isMounted;
    }
    function replayClickHandler(event){
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
      if(isMounted){
        console.log("userPick UPDATED!!!");
        console.log(userPick);
        setWaitingForUserPick(false);
      }
    }, [userPick]);


    useEffect(() => {
      if(isMounted){
        console.log("mounted!");
        console.log("housePicked UPDATED!!!")
        setWaitingForHousePick(false);
        setTimeout(() => {
          setGameScore(getGameScore(userPick, housePick));
          const delta = getGameScoreDelta(userPick, housePick);
          if(delta === 0){
            setResult("draw");
            setWaitingForScoreUpdate(false);
          }else{
            const re = delta > 0 ? "you win" : "you lose";
            setResult(re);
          }
        }, WAITINGDURATION);
      }
    }, [housePick]);

    useEffect(() => {
      if(isMounted){
        console.log("gameScore UPDATED!!!");
        setTimeout(()=>setWaitingForScoreUpdate(false), 0);  
      }
    }, [gameScore]);

    function getGameScoreDelta(userPick, housePick){
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
      return delta;
    }

    function getGameScore(userPick, housePick){
      return gameScore + getGameScoreDelta(userPick, housePick);
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
            result = {result}
            replayClick = {(event) => replayClickHandler(event)}
            gameOptions = {gameOptions} ></GameOptions>
        </GameLayout>
        <Rules></Rules>
      </>
    );
  }
  
  export default RockPaperScissorsGame;

  const RuleLayout = styled.div`
    .button-position{
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
  `;
  const Modal = styled.div`
    visibility: ${(props) => props.show};
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.modalbackground};
    .modal-content{
      width: 400px;
      height: 416px;
      box-sizing: border-box;
      padding: 30px 35px;
      text-transform: uppercase;
      border-radius: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: ${colors.white};
      color: ${colors.darkText};
      h3{
        font-size: 2em;
        padding: 0;
        margin: 0;
      }
      h3 + img{
        width: 20px;
        height: 20px;
        align-self: center;
        cursor:pointer;
      }
    }
    .rules{
      flex-basis: 100%;
      margin-top: 30px;
      text-align: center;
      img{
        width:90%;
      }
    }
  `;
  const Rules = () => {
    const [showModal, setShowModal] = useState("hidden");

    function showRulesHandler(event){
      console.log(event.target);
      const showHide = showModal === 'hidden' ? 'visible' : 'hidden';
      setShowModal(showHide);
    }
    return(
      <RuleLayout>
        <Modal show={showModal} onClick={showRulesHandler}>
          <div className="modal-content">
            <h3>rules</h3>
            <img src={close} alt="close modal"/>
            <div className="rules">
              <img src={rules} alt="game rules"/>
            </div>
          </div>
        </Modal>
        <Button outline className="button-position" onClick={showRulesHandler}>rules</Button>
      </RuleLayout>
    );
  }

