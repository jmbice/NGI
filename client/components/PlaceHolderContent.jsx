import React from 'react';

const PlaceHolderContent = () => {
  const placeHolderArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <ul>
      {placeHolderArray.map(e => (
        <div className="listElementPlaceHolderWrapper" key={e}>
          <div className="listElementMedia">
            <div className="listElement-image-placeHolder" />
          </div>
          <div className="listElementText">
            <div className="listElement-text-placeHolder" />
          </div>
        </div>
      ))}
    </ul>
  );
};

export default PlaceHolderContent;
