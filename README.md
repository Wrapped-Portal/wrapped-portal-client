# React Spotify Wrapped App
This is a React application that uses Vite as a development server to provide a Spotify-wrapped experience. The application allows users to search for songs, get custom recommendations based on eight different parameters, and create and modify playlists.

## Getting Started
To get started with this application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies by running npm install.
4. Create a .env in the root folder of the application along side the package.json
5. Start the development server by running npm run dev.
6. Open your browser and navigate to http://localhost:3000 to see the application running.

## Enviromental variables
the client URI is the address to your vite server. 
the server uri is the address to the server backend. 

VITE_CLIENT_URI=http://localhost:5173/
VITE_CLIENT_ID=<insert client id from spotify dashboard>
VITE_CLIENT_SECRET=<insert client id from spotify dashboard
VITE_SERVER_URI=http://localhost:3001/
VITE_DEV_MODE=true

## Features
### Song Search
The application allows users to search for songs on Spotify by entering keywords in the search bar. The search results will be displayed in a list, and users can select a song to view more details about it.

### Custom Recommendations
Users can also get custom recommendations based on eight different parameters: danceability, energy, loudness, acousticness, instrumentalness, liveness, artists, and tempo. Users can adjust each parameter using a slider, and the application will generate a list of recommended songs based on the selected parameters.

### Playlists
Users can create and modify playlists within the application. They can add songs to a playlist, remove songs from a playlist, and rename a playlist.

## Technologies Used
This application was built using React and Vite. It also uses the Spotify API to fetch data from Spotify. Styling was done using SASS and the Mantine component framework.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
