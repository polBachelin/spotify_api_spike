import SpotifyWebApi from "spotify-web-api-js"
import { loginUrl } from "./spotifyLogin";

const spotifyApi = new SpotifyWebApi()

export function invalidToken() {
    alert("Your token has expired please login")
    window.location.href = loginUrl;
}


export function setToken(token) {
    spotifyApi.setAccessToken(token);
}

export function retrievePlaylists() {
    spotifyApi.getUserPlaylists().then((resp) => {
        return resp;
    }).catch((err) => {
        if (err.status == 401) {
            invalidToken();
        }
    })
}

export default spotifyApi
