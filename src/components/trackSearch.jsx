import { Box, Button, Center, Heading, Input, List, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// Create an instance of the SpotifyWebApi object
const spotifyApi = new SpotifyWebApi();

class TrackSearch extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      trackName: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = async () => {
    const { query } = this.state;

    try {
      // Search for tracks based on the query
      const searchResult = await spotifyApi.searchTracks(query);

      // Extract the first track from the search results (you may want to handle multiple results)
      const track = searchResult.tracks.items[0];

      if (track) {
        console.log(track)
        this.setState({ trackName: track.name });
      } else {
        this.setState({ trackName: 'Track not found' });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  render() {
    const { query, trackName } = this.state;

    return (
      <Box>
        <Box>
            <Center>
                <Input 
                    w={{ base: "100%", md: "300px" }}
                    size='md'
                    placeholder="Enter track name"
                    value={query}
                    onChange={this.handleInputChange}
                />
                <Input 
                    w={{ base: "100%", md: "300px" }}
                    size='md'
                    placeholder="Enter artist name"
                    value={query}
                    onChange={this.handleInputChange}
                />
                <Button onClick={this.handleSearch}>Search</Button>
            </Center>
        </Box>
        <br></br>
        <br></br>
        <Center>
            <Heading>Audio features of the track : {trackName} </Heading>
        </Center>
        <Center>
          <UnorderedList>
            <ListItem>Acousticness :</ListItem>
            <ListItem>Danceability :</ListItem>
            <ListItem>Duration ms :</ListItem>
            <ListItem>Energy :</ListItem>
            <ListItem>Instrumentalness :</ListItem>
            <ListItem>Key :</ListItem>
            <ListItem>Liveness :</ListItem>
            <ListItem>Loudness :</ListItem>
            <ListItem>Speechiness :</ListItem>
            <ListItem>Tempo :</ListItem>
            <ListItem>Time signature :</ListItem>
            <ListItem>Valence :</ListItem>
          </UnorderedList>
        </Center>
      </Box>
    );
  }
}

export default TrackSearch;
