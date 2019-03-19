import React from 'react';
import dateFns from 'date-fns';

// import ign from '../../public/images/IGN_Logo.png';

const ContentThumbs = (props) => {
  const { article } = props;

  const abbreviateDistanceInWordsToNow = (time) => {
    const timeInWords = dateFns.distanceInWordsToNow(time);
    let abbreviated = '';

    for (let j = 0; j < timeInWords.length; j += 1) {
      if (timeInWords.charAt(j) === ' ') {
        abbreviated += timeInWords.charAt(j + 1);
        break;
      }
      abbreviated += timeInWords.charAt(j);
    }
    return abbreviated;
  };

  return (
    <div className="thumbWrapper">
      <div className="thumbImage">
        <img src={article.thumbnails[0].url} alt="small_thumbnail" />
      </div>
      <div className="thumbText">
        <div className="thumbPublication">
          {abbreviateDistanceInWordsToNow(article.metadata.publishDate)}
          <br />
          {article.commentsCount}
        </div>
        <div className="thumbTitle">
          {article.metadata.title ? article.metadata.title : article.metadata.headline}
        </div>
      </div>
    </div>
  );
};

export default ContentThumbs;
