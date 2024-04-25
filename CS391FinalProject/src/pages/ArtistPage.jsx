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
    width: 60%;
    @media screen and (max-width: 1200px) {
        width: 75%;
    }
    @media screen and (max-width: 700px) {
        width: 90%;
    }
    padding: 0 1%;
    visibility: ${props => props.visibility}; // conditional visibility styling for whe there isn't an artist description
`

// Styled component for the artworks of this artist
const StyledArtworks=styled.div`
    border-top: #333 solid 1px;
    display: grid;
    grid-template-columns: repeat(2, 1fr); // two columns for smaller screens
    @media screen and (min-width: 800px) {
        grid-template-columns: repeat(3, 1fr); // three columns when a bit larger
    }
    @media screen and (min-width: 1250px) {
        grid-template-columns: repeat(4, 1fr); // four columns when largest
    }
    gap: 20px;
    padding: 1% 4%;
`

// Styled component for each image
const StyledImage=styled.img`
    width: 100%; // same width for all images, 100% of the parent which is StyledArtworks
`

export default function ArtistPage() {
    const { id } = useParams(); // extracts 'id' from the URL

    const [artist,setArtist]=useState([]) // stores artist info
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function fetchInfo() {
            try {
                console.log("Fetching info for artist ID:", id); // check the current id
                const raw = await fetch(`https://api.artic.edu/api/v1/artists/${id}`);
                const responseData = await raw.json();
                console.log("Response from API:", responseData);
                const { data } = responseData;
                if (data) {
                    setArtist(data);
                    setLoading(false);
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

    const [artworks, setArtworks]=useState([]) // stores info of this artist's artworks
    useEffect(()=>{
        async function fetchArtworks() {
            try {
                const raw = await fetch(`https://api.artic.edu/api/v1/artworks/?limit=12`); // fetching 12 because it fits evenly into 2,3, and 4 columns
                const responseData = await raw.json();
                console.log("Response from API:", responseData);
                const { data } = responseData;
                if (data) {
                    setArtworks(data);
                    console.log("Data fetched successfully:", data);
                } else {
                    console.log("No artist data found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchArtworks();
    },[]);

    return (
        <>
            {loading ? (
                <StyledDiv>Artist is loading...</StyledDiv>
            ) : (
                <StyledDiv>
                    {artist.title ? (
                        <>
                            <h1>{artist.title}</h1>
                            <div className="artist-info">
                                {/*handling all possible cases of birth_date and death_date being null: */}
                                {artist.birth_date && artist.death_date ? (
                                    <p>{artist.birth_date}-{artist.death_date}</p>
                                ) : artist.birth_date ? (
                                    <p>{artist.title} was born in {artist.birth_date}</p>
                                ) : artist.death_date ? (
                                    <p>{artist.title} passed away in {artist.death_date}, no information is available on
                                        the year of their birth</p>
                                ) : (
                                    <p>There is no information on the birth or death years of {artist.title}</p>
                                )}
                                {/* Conditionally render this section only if a description exists: */}
                                <StyledDiv2 visibility={artist.description ? "visible" : "hidden"}>
                                    {artist.description && (
                                        <div dangerouslySetInnerHTML={{__html: artist.description}}/> // Since description is a string and that string has HTML in it, this takes the HTML formatting into account
                                    )}
                                </StyledDiv2>
                                {/*displays 12 pieces of art in the gallery, not specific to the current artist because of a bug in the api*/}
                                <StyledArtworks>
                                    {artworks.map((artwork) => (
                                        <>
                                            <div key={artwork.id}>
                                                <StyledImage
                                                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`}
                                                    alt={artwork.title}/>
                                            </div>
                                        </>
                                    ))}
                                </StyledArtworks>
                            </div>
                        </>
                    ) : (
                        <p>Sorry, there is no more information available on this artist.</p> // to handle when artist title and all info is null
                    )}
                </StyledDiv>
            )}
        </>
    );
}

ArtistPage.propTypes = {
    id: PropTypes.string.isRequired,
};