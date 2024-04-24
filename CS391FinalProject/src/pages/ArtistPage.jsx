// Margo
// API: https://api.artic.edu/api/v1/artists/{id}
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ArtistPage({ id }) {
    
    const [artist,setArtist]=useState([])
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

            <div className="artist-info">
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
            </div>
        </>
    );
}

ArtistPage.propTypes = {
    id: PropTypes.string.isRequired,
};