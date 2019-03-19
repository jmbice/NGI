import React from 'react';

const PlaySVG = (props) => {
  const { time } = props;
  return (
    <svg className="playWrapper">
      <rect className="playRectangle" />
      <circle className="playCircle" />
      <polygon points="32,35 32,55 47,45" className="playTriangle" />
      <text x="70" y="55" className="playText">{time}</text>
      <div className="failDiv">
        <div className="failDivCircle">
          <div className="failDivTriangle" />
        </div>
        {time}
      </div>
    </svg>
  );
};

export default PlaySVG;
