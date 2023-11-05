import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import SpotifyWebApi from "spotify-web-api-js"
import spotifyApi from "./SpotifyApi"

function SpotifyPlaylist() {
  const [playlists, setPlaylists] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [playlistDanceability, setPlaylisDanceability] = useState({})

  useEffect(() => {
    fetchPlaylists()
  }, [])

  const fetchPlaylists = () => {
    spotifyApi.getUserPlaylists().then((response) => {
      setPlaylists(response.items)
    })
  }

  const addToQueue = (uri) => {
    spotifyApi.queue(uri).then(() => {
      alert("Playlist has been added to the queue!")
    })
  }

  const handleClick = () => {
    onOpen()
  }

  const getAudioFeaturesOfPlaylist = async (id) => {
    const tracks = await spotifyApi.getPlaylistTracks(id)

    const pD = []
    for (const track of tracks.items) {
      let features = await spotifyApi.getAudioFeaturesForTrack(track.track.id)
      pD.push({ track: track.track.uri, features: features })
    }
    pD.sort((a, b) => b.features.danceability - a.features.danceability)
    console.log(pD)
    pD.forEach((item) => {
      spotifyApi.queue(item.track)
    })
  }

  const randomize = (id) => {
    getAudioFeaturesOfPlaylist(id)
  }

  return (
    <>
      <Button
        onClick={() => handleClick()}
        key={"md"}
        m={4}
      >{`My playlists`}</Button>
      <Modal onClose={onClose} isOpen={isOpen} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{`Your playlists`}</ModalHeader>
          <ModalBody>
            <VStack spacing={2}>
              {playlists.map((playlist, index) => (
                <Box key={index} padding="5" borderWidth="1px">
                  <Text fontSize="xl">{playlist.name}</Text>
                  <Button
                    onClick={() => addToQueue(playlist.uri)}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Add to queue
                  </Button>
                  <Button
                    onClick={() => randomize(playlist.id)}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Randomize my playlist by Danceability
                  </Button>
                </Box>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SpotifyPlaylist
