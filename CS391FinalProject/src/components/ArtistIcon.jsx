// Margo

// a fun icon for the Artist Page so that there is a graphic, api doesn't have any images associated with artists
// making it a component, so it can easily be called multiple times!
import styled from "styled-components";
import icon from '../assets/icon.png';

const StyledImage = styled.img`
    width: 40px;
`;

export default function ArtistIcon() {
    return (
        <StyledImage src={icon} alt="Artist Icon" />
    );
}