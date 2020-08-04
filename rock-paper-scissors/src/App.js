import React from 'react';

const RockPaperScissorsGame = () =>{
  return (
    <div>hello to the game
        <Score></Score>
        <GameOptions></GameOptions>
        <Rules></Rules>
    </div>
  );
}
const GameOptions = () => {
  return(
    <div>select me</div>
  );
}

const Score = () => {
  return(
    <div>This is the score</div>
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
