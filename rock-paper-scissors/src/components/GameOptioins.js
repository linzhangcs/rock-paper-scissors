import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {colors, options} from '../styles/global';
import {Button} from '../styles/elements';
import paper from '../images/icon-paper.svg';
import rock from '../images/icon-rock.svg';
import scissors from '../images/icon-scissors.svg';

const GameOption = styled.div`
font-size: 2em;
transition: all 800ms ease;

.option{
  background: linear-gradient(180deg, ${options.paperGradientOne}, ${options.paperGradientTwo});
  width: 206px;
  height: 206px;
  margin-bottom: 2em;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 10px ${options.paperShadow};
  transition: all 800ms ease;
  .icon-wrapper{
      width: 80%;
      height: 80%;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;     
      background: linear-gradient(0, ${options.backgroundOne}, ${options.backgroundTwo});
      box-shadow: inset 0px 10px ${options.greyShadow};
      transition: all 800ms ease;

      &:hover{
        box-shadow: inset 0px 0px ${options.greyShadow};
      }
  }
  &:hover{
    box-shadow: 0 0 0 32px rgba(80, 80, 80, 0.7);
  }
  img{
      width: 40%;
  }
}

.scissors{
    background: linear-gradient(180deg, ${options.scissorsGradientOne}, ${options.scissorsGradientTwo});
    box-shadow: 0px 10px ${options.scissorsShadow};
}

.rock{
    background: linear-gradient(180deg, ${options.rockGradientOne}, ${options.rockGradientTwo});
    box-shadow: 0px 10px ${options.rockShadow};
}
`;

const OptionsLayout = styled.div`
    display: flex;
    width: 500px;
    flex-wrap: wrap;
    margin-top: 60px;
    justify-content: space-between;
    transition: all 1s ease;

    .rock-wrapper{
      flex-basis: 100%;
      display: flex;
      justify-content: center;
    }
  `;
const highlight = keyframes`
    10%{
        width: calc(100% + 50px);
    height: calc(100% + 50px);
    }
    50%{
    width: calc(100% + 150px);
    height: calc(100% + 150px);
    }
    100%{
    width: calc(100% + 280px);
    height: calc(100% + 280px);
    }
 `;
const OptionsSelectedLayout = styled(OptionsLayout)`
    width: 1000px;
    text-align: center;
    align-items: center;

    .userpick-option{
        order: 1;
    }

   .replay-section{
        order: 2;
        flex-basis: 300px
    }

    .housepick-option{
        order: 3;
    }

    .rock-wrapper{
        flex-basis: auto;
        text-align: center;
      }
    
    .winning-highlight{
        position: relative;
        background-color: grey;
    }
    .winning-highlight:before{
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        background: radial-gradient(circle at center, pink 0% 35%, lightblue 35% 50%, var(--dark-green) 50% 90%, black 90% 100%);
        width: 100%;
        height: 100%;
        z-index: -1;
        transform: translate(-50%, -50%);
        animation: ${highlight} 1s linear forwards;
    }

    p{
        color: ${colors.white};
        text-transform: uppercase;
        font-size: 3em;
        letter-spacing: 2px;
        margin-bottom: 20px;
    }
    button{
        margin: 0 auto;
    }
`;

const SelectedGameOption = styled(GameOption)`
    display: flex;
    flex-direction: column;
    justify-cotent: flex-start;

    p{
        color: ${colors.white};
        font-size: 0.5em;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 60px;
    }
    .option{
        text-align: center;
        width: 280px;
        height: 280px;
        .icon-wrapper{
            cursor: default;
        }
    }
`;
const Option = ({onClick, option, bg}) => {
    return(
        <GameOption className={`${option}-wrapper`} data-option={option} onClick={(event => onClick(event))}>
        <div className={`option ${option}`} data-option={option}>
            <div className="icon-wrapper" data-option={option}>
                <img src={bg} data-option={option}/>
            </div>
        </div>
        </GameOption>
    )
}

 const SelectedOption = ({className, title, option, bg, result}) => {
     let classNameList = className;
    if((title === 'you picked' &&  result === 'you win') || (title === 'the house picked' &&  result === 'you lose')) {
        classNameList += ' winning-highlight';
    } 
    return(
        <SelectedGameOption className={`${option}-wrapper ${className}`} data-option={option}>
        <p>{title}</p>
        <div className={`option ${option} ${classNameList}`} data-option={option}>
            <div className="icon-wrapper" data-option={option}>
                <img src={bg} data-option={option}/>
            </div>
        </div>
        </SelectedGameOption>
    )
 }
const GameOptions = ({onClick, housePick, userPick, loading, replayClick, result, gameOptions}) => {
    let pickedGameOptions = undefined;
    console.log('gameoptions', housePick);

    if(userPick !== null){
        console.log('gameoptions', housePick);
        const userPickBg = gameOptions.filter(option => option.text === userPick)[0].bg;
        let housePickBg = housePick === null ? '' : gameOptions.filter(option => option.text === housePick)[0].bg;    
        console.log("loading", loading);

        pickedGameOptions= [
            {   
                title: "you picked",
                class: "userpick-options",
                text: userPick,
                bg: userPickBg
            },{
                title: "the house picked",
                class: "housepick-option",
                text: housePick,
                bg: housePickBg
            }];

            if(userPick !== null){
            console.log(pickedGameOptions);
        }
    }
        if(userPick === null){
            return(
                <OptionsLayout>
                    {gameOptions.map((option) => { return <Option onClick={(event) => onClick(event)} option={option.text} bg={option.bg}></Option>})}
                </OptionsLayout>
            )        
        }else{
            return(
                <OptionsSelectedLayout>
                    {pickedGameOptions.map((option, index) => <SelectedOption className={option.class} title={option.title} option={option.text} bg={option.bg} result={result}></SelectedOption>)}
                    {!loading && <div className="replay-section"><p>{result}</p><Button onClick={(event) =>replayClick(event)}>play again</Button></div>}
                </OptionsSelectedLayout>
            )
        }
    }

export default GameOptions;