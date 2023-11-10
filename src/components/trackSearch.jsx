import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react"
import React, { useState } from "react"
import SpotifyWebApi from "spotify-web-api-js"

const spotifyApi = new SpotifyWebApi()

const TrackSearch = () => {
  const [track, setTrack] = useState({
    name: "",
    id: "",
    external_urls: { spotify: "" },
  })
  const [audioFeat, setAudioFeatures] = useState({})
  const [trackInput, setTrackInput] = useState("")
  const [trackArtistInput, setTrackArtistInput] = useState("")
  const toast = useToast()

  const handleTrackInput = (event) => {
    setTrackInput(event.target.value)
  }

  const handleArtistInput = (event) => {
    setTrackArtistInput(event.target.value)
  }

  const handleSearch = async () => {
    try {
      // Search for tracks based on the query
      const searchResult = await spotifyApi.searchTracks(
        `artist:${trackArtistInput} track:${trackInput}`
      )

      const track = searchResult.tracks.items[0]

      if (track) {
        const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(
          track.id
        )
        setTrack(track)
        setAudioFeatures(audioFeatures)
      } else {
        console.log("other undefined")
        toast({
          title: "Error",
          description:
            "Track not found, make sure to specify the correct artist name and song",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error:", error.message)
    }
  }

  const CustomItem = React.forwardRef(({ children, ...rest }, ref) => (
    <ListItem>{children}</ListItem>
  ))

  return (
    <Box>
      <Flex paddingBottom={"30px"}>
        <Input
          w={{ base: "100%", md: "300px" }}
          size="md"
          placeholder="Enter track name"
          value={trackInput}
          onChange={handleTrackInput}
        />
        <Input
          w={{ base: "100%", md: "300px" }}
          size="md"
          placeholder="Enter artist name"
          value={trackArtistInput}
          onChange={handleArtistInput}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Flex>
      <Box>
        <Heading>Audio features of the track {track.name} </Heading>
        <Link isExternal color="teal" href={track.external_urls.spotify}>
          Link to song
        </Link>
      </Box>
      <Text>Track ID : {track.id}</Text>
      <Flex paddingBottom={"30px"}>
        <UnorderedList>
          <CustomItem>Acousticness : {audioFeat.acousticness}</CustomItem>
          <ListItem>Danceability : {audioFeat.danceability}</ListItem>
          <ListItem>Duration ms : {audioFeat.duration_ms}</ListItem>
          <ListItem>Energy : {audioFeat.energy}</ListItem>
          <ListItem>Instrumentalness : {audioFeat.instrumentalness}</ListItem>
          <ListItem>Key : {audioFeat.key}</ListItem>
          <ListItem>Liveness : {audioFeat.liveness}</ListItem>
          <ListItem>Loudness : {audioFeat.loudness}</ListItem>
          <ListItem>Speechiness : {audioFeat.speechiness}</ListItem>
          <ListItem>Tempo : {audioFeat.tempo}</ListItem>
          <ListItem>Time signature : {audioFeat.time_signature}</ListItem>
          <ListItem>Valence : {audioFeat.valence}</ListItem>
        </UnorderedList>
      </Flex>
    </Box>
  )
}

export default TrackSearch
