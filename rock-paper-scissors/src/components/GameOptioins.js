import React, { useState } from 'react';
import styled from 'styled-components';
import {colors, options} from '../styles/global';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import scissors from '../images/icon-scissors.svg';

const GameOption = styled.div`
font-size: 2em;

.option{
  background-color: ${colors.grey};
  border: 20px solid ${options.paperGradientOne};
  width: 180px;
  height: 180px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; 
  
  img{
      width: 40%;

  }
}

.scissors{
    border: 20px solid ${options.scissorsGradientOne};
}

.rock{
    border: 20px solid ${options.rockGradientOne};
}
`;

const OptionsLayout = styled.div`
    display: flex;
    width: 500px;
    flex-wrap: wrap;
    margin-top: 60px;
    justify-content: space-between;
    .rock-wrapper{
      flex-basis: 100%;
      display: flex;
      justify-content: center;
    }
  `;

const Option = ({onClick, option, bg}) => {
    return(
        <GameOption className={`${option}-wrapper`} data-option={option} onClick={(event => onClick(event))}>
        <div className={`option ${option}`} data-option={option}>
            <img src={bg} data-option={option}/>
        </div>
        </GameOption>
    )
}
  
  
const GameOptions = ({onClick, housePick, userPick, gameOptions}) => {
    let pickedGameOptions = undefined;
    if(userPick !== null){
        const userPickBg = gameOptions.filter(option => option.text === userPick)[0].bg;
        const housePickBg = gameOptions.filter(option => option.text === housePick)[0].bg;    

        pickedGameOptions= [
            {
                text: userPick,
                bg: userPickBg
            },{
                text: housePick,
                bg: housePickBg
            }];

            if(userPick !== null){
            console.log(pickedGameOptions);
        }
    }
    return(
        <OptionsLayout>
            {userPick === null && gameOptions.map((option) => { return <Option onClick={(event) => onClick(event)} option={option.text} bg={option.bg}></Option>})}
            {userPick !== null && pickedGameOptions.map(option => { return <Option option={option.text} bg={option.bg}></Option>} )}
        </OptionsLayout>
    )
}

export default GameOptions;