# CS 391 Final Project

### How to run:
Clone the repo:
```
git clone git@github.com:anissakp/CS391-Final-Project.git
```
Navigate to the project directory and install necessary packages:
```
cd CS391-Final-Project/CS391FinalProject
npm install
npm install react-flippy --legacy-peer-deps
```
Run the web application:
```
npm run dev
```
### Contributors:
Ana Ramirez

- ```ArtworkPage.jsx```: page that renders information about a piece of artwork
- ```SimplePopup.jsx```: popup component for ```ArtworkPage.jsx```

Anissa Patel

- ```App.jsx```: the main application component that uses a router to manage navigation and display between different pages
- ```Header.jsx```: the site's header that provides a link to ```HomePage.jsx``` and includes a dropdown menu filled with artist information, enabling users to navigate to individual artist pages

Margo Miller

- ```ArtistPage.jsx```: page that renders information about a specific artist
- ```LifeSpan.jsx```: component that uses React-Flippy to show artist's life span for ```ArtistPage.jsx```
- ```ArtistIcon.jsx```: image component for ```LifeSpan.jsx```

Sophie Marugg

- ```HomePage.jsx```: page that renders images of the art work, then uses flippy to show the artist title and artist name. 
Then when you click on a piece of art it directs you to the ```ArtworkPage.jsx``` where you'll find details about each piece.
