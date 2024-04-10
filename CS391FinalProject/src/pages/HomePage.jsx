import {useEffect, useState} from "react";

export default function HomePage(){
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const response = await fetch('https://api.artic.edu/api/v1/artworks');
            const data = await response.json();
            const artistNames = extractArtistNames(data);
            setArtists(artistNames);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const extractArtistNames = (data) => {
        const artistNames = data.data.map((artwork) => artwork.artist_title);
        // so that there are no duplicate artists
        return Array.from(new Set(artistNames));
    };

    return (
        <div>
            <h1>Artists</h1>
            <ul>
                {artists.map((artist, index) => (
                    <li key={index}>{artist}</li>
                ))}
            </ul>
        </div>
    );
}