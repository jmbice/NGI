import React from 'react';
import dateFns from 'date-fns';
import PlaySVG from './PlaySVG';
import textBubble from '../../public/images/text_bubble.png';


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

  const convertDurationToTime = (s) => {
    let time = '';
    const hours = Math.floor(s / 3600);
    let minutes = Math.floor((s - (hours * 3600)) / 60);
    let seconds = s - (hours * 3600) - (minutes * 60);

    if (minutes < 10 && hours > 0) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }

    if (hours !== 0) { time += `${hours}:`; }
    time += `${minutes}:`;
    time += `${seconds}`;

    return time;
  };

  return (
    <div className="thumbWrapper">
      <div className="thumbImage">
        <img src={article.thumbnails[0].url} alt="small_thumbnail" />
      </div>
      <div className="playSVG">
        {article.contentType === 'video'
          ? <PlaySVG time={convertDurationToTime(article.metadata.duration)} />
          : null
        }
      </div>
      <div className="thumbText">
        <div className="thumbPublication">
          {abbreviateDistanceInWordsToNow(article.metadata.publishDate)}
          {' '}
          -
          <img className="textBubble" src={textBubble} alt="text_bubble" />
          {article.commentsCount === 0 ? null : article.commentsCount}
        </div>
        <div className="thumbTitle">
          {article.metadata.title ? article.metadata.title : article.metadata.headline}
        </div>
      </div>
    </div>
  );
};

export default ContentThumbs;
