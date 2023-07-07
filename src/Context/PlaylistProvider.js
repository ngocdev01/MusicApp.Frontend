import { createContext, useState } from "react";

export const PlaylistContext = createContext([]);

export default function PlaylistProvider({ children }) {
    const [playlist, setPlaylist] = useState([]);

    return (
        <PlaylistContext.Provider
            value={{ playlist, setPlaylist }}
        >
            {children}
        </PlaylistContext.Provider>
    );
}
