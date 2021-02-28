import { useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong }) => {
    const audioRef = useRef(null)

    const playSongHandler = () => {
        console.log(audioRef.current);
    }

    return (
        <div className='player'>
            <div className="time-control"> 
                <p>start time</p>
                <input type="range"/>
                <p>end time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon className='play' size="2x" icon={faPlay} onClick={playSongHandler} />
                <FontAwesomeIcon className='skip-forward' size="2x" icon={faAngleRight} />
            </div>
            <audio ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player
