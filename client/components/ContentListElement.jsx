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
    const width = window.innerWidth;
    let sizeId = 1;
    if (width > 0 && width < 400) { sizeId = 0; }
    if (width >= 400 && width < 992) { sizeId = 1; }
    if (width >= 992 && width < 1280) { sizeId = 0; }
    if (width >= 1280 && width < 1800) { sizeId = 1; }
    if (width >= 2500 && screenWidth >= width) { sizeId = 2; }
    return news.thumbnails[sizeId].url;
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
