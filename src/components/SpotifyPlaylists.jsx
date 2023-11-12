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
import spotifyApi from "./SpotifyApi"

const AUDIO_OPTIONS = ["danceability", "energy", "valence"]

function SpotifyPlaylist() {
  const [playlists, setPlaylists] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [audioFeature, setAudioFeature] = useState(0)

  useEffect(() => {
    if (playlists.length === 0) {
      fetchPlaylists()
    }
  }, [playlists.length])

  const fetchPlaylists = () => {
    spotifyApi.getUserPlaylists().then((response) => {
      setPlaylists(
        response.items.map((p) => {
          return { ...p, isChecked: false }
        })
      )
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
    console.log(audioFeature)
    pD.sort(
      (a, b) =>
        b.features[AUDIO_OPTIONS[audioFeature]] -
        a.features[AUDIO_OPTIONS[audioFeature]]
    )
    console.log(pD)
    pD.forEach((item) => {
      spotifyApi.queue(item.track).catch((err) => {
        alert(
          "It did not find a spotify player, make sure that you have spotify running"
        )
        console.log(err)
        return
      })
    })
    alert("Check your spotify queue")
  }

  const randomize = () => {
    console.log(playlists)
    playlists.forEach((item) => {
      if (item.isChecked) {
        getAudioFeaturesOfPlaylist(item.id)
      }
    })
  }

  const handleSelectedChange = (event) => {
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
