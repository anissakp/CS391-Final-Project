// Margo
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import styled from "styled-components";

const StyledDiv=styled.div`
    margin: auto;
    justify-content: center;
`

export default function ArtistPage() {
    
    const [artist,setArtist]=useState([])
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
    },[id]);
    return (
        <>
            <h1>{artist.title}</h1>

            <StyledDiv className="artist-info">
                <h3>Birth date:</h3>
                {artist.birth_date ? (
                    <p>{artist.birth_date}</p>
                ) : (
                    <p>{artist.title} birth date is unknown</p>
                )}
                <h3>Death date: </h3>
                {artist.death_date ? (
                    <p>{artist.death_date}</p>
                ) : (
                    <p>{artist.title} is still alive or death date is unknown</p>
                )}
                <h3>About:</h3>
                {artist.description && (
                    <div dangerouslySetInnerHTML={{ __html: artist.description }} />
                )}
            </StyledDiv>
        </>
    );
}

ArtistPage.propTypes = {
    id: PropTypes.string.isRequired,
};
