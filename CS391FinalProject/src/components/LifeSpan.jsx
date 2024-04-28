// Margo Miller

// using Flippy for a fun way to display life span of artist
// inspiration to use Flippy came from the S&T group Frederic Lemonnier and Stone Harris,
// but I used https://www.npmjs.com/package/react-flippy to do it myself!
import styled from "styled-components";
import PropTypes from "prop-types";
import ArtistIcon from "./ArtistIcon.jsx";
import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const StyledDate=styled.h3`
    color: white;
    padding: 2% 0;
    margin: auto;
`

const StyledFlippy=styled(Flippy)`
    width: 500px;
    margin: auto;
`

const StyledFrontSide=styled(FrontSide)`
    background: white;
    border-radius: 10px;
`

const StyledBackSide=styled(BackSide)`
    background: #b50235;
    border-radius: 10px;
`

export default function LifeSpan( {birth, death} ) {
    const ref = useRef();
    return (
        <StyledFlippy
            flipOnHover={true} // want icon to flip on hover, not on click
            flipDirection="vertical" // vertical flip
            ref={ref}
        >
            <StyledFrontSide>
                {/* icon from ArtistIcon component, for fun styling */}
                <ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/>
            </StyledFrontSide>
            <StyledBackSide>
                {/* uses all possible cases of null to render correct life span */}
                {birth && death ? (
                    <StyledDate>{birth}-{death}</StyledDate>
                ) : birth ? (
                    <StyledDate>{birth}-??</StyledDate>
                ) : death ? (
                    <StyledDate>??-{death}</StyledDate>
                ) : (
                    <StyledDate>No information is available on their life span.</StyledDate>
                )}
            </StyledBackSide>
        </StyledFlippy>
    );
}

// birth and death come from ArtistInfo component, from API
LifeSpan.propTypes = {
    birth: PropTypes.string.isRequired,
    death: PropTypes.string.isRequired,
};