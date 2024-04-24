// Margo
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import styled from "styled-components";

// Styled div component for the whole page to ensure even padding and centering
const StyledDiv=styled.div`
    margin: auto;
    text-align: center;
    padding: 1% 5%;
`

// Styled component for the description of the artist
const StyledDiv2=styled.div`
    margin: auto;
    text-align: left; // want paragraph on the left
    h3 {
        text-align: center; // want header in the center
    }
    width: 70%; 
    @media screen and (max-width: 700px) {
        width: 90%;
    }
    padding: 0 1%;
    border: #333 solid 2px;
    visibility: ${props => props.visibility}; // conditional visibility styling for whe there isn't an artist description
`

export default function ArtistPage() {
    const [artist,setArtist]=useState([]) // stores artist data
    const { id } = useParams(); // extracts 'id' from the URL

    useEffect(()=>{
        async function fetchData() {
            try {
                const raw = await fetch(`https://api.artic.edu/api/v1/artists/${id}`);
                const responseData = await raw.json();
                console.log("Response from API:", responseData);
                const { data } = responseData;
                if (data) {
                    setArtist(data);
                    console.log("Data fetched successfully:", data);
                } else {
                    console.log("No artist data found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    },[id]); // so that data is re-fetched when passed a new id
    return (
        <StyledDiv>
            <h1>{artist.title}</h1>
            <div className="artist-info">
                <h3>Birth date:</h3>
                {artist.birth_date ? (
                    <p>{artist.birth_date}</p> // Display birth date if available
                ) : (
                    <p>{artist.title} birth date is unknown</p> // Fallback text if birth date is missing
                )}
                <h3>Death date: </h3>
                {artist.death_date ? (
                    <p>{artist.death_date}</p> // Display death date if available
                ) : (
                    <p>{artist.title} is still alive or death date is unknown</p> // Fallback text if death date is missing
                )}
                {/* Conditionally render this section only if a description exists */}
                <StyledDiv2 visibility={artist.description ? "visible" : "hidden"}>
                    <h3>About:</h3>
                    {artist.description && (
                        <div dangerouslySetInnerHTML={{ __html: artist.description }} /> // Since description is a string and that string has HTML in it, this takes the HTML formatting into account
                    )}
                </StyledDiv2>
            </div>
        </StyledDiv>
    );
}

ArtistPage.propTypes = {
    id: PropTypes.string.isRequired,
};