import React from 'react';
import dateFns from 'date-fns';
import textBubble from '../../public/images/chat.png';
import PlayPng from './PlayPng';

const ContentListElement = (props) => {
  const { news, screenWidth } = props;

  const convertDurationToTime = (s) => {
    const hours = Math.floor(s / 3600);
    let minutes = Math.floor((s - (hours * 3600)) / 60);
    let seconds = s - (hours * 3600) - (minutes * 60);
    let time = '';

    if (minutes < 10 && hours > 0) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }

    if (hours !== 0) { time += `${hours}:`; }
    time += `${minutes}:`;
    time += `${seconds}`;

    return time;
  };

  const abbreviateDistanceInWordsToNow = (time) => {
    const timeInWords = dateFns.distanceInWordsToNow(time);
    let abbreviated = '';
    let numberFound = false;

    for (let j = 0; j < timeInWords.length; j += 1) {
      if (/[0-9]/.test(timeInWords.charAt(j))) {
        numberFound = true;
      }
      if (numberFound === true) {
        if (timeInWords.charAt(j) === ' ' && j + 1 < timeInWords.length) {
          abbreviated += timeInWords.charAt(j + 1);
          break;
        }
        abbreviated += timeInWords.charAt(j);
      }
    }
    return abbreviated;
  };

  const loadBestImage = () => {
    if (screenWidth && screenWidth < 1800) { return news.thumbnails[0].url; }

    const width = window.innerWidth;
    if (width < 1800) { return news.thumbnails[0].url; }
    if ((width >= 1800 && width < 2500) || screenWidth < 2500) { return news.thumbnails[1].url; }
    return news.thumbnails[2].url;
  };

  return (
    <div className="listElementWrapper">
      <div className="listElementMedia">
        <div className="newsImage">
          <img src={loadBestImage()} alt={news.contentType} />
        </div>
        {news.contentType === 'video'
          ? <PlayPng time={convertDurationToTime(news.metadata.duration)} />
          : null
        }
      </div>
      <div className="listElementText">
        <div className="listElementPublication">
          {abbreviateDistanceInWordsToNow(news.metadata.publishDate)}
          <div className="spaceBetweenDateAndComments">-</div>
          <img className="listElementCommentPNG" src={textBubble} alt="comments" />
          {news.commentsCount === 0 ? null : news.commentsCount}
        </div>
        <div className="listElementTitle">
          {news.metadata.title ? news.metadata.title : news.metadata.headline}
        </div>
      </div>
    </div>
  );
};

export default ContentListElement;
