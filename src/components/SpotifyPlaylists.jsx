import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import CheckboxPlaylist from "./CheckboxPlaylist"
import spotifyApi, { invalidToken } from "./SpotifyApi"

const AUDIO_OPTIONS = ["danceability", "energy", "valence"]

function SpotifyPlaylist() {
  const [playlists, setPlaylists] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [audioFeature, setAudioFeature] = useState(0)
  const [playlistFetched, setPlaylistFetched] = useState(false)

  useEffect(() => {
    if (!playlistFetched) {
      fetchPlaylists()
    }
  }, [playlistFetched])

  const fetchPlaylists = async () => {
    try {
      const response = await spotifyApi.getUserPlaylists()
      setPlaylists(
        response.items.map((p) => {
          return { ...p, isChecked: false }
        })
      )
      setPlaylistFetched(true)
    } catch (err) {
      invalidToken()
    }
  }

  const handleClick = () => {
    onOpen()
  }

  const getActivePlaylistTracks = async () => {
    const activePlaylists = playlists.filter((p) => p.isChecked)
    const trackPromises = activePlaylists.map((playlist) =>
      spotifyApi.getPlaylistTracks(playlist.id)
    )
    const trackResponses = await Promise.all(trackPromises)
    return trackResponses.flatMap((response) => response.items)
  }

  const randomize = async () => {
    try {
      const tracks = await getActivePlaylistTracks()
      const trackFeaturesPromises = tracks.map((track) =>
        spotifyApi.getAudioFeaturesForTrack(track.track.id)
      )
      const tracksFeatures = await Promise.all(trackFeaturesPromises)

      const pD = tracksFeatures.map((features, index) => ({
        track: tracks[index].track.uri,
        features,
      }))
      pD.sort((a, b) => {
        console.log(b.features[AUDIO_OPTIONS[audioFeature]])
        return (
          b.features[AUDIO_OPTIONS[audioFeature]] -
          a.features[AUDIO_OPTIONS[audioFeature]]
        )
      })

      for (const item of pD) {
        await spotifyApi.queue(item.track)
      }

      alert("Check your Spotify queue")
    } catch (err) {
      console.error(err)
      alert("An error occurred while randomizing your queue")
    }
  }

  const handleSelectedChange = (event) => {
    console.log(playlists.filter((p) => p.isChecked))
    setAudioFeature(event.target.value)
  }

  return (
    <>
      <Flex>
        <Button
          onClick={() => handleClick()}
          key={"md"}
          colorScheme="blue"
          m={4}
        >{`My playlists`}</Button>
        <Modal onClose={onClose} isOpen={isOpen} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{`Your playlists`}</ModalHeader>
            <ModalBody>
              <Wrap spacing={2}>
                {playlists.map((p, i) => (
                  <CheckboxPlaylist key={i} playlist={p} index={i} />
                ))}
              </Wrap>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex>
        <Select
          placeholder="Select audio feature"
          onChange={handleSelectedChange}
          value={audioFeature}
        >
          {AUDIO_OPTIONS.map((o, index) => (
            <option key={index} value={index}>
              {o}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex>
        <Button colorScheme="green" m={4} onClick={randomize}>
          Randomize my queue based on selected audio feature & playlists
        </Button>
      </Flex>
    </>
  )
}

export default SpotifyPlaylist
