import { Center, ChakraProvider, Grid, GridItem, Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import "./App.css"
import { setToken } from "./components/SpotifyApi"
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
          <Grid templateColumns={"repeat(5, 1fr)"} gap={4}>
            <GridItem colSpan={2}>
              <TrackSearch />
            </GridItem>
            <GridItem colStart={3} colEnd={5}>
              <SpotifyPlaylist />
            </GridItem>
          </Grid>
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
      setToken(_spotifyToken)
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
