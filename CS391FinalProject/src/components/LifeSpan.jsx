// Margo

// using Flippy for a fun way to display birthdate of artist
import styled from "styled-components";
import PropTypes from "prop-types";
import ArtistIcon from "./ArtistIcon.jsx";
// for flippy - using inspiration from group in class, but my own code!
import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const StyledDate=styled.h3`
    color: white;
    padding: 2% 0;
    margin: auto;
`

export default function LifeSpan({birth, death}) {
    const ref = useRef();
    return (
        <Flippy
            flipOnHover={true} // want icon to flip on hover, not on click
            flipDirection="vertical" // vertical flip
            ref={ref}
            style={{ width: '500px', margin: 'auto'}}
        >
            <FrontSide style={{ backgroundColor: 'white'}} >
                {/* icon from ArtistIcon component, for styling */}
                <ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/><ArtistIcon/>
            </FrontSide>
            <BackSide style={{ backgroundColor: '#b50235'}}>
                {birth && death ? (
                    <StyledDate>{birth}-{death}</StyledDate>
                ) : birth ? (
                    <StyledDate>{birth}-??</StyledDate>
                ) : death ? (
                    <StyledDate>??-{death}</StyledDate>
                ) : (
                    <StyledDate>No information is available on their life span.</StyledDate>
                )}
            </BackSide>
        </Flippy>
    );
}

LifeSpan.propTypes = {
    birth: PropTypes.string.isRequired,
    death: PropTypes.string.isRequired,
};