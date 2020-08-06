import React, { useState } from 'react';
import styled from 'styled-components';

const GameOption = styled.div`
font-size: 2em;

.option{
  background: lightblue;
  width: 210px;
  height: 210px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; 
}

.scissors{
  background-color: #f6f94e;
}

.rock{
  background-color: pink;
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
const Option = ({setUserPick, option}) => {
    
    function optionClickHandler(event){
        console.log(event.target);
        console.log("clicked", event.target.innerText);
        setUserPick(event.target.innerText);
    }
    return(
        <GameOption className={`${option}-wrapper`} onClick={optionClickHandler}>
        <div className={`option ${option}`}>{option}</div>
        </GameOption>
    )
}
  
  
const GameOptions = ({setGameScore, getHousePick}) => {
    const [userPick, setUserPick] = useState(null);

    console.log("initial", userPick);
    // const gameOptions = ['🖐', '✌️', '✊'];
    const gameOptionsText = ['paper', 'scissors', 'rock'];
    const housePick = getHousePick(gameOptionsText);
    console.log("housepick", housePick);

    const pickedGameOptions = [userPick, housePick];

    return(
        <OptionsLayout>
            {userPick === null && gameOptionsText.map((option) => { return <Option setUserPick={setUserPick} option={option}></Option>})}
            {userPick !== null && pickedGameOptions.map(option => { return <Option option={option}></Option>} )}
        </OptionsLayout>
    )
}

export default GameOptions;