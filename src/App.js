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
    const [songvolume, setSongVolume] = useState(.8)

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedContent = Math.round(current)
        const roundedDuration = Math.round(duration)
        const animation = Math.round((roundedContent / roundedDuration) * 100)
        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
    }

    const songEndHandler = async() => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        if(isPlaying) {
            audioRef.current.play()
        }
    }

    return (
        <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
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
                songvolume={songvolume}
                setSongVolume={setSongVolume}
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
                className="audio"
                onTimeUpdate={timeUpdateHandler} 
                onLoadedMetadata={timeUpdateHandler} 
                ref={audioRef} 
                src={currentSong.audio}
                onEnded={songEndHandler}
            >
            </audio>
        </div>
    )
}

export default App

