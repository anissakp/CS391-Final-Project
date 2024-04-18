
import {useEffect,useState} from "react";
import PropTypes from "prop-types";

export default function ArtworkPage({ id }){
    const [artwork,setArtwork]=useState([])
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
            <h1>Artwork Page</h1>

            <div className="artwork-info">
                <p>Artist:{artwork.artist_display}</p>
                <p>Date: {artwork.date_display}</p>
                <p>Dimensions:{artwork.dimensions}</p>
                <p>Medium: {artwork.medium_display}</p>
                <img
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/300,/0/default.jpg`}
                    alt={artwork.title}
                />

            </div>
        </>
    )
    //artist name, photo, title, description?

}
ArtworkPage.propTypes = {
    id: PropTypes.string.isRequired, //ask if it'll be a number or string
};

// Ana: send "artist_id" to ArtistPage
// API: https://api.artic.edu/api/v1/artworks/{id}

