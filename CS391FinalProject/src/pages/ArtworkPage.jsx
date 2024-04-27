// Ana: send "artist_id" to ArtistPage
// API: https://api.artic.edu/api/v1/artworks/{id}
import {useEffect,useState} from "react";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import SimplePopup from "./SimplePopup.jsx";

const Title=styled.h1`
    text-align: center;
    font-size: 34px;
    margin-bottom: 20px;
`;
const ArtworkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; // vertical
    margin: 10px auto;
    max-width: 800px; // Limit the width for better readability and organization
    padding: 20px;
    border: 3px solid #b50235; //pretty border
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
`;

const ArtistLink = styled.a`
    color: #b50235;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const BoldText = styled.span`
    font-weight: bold;
`;

export default function ArtworkPage(){
    const [artwork, setArtwork]=useState([])
    const { id } = useParams(); // extracts 'id' from the URL

    useEffect(()=>{
        async function fetchData() {
            try {
                const raw = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
                const responseData = await raw.json();
                console.log("Response from API:", responseData);

                const { data } = responseData;
                if (data) {
                    setArtwork(data);
                    console.log("Data fetched successfully:", data);
                } else {
                    console.log("No artwork data found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    },[id]);
    return (
        <>
            <Title>{artwork.title}</Title>
            <ArtworkContainer>

                <p><BoldText>Artist:</BoldText>
                    <ArtistLink href={`/artist/${artwork.artist_id}`}>{artwork.artist_display}</ArtistLink>
                </p>
                <p><BoldText>Medium:</BoldText> {artwork.medium_display}</p>
                <p><BoldText>Dimensions:</BoldText>{artwork.dimensions}</p>
                 <img
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`}
                    alt={artwork.title}
                />

                <SimplePopup date={artwork.date_display} />

            </ArtworkContainer>


        </>
    )
    //artist name, photo, title, description?
}
ArtworkPage.propTypes = {
    id: PropTypes.string.isRequired, //ask if it'll be a number or string
};