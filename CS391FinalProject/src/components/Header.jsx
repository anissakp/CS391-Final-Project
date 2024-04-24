// Anissa: send "id" to Artist Page
// API: https://api.artic.edu/api/v1/artists
import {useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const HeaderWrapper = styled.header`
    background-color: #333;
    color: white;
    padding: 20px;
    min-height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledH1 = styled.h1`
    font-size: 1.5em;
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
        margin-right: 10px;
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
    display: none; // Initially hide the dropdown content
    position: absolute;
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

export default function Header(props){

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function fetchArtists() {
            try {
                const response = await fetch('https://api.artic.edu/api/v1/artists');
                const data = await response.json();
                if (data && data.data) {
                    setArtists(data.data); // Assuming 'data' contains the list of artists
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
                    {/* <li>
                        <StyledLink to="/" className="App-link">
                            Home
                        </StyledLink>
                    </li> */}
                    {/* <li>
                        <StyledLink to="/artist" className="App-link">
                            Artists
                        </StyledLink>
                    </li> */}

                    <DropdownLi>
                        <NavLink to="#" className="App-link">Artists</NavLink>
                        <DropdownContent>
                            {artists.map(artist => (
                                <NavLink key={artist.id} to={`/artist/${artist.id}`}>
                                    {artist.title || "Unknown Artist"}
                                </NavLink>
                            ))}
                        </DropdownContent>
                    </DropdownLi>

                    <li>
                        <StyledLink to="/artwork" className="App-link">
                            Artworks
                        </StyledLink>
                    </li>
                </ul>
            </Nav>
        </HeaderWrapper>
    );
}
