// Margo and Anissa
import styled from "styled-components";

export const ArtworkDiv=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3%;
    border-radius: 10px;
    background: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0.2);
    }
`
