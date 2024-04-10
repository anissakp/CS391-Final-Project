import HomePage from "./pages/HomePage.jsx";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: fangsong, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: white;
    }
`;

export default function App() {
  return (
      <>
        <GlobalStyle/>
        <HomePage/>
      </>
  )
}
