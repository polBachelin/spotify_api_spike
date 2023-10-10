import './App.css';
import { Button, ChakraProvider, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import TrackSearch from './components/trackSearch';
import { loginUrl } from './components/spotifyLogin';
const spotify = new SpotifyWebApi();

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");

  const SpotifyButton = () => {
    if (spotifyToken === "") {
      console.log(loginUrl)
      return (        
        <Link colorScheme='green' variant={'solid'} href={loginUrl}>Login with spotify</Link>
      )
    } else {
      return (
        <TrackSearch/>
      )
    }
  }

  const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item)=> {
            let parts = item.split("=")
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial;
        }, {});
}

  useEffect(() => {
    const _spotifyToken = getTokenFromUrl().access_token

    if (_spotifyToken && spotifyToken === "") {
      setSpotifyToken(_spotifyToken)
      spotify.setAccessToken(_spotifyToken)
    }
  })

  return (
    <ChakraProvider>
      <SpotifyButton/>
    </ChakraProvider>
  );
}

export default App;
