import { Box, Button, Center, Heading, Input, Link, ListItem, Tooltip, UnorderedList } from '@chakra-ui/react';
import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// Create an instance of the SpotifyWebApi object
const spotifyApi = new SpotifyWebApi();

class TrackSearch extends Component {
  constructor() {
    super();
    this.state = {
      trackInput: '',
      trackArtist: '',
      trackName: '',
      audioFeatures: {},
      trackLink: ''
    };
  }

  handleTrackInput = (event) => {
    this.setState({ trackInput: event.target.value });
  };

  handleArtistInput = (event) => {
    this.setState({ trackArtist: event.target.value });
  };

  handleSearch = async () => {
    const { trackInput, trackArtist } = this.state;

    try {
      // Search for tracks based on the query
      const searchResult = await spotifyApi.searchTracks(`artist:${trackArtist} track:${trackInput}`);

      // Extract the first track from the search results (you may want to handle multiple results)
      const track = searchResult.tracks.items[0];

      const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(track.id);

      if (track) {
        console.log(track)
        console.log(audioFeatures)
        this.setState({ trackName: track.name, audioFeatures: audioFeatures, trackLink: track.external_urls.spotify });
      } else {
        this.setState({ trackName: 'Track not found' });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  render() {
    const { trackInput, trackArtist, trackName, audioFeatures, trackLink } = this.state;

    const CustomItem = React.forwardRef(({ children, ...rest }, ref) => (
        <ListItem>{children}</ListItem>
    ))
    
    return (
      <Box>
        <Box>
            <Center>
                <Input 
                    w={{ base: "100%", md: "300px" }}
                    size='md'
                    placeholder="Enter track name"
                    value={trackInput}
                    onChange={this.handleTrackInput}
                />
                <Input 
                    w={{ base: "100%", md: "300px" }}
                    size='md'
                    placeholder="Enter artist name"
                    value={trackArtist}
                    onChange={this.handleArtistInput}
                />
                <Button onClick={this.handleSearch}>Search</Button>
            </Center>
        </Box>
        <br></br>
        <br></br>
        <Center>
            <Heading>Audio features of the track {trackName} by {trackArtist} </Heading>
        </Center>
        <Center>
            <Link href={trackLink}>Link to song</Link>
        </Center>
        <br></br>
        <Center>
          <UnorderedList>
            <Tooltip label='Hello'>
                <CustomItem>Acousticness : {audioFeatures.acousticness}</CustomItem>
            </Tooltip>
            <ListItem>Danceability : {audioFeatures.danceability}</ListItem>
            <ListItem>Duration ms : {audioFeatures.duration_ms}</ListItem>
            <ListItem>Energy : {audioFeatures.energy}</ListItem>
            <ListItem>Instrumentalness : {audioFeatures.instrumentalness}</ListItem>
            <ListItem>Key : {audioFeatures.key}</ListItem>
            <ListItem>Liveness : {audioFeatures.liveness}</ListItem>
            <ListItem>Loudness : {audioFeatures.loudness}</ListItem>
            <ListItem>Speechiness : {audioFeatures.speechiness}</ListItem>
            <ListItem>Tempo : {audioFeatures.tempo}</ListItem>
            <ListItem>Time signature : {audioFeatures.time_signature}</ListItem>
            <ListItem>Valence : {audioFeatures.valence}</ListItem>
          </UnorderedList>
        </Center>
      </Box>
    );
  }
}

export default TrackSearch;
