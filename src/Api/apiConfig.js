export const ApiUrl = (!process.env.NODE_ENV  || process.env.NODE_ENV == "development") ?  "https://localhost:7117" : "API"
export const ApiRoutes = {
    login : "/auth/login/",
    register: "/auth/register/",
    album: "/api/album/",
    song: "/api/song/",
    audio: "/api/audio/",
    image: "/api/image/",
    playlist:"/api/playlist/",
    artist: "/api/artist/",
    search:
    {
        playlist: '/api/Search/Playlist?',
        song: '/api/Search/Song?',
        album: '/api/Search/Album?',
    }
}