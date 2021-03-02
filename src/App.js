import { useState, useRef } from 'react'

import Nav from './components/Nav'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'

import data from './utils'

import './styles/App.scss'

const App = () => {
    const audioRef = useRef(null)

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [libraryStatus, setLibraryStatus] = useState(false)
    
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration})
    }

    return (
        <div>
            <Nav 
                libraryStatus={libraryStatus} 
                setLibraryStatus={setLibraryStatus} 
            />
            <Song currentSong={currentSong} />
            <Player 
                songs={songs} 
                currentSong={currentSong}
                setCurrentSong={setCurrentSong} 
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying} 
                songInfo={songInfo}
                setSongInfo={setSongInfo}
            />
            <Library 
                songs={songs} 
                setSongs={setSongs}
                setCurrentSong={setCurrentSong} 
                audioRef={audioRef}
                isPlaying={isPlaying}
                libraryStatus={libraryStatus} 
            />
            <audio 
                onTimeUpdate={timeUpdateHandler} 
                onLoadedMetadata={timeUpdateHandler} 
                ref={audioRef} 
                src={currentSong.audio}
            >
            </audio>
        </div>
    )
}

export default App

