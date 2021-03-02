import { useState, useRef } from 'react'

import Nav from './components/Nav'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'

import data from './data'

import './styles/App.scss'

const App = () => {
    const audioRef = useRef(null)

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    })
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [libraryStatus, setLibraryStatus] = useState(false)
    
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedContent = Math.round(current)
        const roundedDuration = Math.round(duration)
        const animation = Math.round((roundedContent / roundedDuration) * 100)
        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
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
                setSongs={setSongs}
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

