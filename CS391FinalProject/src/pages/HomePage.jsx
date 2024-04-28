// Sophie: send painting's "id" to ArtworkPage
// API: https://api.artic.edu/api/v1/artworks
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ArtworksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    background-color: white;
`;

const ArtworkCard = styled.div`
    background-color: mintcream;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    width: 300px;
`;

const ArtworkImage = styled.img`
    width: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const ArtworkInfo = styled.div`
    padding: 16px;
`;

const ArtworkTitle = styled.h3`
    margin: 0;
    font-size: 1.2rem;
    color: darkslategrey;
`;

const ArtistName = styled.p`
    margin: 8px 0 0;
    color: #666;
`;

function Artwork({ artwork }) {
    const { id, title, artist_title, image_id } = artwork;

    return (
        <Link to={`/artwork/${id}`} style={{ textDecoration: 'none' }}>
            <ArtworkCard>
                <ArtworkImage src={`https://www.artic.edu/iiif/2/${image_id}/full/400,/0/default.jpg`} alt={title} />
                <ArtworkInfo>
                    <ArtworkTitle>{title}</ArtworkTitle>
                    <ArtistName>Artist: {artist_title}</ArtistName>
                </ArtworkInfo>
            </ArtworkCard>
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
                <h2>Featured Artwork</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <ArtworksContainer>
                        {artworks.map((artwork) => (
                            <Artwork key={artwork.id} artwork={artwork} />
                        ))}
                    </ArtworksContainer>
                )}
            </div>
    );
}
HomePage.propTypes = {
    id: PropTypes.string.isRequired,
};
