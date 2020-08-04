import React, {useState} from 'react';
import './App.css';
import styled from 'styled-components';

const RockPaperScissorsGame = () =>{

  const GameLayout = styled.div`
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0; 
  `;
  return (
    <GameLayout>
        <Score></Score>
        <GameOptions></GameOptions>
        <Rules></Rules>
    </GameLayout>
  );
}

const Option = ({option}) => {
  const GameOption = styled.div`
    // font-size: 5em;
    // text-stroke: 3px black;
    .option-wrapper{
      background: lightblue;
      width: 210px;
      height: 210px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;  
    }
  `;
  function optionClickHandler(event){
    console.log(event.target);
    console.log("clicked", event.target.innerText);
  }
  return(
    <GameOption className={option} onClick={optionClickHandler}>
      <div className="option-wrapper">{option}</div>
    </GameOption>
  )
}

const OptionsLayout = styled.div`
  display: flex;
  width: 500px;
  flex-wrap: wrap;
  margin-top: 60px;
  justify-content: space-between;

  .rock{
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;
const GameOptions = () => {
  // const gameOptions = ['🖐', '✌️', '✊'];
  const gameOptionsText = ['paper', 'scissors', 'rock'];
  const options = gameOptionsText.map((option) => <Option option={option}></Option>);
  return(
    <OptionsLayout>
      {gameOptionsText.map((option) => { return <Option option={option}></Option>})}
    </OptionsLayout>
  )
}

const Score = () => {
  const [score, setScore] = useState(0);

  const ScoreContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 705px;
    border: 2px solid black;
    border-radius: 15px;
    padding: 30px 40px;
    
    .game-title{
      text-transform: uppercase;
      font-size: 2.5em;
      font-weight: 700;
      p{
        margin: -18px;
      }
    }
  `;

  return(
    <ScoreContainer>
      <div className="game-title">
        <p>rock</p>
        <p>paper</p>
        <p>scissors</p>
      </div>
      <div>{score}</div>
    </ScoreContainer>
  );
}

const Rules = () => {
  return(
    <div>rules</div>
  );
}
function App() {
  return (
    <RockPaperScissorsGame/>
  );
}

export default App;
