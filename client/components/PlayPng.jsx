import React from 'react';
import playPng from '../../public/images/play.png';


const PlayPng = (props) => {
  const { time } = props;

  return (
    <div className="playWrapper">
      <img src={playPng} className="playPNG" alt="test" />
      <div className="playTimeDiv">
        {time}
      </div>
    </div>
  );
};

export default PlayPng;
