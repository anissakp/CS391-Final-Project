// Margo Miller: ArtistPage.jsx
// API: https://api.artic.edu/api/v1/artists/${id}

// the artist page renders information about a specific artist,
// it uses LifeSpan.jsx component to display an artist's life span
import { useParams } from 'react-router-dom';
import LifeSpan from "../components/LifeSpan.jsx";
import {useEffect, useState} from "react";
import styled from "styled-components";

// styled div component for the whole page to ensure even padding and centering
const StyledArtistContainer=styled.div`
    margin: auto;
    text-align: center;
    padding: 1% 5%;
`

// styled component for the description of the artist
const StyledDescription=styled.div`
    margin: auto;
    width: 60%;
    @media screen and (max-width: 1200px) {
        width: 75%;
    }
    @media screen and (max-width: 700px) {
        width: 90%;
    }
    padding: 0 1%;
    visibility: ${props => props.visibility}; // conditional visibility styling for when there isn't an artist description
`

export default function ArtistPage() {
    const { id } = useParams(); // extracts 'id' from the URL

    const [artist,setArtist]=useState([]) // stores artist info
    const [loading,setLoading]=useState(true) // stores loading info

    useEffect(()=>{
        async function fetchInfo() { // for fetching an artist from the API
            try {
                const raw = await fetch(`https://api.artic.edu/api/v1/artists/${id}`);
                const responseData = await raw.json();
                console.log("Response from API:", responseData);
                const { data } = responseData;
                if (data) {
                    setLoading(false);
                    setArtist(data);
                    console.log("Data fetched successfully:", data);
                } else {
                    console.log("No artist data found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchInfo();
    },[id]); // so that data is re-fetched when passed a new id

    return (
        <>
            {artist.title && !loading ? (
                <>
                    <StyledArtistContainer>
                        <h1>{artist.title}</h1>
                        {/* Life span component uses Flippy */}
                        <LifeSpan
                            name={artist.title}
                            birth={artist.birth_date}
                            death={artist.death_date}
                        />
                        {/* Conditionally render this section only if a description exists: */}
                        <StyledDescription visibility={artist.description ? "visible" : "hidden"}>
                            {artist.description && (
                                <div dangerouslySetInnerHTML={{__html: artist.description}}></div> // since description is a string and that string has HTML in it, this takes the HTML formatting into account
                            )}
                        </StyledDescription>
                    </StyledArtistContainer>
                </>
            ) : (
                <p>Artist is loading...</p>
            )}
        </>
    );
}