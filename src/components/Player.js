import React from 'react'


const Player = () => {
    return (
        <div className='player'>
            <div className="time-control">
                <p>start time</p>
                <input type="range"/>
                <p>end time</p>
            </div>
            <div className="play-control">
                
            </div>
        </div>
    )
}

export default Player
