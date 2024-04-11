// Margo
// API: https://api.artic.edu/api/v1/artists/{id}
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ArtistPage({ id }) {
    const [artist, setArtist] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const rawData = await fetch(`https://api.artic.edu/api/v1/artists/${id}`);
                const data = await rawData.json();

                setArtist(data);
            } catch (error) {
                console.log("Something went wrong:", error);
            }
        }

        fetchData();
    }, [id]);

    // fetching artist data...
    if (!artist.title) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>About {artist.title}</h1>
            <h3>Birth date: {artist.birth_date}</h3>
            <h3>Death date: {artist.death_date}</h3>
            <p>{artist.description}</p>
        </>
    );
}

ArtistPage.propTypes = {
    id: PropTypes.number.isRequired,
};
