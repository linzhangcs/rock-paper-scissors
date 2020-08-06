import React, { useState } from 'react';
import styled from 'styled-components';

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

const Score = ({score}) => {
    console.log(score)
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

  export default Score;