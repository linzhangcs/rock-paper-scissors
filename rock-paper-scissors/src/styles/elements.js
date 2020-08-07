import styled, {css} from 'styled-components';
import {colors} from '../styles/global';

export const Button = styled.button`
    padding: 15px 58px;
    border-radius: 10px;
    background-color: ${colors.grey};
    color: ${colors.darkText};
    text-transform: uppercase;
    font-family: 'Barlow Semi Condensed', sans-serif;
    letter-spacing: 2px;
    font-weight: 700;
    font-size: 1em;
    border-style: none;
    cursor: pointer;
    
    ${props => props.outline && css`
        padding: 12px 40px;
        color: ${colors.grey};
        background-color: transparent;
        border: 2px solid ${colors.grey};
    `}
`;

