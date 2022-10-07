import React from 'react'
import ReactPlayer from 'react-player/lazy'

const Video = ({obtenerJuegos}) => {
  return (
    <div className='info' >
      <ReactPlayer className="info-game__video" url={obtenerJuegos.video}  controls={true} />
    </div>
  )
}

export default Video