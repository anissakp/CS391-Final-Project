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
            <div>
                    <h2>{artwork.title}</h2>
                    <h3>{artwork.artist_title}</h3>
                </div>

        </>
    )
    //artist name, photo, title, description?

}
ArtworkPage.propTypes = {
    id: PropTypes.string.isRequired, //ask if it'll be a number or string
};