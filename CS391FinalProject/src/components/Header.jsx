// Anissa Patel: Header.jsx
import {useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const HeaderWrapper = styled.header`
    background-color: #333;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    min-height: 80px; 
`;

const StyledH1 = styled.h1`
    font-size: 1.5em;
    text-align: left; 
    margin-right: auto;
`;

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

const StyledLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    padding: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

const LogoImage = styled.img`
    height: 50px; 
    width: auto; 
    margin-right: 20px;  
`;

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

        &:hover {
            background-color: #f1f1f1;
        }
    }
`;

const DropdownLi = styled.li`
    &:hover ${DropdownContent} {
        display: block;
    }
`;

const StyledLinkWithIcon = styled(StyledLink)`
  display: flex;
  align-items: center;
`;

export default function Header(props){
    const [artists, setArtists] = useState([]);

    // Fetch artist data from API
    useEffect(() => {
        async function fetchArtists() {
            try {
                const response = await fetch('https://api.artic.edu/api/v1/artists');
                const data = await response.json();
                if (data && data.data) {
                    setArtists(data.data); 
                }
            } catch (error) {
                console.error('Failed to fetch artists:', error);
            }
        }
        fetchArtists();
    }, []);

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

                    {/* Create dropdown menu with each artist as an option */}
                    {/* When an artist is selected, the user is navigated to that Artist's page */}
                    <DropdownLi>
                        <StyledLinkWithIcon to="#" className="App-link">
                            Artists <FontAwesomeIcon icon={faCaretDown} />
                        </StyledLinkWithIcon>
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