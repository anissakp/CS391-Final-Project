// Sophie Murrag: send painting's "id" to ArtworkPage
// API: https://api.artic.edu/api/v1/artworks
// Had the idea to use Flippy, which is from a S&T group Frederic Lemonnier and Stone Harris.

// the home page uses the ids passed and renders them from the api. Using Flippy for a fun interactive element. All this
//art is then passing the id to the Artist page where it will say facts about the art such as dimensions and medium!
// everything from line 12-56 is just styling using styled components. Then all the rendering is below that.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

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
    background-color: whitesmoke;
`;

const ArtworkCard = styled.div` // set as a fun color (mintcream) for when it "flips" the art over to see title/artist
    background-color: ghostwhite;
    border-radius: 8px;
    width: 300px;
`;
const ArtworkImage = styled.img`
    width: 100%;
`;
const ArtworkInfo = styled.div`
    padding: 20px;
`;

const ArtworkTitle = styled.h3`
    margin: 0;
    font-size: 1.2rem;
    color: darkslategrey;
`;

const ArtistName = styled.p`
    margin: 8px 0 0;
    color: darkslategrey;
`;

function Artwork({ artwork }) { // Artwork component received artwork as a prop to be passed through
    const { id, title, artist_title, image_id } = artwork;

    return (
        <Link to={`/artwork/${id}`} style={{ textDecoration: 'none' }}>
            <FlippyWrapper // used Flippy to add a new fun element line 67 -70 is front of card and 71-78 is what i put on the back of the card for when you hover over
                flipOnHover={true}
                flipOnClick={false}
                flipDirection="vertical"
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

export default function HomePage() { // lines 84-101 fetches the art that is displayed on the home page. the api rotates art too
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
                console.error('Issue with fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <FeaturedArt>Featured Art</FeaturedArt>
            {loading ? (
                <div>Art is loading...</div>
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
