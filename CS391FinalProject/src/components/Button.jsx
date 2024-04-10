import styled from 'styled-components';

export const Button=styled.button`
    font-size: calc(1vw + 2vmin);
    border: 2px solid black;
    padding: 1% 2%;
    margin: 1%;
    cursor: pointer;
    color: white;
    background: black;
    border-radius: 10px;
    &:hover{
        color: black;
        background-color: white;
        border: 2px solid black;
    }
`