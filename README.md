# Tune Port

This is a React application that uses Vite as a development server to provide a Spotify-wrapped experience. The application allows users to search for songs, get custom recommendations based on eight different parameters, and create and modify playlists.

## Deployed Link

[Tune Port Link](https://tune-port.netlify.app/)

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

Get personalized recommendations based on eight different parameters: danceability, energy, loudness, acousticness, instrumentalness, liveness, artists, and tempo. Adjust each parameter using a slider to generate a list of recommended songs.

### Playlists

Users can create and modify playlists within the application. They can add songs to a playlist, remove songs from a playlist, and rename a playlist.

## Technologies Used

This application was built using React and Vite. It also uses the Spotify API to fetch data from Spotify. Styling was done using SASS and the Mantine component framework.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

                           
![tune-port screenshot of splash page](https://user-images.githubusercontent.com/105423307/227052253-f1cf105e-7a9e-4cc8-8840-898de2d6c671.png)  
![tune-port screenshot of UI](https://user-images.githubusercontent.com/105423307/227052401-5e8bfaa4-5c9b-4755-a88f-fab944bf8be4.png)  
![tune-port screenshot of create playlist](https://user-images.githubusercontent.com/105423307/227052592-80664f82-067f-4b29-a3c8-f5d0a0c65548.png)

  
