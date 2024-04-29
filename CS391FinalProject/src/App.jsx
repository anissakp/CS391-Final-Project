// Anissa Patel: App.jsx
import React from 'react';
import { createBrowserRouter, Routes, Route, RouterProvider} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import ArtistPage from "./pages/ArtistPage.jsx";
import ArtworkPage from "./pages/ArtworkPage.jsx";
import Header from "./components/Header.jsx"

function Root(){
  return(
    <>
      <Header/>
      <Routes>
          <Route
            path='/'
            element={<HomePage/>}
          />
          <Route
            path='/artist/:id'
            element={<ArtistPage/>}
          />
          <Route
            path='/artwork/:id'
            element={<ArtworkPage/>}
          />
      </Routes>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",  // Home page
    element: <Root />,
    children: [
      // { path: "/", element: <HomePage /> },
      { path: "artist/:id", element: <ArtistPage /> },
      { path: "artwork/:id", element: <ArtworkPage /> }
    ]
  }
]);

export default function App(){
  return (
      <RouterProvider router={router} />
  );
}