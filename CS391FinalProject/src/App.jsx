// Anissa Patel: App.jsx
import React from 'react';
import { createBrowserRouter, Routes, Route, RouterProvider} from 'react-router-dom';
import Header from "./components/Header.jsx"
import HomePage from "./pages/HomePage.jsx";
import ArtistPage from "./pages/ArtistPage.jsx";
import ArtworkPage from "./pages/ArtworkPage.jsx";

// root component wraps the main routes and the header component
function Root(){
  return(
    <>
      {/* inserts the header component at the top of each page */}
      <Header/>  

      {/* container for route components where each Route defines a nav path */}
      <Routes>
          {/* route for home page */}
          {/* loads HomePage component when / is accessed */}
          <Route
            path='/'
            element={<HomePage/>}
          />
          {/* route for artist page with ID */}
          {/* loads ArtistPage component when /artist/:id is accessed */}
          <Route
            path='/artist/:id'
            element={<ArtistPage/>}
          />
          {/* route for artwork page with ID */}
          {/* loads ArtworkPage component when /artwork/:id is accessed */}
          <Route
            path='/artwork/:id'
            element={<ArtworkPage/>}
          />
      </Routes>
    </>
  );
}

// defines main router configuration using createBrowserRouter
const router = createBrowserRouter([
  {
    // base path set to home route
    path: "/", 
    // root component is the main element for the base path
    element: <Root />,
    children: [
      { path: "artist/:id", element: <ArtistPage /> },
      { path: "artwork/:id", element: <ArtworkPage /> }
    ]
  }
]);

// App component that is the entry point for the router
export default function App(){
  return (
      <RouterProvider router={router} />
  );
}