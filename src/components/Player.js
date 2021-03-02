
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause, faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const Player = ({ songs, setSongs, currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, songvolume, setSongVolume }) => {

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map(song => {
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active: true
                }
            }
            else {
                return{
                    ...song,
                    active: false
                }
            }
        })

        setSongs(newSongs)
    }

    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        }
        else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value })
    }

    const volumeHandler = (e) => {
        setSongVolume(e)
        audioRef.current.volume = songvolume;
    }

    const volumeMinMaxHandler = (vol) => {
        if(vol === "mute") {
            setSongVolume(0)
        }
        if(vol === "full") {
            setSongVolume(1)
            audioRef.current.volume = 1;
        }
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        if(direction === "skip-forward"){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        }
        if(direction === "skip-back"){
            if((currentIndex - 1)  % songs.length === -1){
                await setCurrentSong(songs[songs.length - 1])
                activeLibraryHandler(songs[songs.length - 1])
                if(isPlaying) {
                    audioRef.current.play()
                }
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
        }
        if(isPlaying) {
            audioRef.current.play()
        }
    }

    const trackAnim = {
        transform:  `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className='player'>
            <div className="time-control"> 
                <p>{getTime(songInfo.currentTime)}</p>
                <div 
                    style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} 
                    className="track">
                    <input 
                        className="song-range"
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="volume-control">
                <FontAwesomeIcon 
                    icon={faVolumeMute}
                    size="2x" 
                    className="volume volume-up"
                    onClick={() => volumeMinMaxHandler("mute")}
                />
                <input 
                    value={Math.round(songvolume * 100)}
                    min={0} 
                    max={100} 
                    type="range"
                    className="volume-range"
                    onChange={(e) => volumeHandler(e.target.value / 100)}
                />
                <FontAwesomeIcon 
                    icon={faVolumeUp}
                    size="2x" 
                    className="volume volume-up"
                    onClick={() => volumeMinMaxHandler("full")}
                />
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler("skip-back")}
                    className='skip-back'
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon 
                    className='play' 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay} 
                    onClick={playSongHandler} 
                />
                <FontAwesomeIcon 
                    className='skip-forward' 
                    size="2x" 
                    icon={faAngleRight} 
                    onClick={() => skipTrackHandler("skip-forward")}
                />
            </div>

        </div>
    )
}

export default Player
