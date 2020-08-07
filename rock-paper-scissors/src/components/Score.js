import React, { useState } from 'react';
import styled from 'styled-components';
import {colors} from '../styles/global';

const ScoreContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 705px;
    border: 3px solid ${colors.headerOutline};
    border-radius: 12px;
    padding: 20px 30px 20px 40px;
    color: ${colors.white};

    .game-title{
    text-transform: uppercase;
    font-size: 2.5em;
    font-weight: 700;
    p{
        margin: -18px;
    }
    }
`;

const ScoreBoard = styled.div`
    background: ${colors.white};
    width: 150px;
    height: 115px;
    border-radius: 12px;
    color: ${colors.darkText};
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .score-title{
        color: ${colors.scoreText};
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    .score{
        font-size: 4em;
        font-weight: 700;
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
        <ScoreBoard>
            <div className="score-title">score</div>
            <div className="score">{score}</div>
        </ScoreBoard>
      </ScoreContainer>
    );
  }

  export default Score;