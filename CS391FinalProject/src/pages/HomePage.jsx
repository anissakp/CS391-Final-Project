// Sophie: send painting's "id" to ArtworkPage
// API: https://api.artic.edu/api/v1/artworks
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {ArtworkDiv} from "../components/ArtworkDiv.jsx";

const ArtworksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 56px;
    justify-content: center;
`;

function Artwork({ artwork }) {
    const { id, title, artist_title, image_id } = artwork;

    return (
        <Link to={`/artwork/${id}`}>
            <div className="card">
                <img src={`https://www.artic.edu/iiif/2/${image_id}/full/400,/0/default.jpg`} alt={title} />
                <div className="card-body">
                    <h3>{title}</h3>
                    <p>{`Artist: ${artist_title}`}</p>
                </div>
            </div>
        </Link>
    );
}

export default function HomePage() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.artic.edu/api/v1/artworks');
                const { data } = await response.json();
                setArtworks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2> </h2>
            {loading ? (
                <div>Art is loading...</div>
            ) : (
                <div>
                    <ArtworksContainer>
                        {artworks.map(artwork => (
                            <ArtworkDiv key={artwork.id}>
                                <Artwork artwork={artwork} />
                            </ArtworkDiv>
                        ))}
                    </ArtworksContainer>
                </div>
            )}
        </div>
    );
}
