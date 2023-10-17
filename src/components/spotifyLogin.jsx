
export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://polbachelin.github.io/spotify_api_spike/"
const CLIENT_ID = "1f2e8117b6864eaaa43433e3c1b971d0"

const scopes = [
    "user-top-read"
]

export const loginUrl = `${authEndpoint}?
client_id=${CLIENT_ID}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`

