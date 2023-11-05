export const authEndpoint = "https://accounts.spotify.com/authorize"

var redirectUri = "https://polbachelin.github.io/spotify_api_spike/"
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  redirectUri = "http://localhost:3000/"
}

const CLIENT_ID = "1f2e8117b6864eaaa43433e3c1b971d0"

const scopes = [
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
]

export const loginUrl = `${authEndpoint}?
client_id=${CLIENT_ID}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`
