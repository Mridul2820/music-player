import { useState } from 'react'

import Player from './components/Player'
import Song from './components/Song'

import data from './utils'

import './styles/App.scss'

const App = () => {
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])

    return (
        <div>
            <Song currentSong={currentSong} />
            <Player />
        </div>
    )
}

export default App

