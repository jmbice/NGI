import React from 'react';
import ign from '../../public/images/IGN_Logo.png';

const ContentThumbs = () => {
  return (
    <div className="thumbWrapper">
      <div className="thumbImage">
        <img src={ign} alt="place_holder" />
      </div>
      <div className="thumbText">
        <div className="thumbPublication">
          Elapsed Time since publication
        </div>
        <div className="thumbTitle">
          Title
        </div>
      </div>
    </div>
  );
};

export default ContentThumbs;
