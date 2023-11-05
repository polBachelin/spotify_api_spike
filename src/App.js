import { Center, ChakraProvider, Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import SpotifyWebApi from "spotify-web-api-js"
import "./App.css"
import spotifyApi from "./components/SpotifyApi"
import SpotifyPlaylist from "./components/SpotifyPlaylists"
import InfoDrawer from "./components/infoDrawer"
import { loginUrl } from "./components/spotifyLogin"
import TrackSearch from "./components/trackSearch"

function App() {
  const [spotifyToken, setSpotifyToken] = useState("")

  const SpotifyButton = () => {
    if (spotifyToken === "") {
      return (
        <Center>
          <Link colorScheme="green" variant="solid" href={loginUrl}>
            Login with spotify
          </Link>
        </Center>
      )
    } else {
      return (
        <>
          <SpotifyPlaylist />
          <TrackSearch />
        </>
      )
    }
  }

  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=")
        initial[parts[0]] = decodeURIComponent(parts[1])

        return initial
      }, {})
  }

  useEffect(() => {
    const _spotifyToken = getTokenFromUrl().access_token

    if (_spotifyToken && spotifyToken === "") {
      setSpotifyToken(_spotifyToken)
      spotifyApi.setAccessToken(_spotifyToken)
    }
  }, [spotifyToken])

  return (
    <ChakraProvider>
      <InfoDrawer />
      <SpotifyButton />
    </ChakraProvider>
  )
}

export default App
