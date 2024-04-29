// Anissa Patel: Header.jsx
import {useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

// imports FontAwesome icons to use in components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

// styles for main header container
const HeaderWrapper = styled.header`
    background-color: #333;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    min-height: 80px; 
`;

// styles for the site title within the header
const StyledH1 = styled.h1`
    font-size: 1.5em;
    text-align: left; 
    margin-right: auto;
`;

// styling for navigation menu
const Nav = styled.nav`
    ul {
        display: flex;
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        position: relative; 
        margin-left: 25px;
    }
`;

// styles for navigation links
const StyledLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    padding: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

// styles for logo
const LogoImage = styled.img`
    height: 50px; 
    width: auto; 
    margin-right: 20px;  
`;

// styles for dropdown menu content
const DropdownContent = styled.div`
    display: none;
    position: absolute;
    right: 0; 
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;

        // changes background color on hover 
        &:hover {
            background-color: #f1f1f1;
        }
    }
`;

// styles specific to list items that contain dropdown content
const DropdownLi = styled.li`
    &:hover ${DropdownContent} {
        display: block;
    }
`;

// combines styled link with flexbox for alignment of text and dropdown menu icon
const StyledLinkWithIcon = styled(StyledLink)`
  display: flex;
  align-items: center;
`;

export default function Header(props){
    // state to hold artist data
    const [artists, setArtists] = useState([]);

    // fetch artist data from chicago art museum API
    useEffect(() => {
        async function fetchArtists() {
            try {
                const response = await fetch('https://api.artic.edu/api/v1/artists');
                const data = await response.json();
                if (data && data.data) {
                    // update state with artist data
                    setArtists(data.data); 
                }
            } catch (error) {
                console.error('Failed to fetch artists:', error);
            }
        }
        fetchArtists();
    }, []);

    // render the header with logo, title, and navigation
    return (
        <HeaderWrapper>
            <LogoImage src={logo} className='App-logo' alt='logo' />
            <StyledH1> The Art Institute of Chicago </StyledH1>
            <Nav>
                <ul>
                    <li>
                        <StyledLinkWithIcon to="/" className="App-link">
                            Home
                        </StyledLinkWithIcon>
                    </li>
                    <DropdownLi>
                        <StyledLinkWithIcon to="#" className="App-link">
                            {/* arrow icon next to drop down menu */}
                            Artists <FontAwesomeIcon icon={faCaretDown} />
                        </StyledLinkWithIcon>

                        {/* creates dropdown menu with each artist as an option */}
                        {/* when an artist is selected, the user is navigated to that artist's page */}     
                        <DropdownContent>
                            {artists.map(artist => (
                                <NavLink key={artist.id} to={`/artist/${artist.id}`}>
                                    {artist.title || "Unknown Artist"}
                                </NavLink>
                            ))}
                        </DropdownContent>
                    </DropdownLi>
                </ul>
            </Nav>
        </HeaderWrapper>
    );
}