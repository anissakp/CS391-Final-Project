import {useEffect, useState} from "react";
import {Button} from "../components/Button.jsx";
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 96%;
    padding: 2%;
    margin: auto;
`

const StyledHeader = styled.h1`
    font-size: calc(2vw + 3vmin);
    margin: auto;
    text-align: center;
    width: 100%;
`

const StyledList = styled.ul`
    list-style-type: none;
    padding: 0;
`

const StyledButton = styled(Button)`
    width: 98%;
`

export default function HomePage(){
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('https://api.artic.edu/api/v1/artworks');
                const data = await response.json();
                const artistNames = extractArtistNames(data);
                setArtists(artistNames);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, []);

    const extractArtistNames = (data) => {
        const artistNames = data.data.map((artwork) => artwork.artist_title);
        // so that there are no duplicate artists
        return Array.from(new Set(artistNames));
    };

    return (
        <StyledDiv>
            <StyledHeader>Artists</StyledHeader>
            <StyledList>
                {artists.map((artist, index) => (
                    <li><StyledButton key={index}>{artist}</StyledButton></li>
                ))}
            </StyledList>
        </StyledDiv>
    );
}