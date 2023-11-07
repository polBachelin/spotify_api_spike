import {
  Box,
  Button,
  Center,
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

  const handleReset = () => {
    setTrack({})
    setAudioFeatures({})
    setTrackInput("")
    setTrackArtistInput("")
  }

  const handleSearch = async () => {
    try {
      // Search for tracks based on the query
      const searchResult = await spotifyApi.searchTracks(
        `artist:${trackArtistInput} track:${trackInput}`
      )

      const track = searchResult.tracks.items[0];

      if (track) {
        const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(track.id);
        setTrack(track)
        setAudioFeatures(audioFeatures)
      } else {
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
  };

    const CustomItem = React.forwardRef(({ children, ...rest }, ref) => (
        <ListItem>{children}</ListItem>
    ))
    
    return (
      <Box>
        <Center>
            <Input 
                w={{ base: "100%", md: "300px" }}
                size='md'
                placeholder="Enter track name"
                value={trackInput}
                onChange={handleTrackInput}
            />
            <Input 
                w={{ base: "100%", md: "300px" }}
                size='md'
                placeholder="Enter artist name"
                value={trackArtistInput}
                onChange={handleArtistInput}
            />
            <Button onClick={handleSearch}>Search</Button>
            <Button onClick={handleReset}>Reset</Button>
        </Center>
        <br></br>
        <br></br>
        <Center>
            <Heading>Audio features of the track {track.name} </Heading>
        </Center>
        <Center>
            <Link href={track.external_urls.spotify}>Link to song</Link>
        </Center>
        <br></br>
        <Center>
          <Text>Track ID : {track.id}</Text>
        </Center>
        <br></br>
        <br></br>
        <Center>
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
        </Center>
      </Box>
    );
  }

  const CustomItem = React.forwardRef(({ children, ...rest }, ref) => (
    <ListItem>{children}</ListItem>
  ))

  return (
    <Box>
      <Center>
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
      </Center>
      <br></br>
      <br></br>
      <Center>
        <Heading>Audio features of the track {track.name} </Heading>
      </Center>
      <Center>
        <Link href={track.external_urls.spotify}>Link to song</Link>
      </Center>
      <br></br>
      <Center>
        <Text>Track ID : {track.id}</Text>
      </Center>
      <br></br>
      <br></br>
      <Center>
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
      </Center>
    </Box>
  )
}

export default TrackSearch
