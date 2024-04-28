// Sophie: send painting's "id" to ArtworkPage
// API: https://api.artic.edu/api/v1/artworks
// inspiration to use Flippy came from the S&T group Frederic Lemonnier and Stone Harris. not same code, but inspired by
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
// the home page uses the ids passed and renders them from the api. Using Flippy for a fun interactive element. All this
//art is then passing the id to the Artist page where it will say facts about the art such as dimensions and medium!
// everything from line 12-56 is just styling using styled components. Then all the rendering is below that.

const ArtworksContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    background-color: white;
`;

const FeaturedArt = styled.h2`
    text-align: center; // needed to center h2
`;

const FlippyWrapper = styled(Flippy)`
    border: 3px solid #b50235; // cohesive border on all pages
`;

const ArtworkCard = styled.div` // set as a fun color for when they "flip" the art over to see title/artist
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

function Artwork({ artwork }) { // Artwork component received artwork as a prop to be passed through
    const { id, title, artist_title, image_id } = artwork;

    return (
        <Link to={`/artwork/${id}`} style={{ textDecoration: 'none' }}>
            <FlippyWrapper // used Flippy to add a new fun element
                flipOnHover={true}
                flipOnClick={false}
                flipDirection="horizontal"
                style={{ width: '100%', height: '100%' }}
            >
                <FrontSide>
                    <ArtworkCard>
                        <ArtworkImage src={`https://www.artic.edu/iiif/2/${image_id}/full/400,/0/default.jpg`} alt={title} />
                    </ArtworkCard>
                </FrontSide>
                <BackSide>
                    <ArtworkCard>
                        <ArtworkInfo>
                            <ArtworkTitle>{title}</ArtworkTitle>
                            <ArtistName>Artist: {artist_title}</ArtistName>
                        </ArtworkInfo>
                    </ArtworkCard>
                </BackSide>
            </FlippyWrapper>
        </Link>
    );
}

export default function HomePage() { // whole part renders the art that is displayed on the home page
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
            <FeaturedArt>Featured Art</FeaturedArt>
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
}; // passed as string to ArtistPage!
