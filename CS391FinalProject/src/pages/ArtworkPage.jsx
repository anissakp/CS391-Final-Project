// Responsible for this component: Ana
// This is the artwork page where the user gets to see the artwork they clicked on, information
// about the art, and should also redirect the user to the artist page of that artwork whenever
// they click on the artist's name

// API: https://api.artic.edu/api/v1/artworks/{id}


import {useEffect,useState} from "react";
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import SimplePopup from "./SimplePopup.jsx"; //new component from MUI library. This is a popup where I will display the artwork's date

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
    border: 3px solid #b50235; //pretty border and on theme 
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
`;

const ArtistLink = styled.a`
    color: #b50235;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    } //make it nicer for when an user wants to click on the link
`;

const BoldText = styled.span`
    font-weight: bold;
`;

//the artwork page function/component, gets the artwork id the user clicked on previously from the home page
//it then calls the API with said artwork id, and logs what info we get
//we then populate our artwork container with the info that we want, making it
//look organized and professional
// we use useState and useEffect hooks!
export default function ArtworkPage(){
    const [artwork, setArtwork]=useState([])
    const { id } = useParams(); // extracts 'id' from what we input
    useEffect(()=>{
        async function fetchData() {
            try {
                const raw = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
                const responseData = await raw.json();
                console.log("Response from API:", responseData);//check data from the artwork we can work with

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
    //container is styled, with red border. Popup component from MUI that displays the date of the art

}
ArtworkPage.propTypes = {
    id: PropTypes.string.isRequired, //artwork id will be passed as a string
};