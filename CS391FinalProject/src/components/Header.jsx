// Anissa: send "id" to Artist Page
// API: https://api.artic.edu/api/v1/artists

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
    height: 50px;  // Adjust the height to control the size
    width: auto;  // Maintain aspect ratio
    margin-right: 20px;  // Add some space between the logo and the title
`;

export default function Header(props){
    return (
        <HeaderWrapper>
            <LogoImage src={logo} className='App-logo' alt='logo' />
            <StyledH1> The Chicago Art Museum </StyledH1>
            <Nav>
                <ul>
                    {/* <li>
                        <StyledLink to="/" className="App-link">
                            Home
                        </StyledLink>
                    </li> */}
                    <li>
                        <StyledLink to="/artist" className="App-link">
                            Artists
                        </StyledLink>
                    </li>
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
