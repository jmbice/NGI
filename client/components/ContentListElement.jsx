import React from 'react';
import dateFns from 'date-fns';
import textBubble from '../../public/images/text_bubble.png';
import PlaySVG from './PlaySVG';

const ContentListElement = (props) => {
  const { article } = props;

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
    <div className="listElementWrapper">
      <div className="listElementImage">
        <img src={article.thumbnails[0].url} alt="small_thumbnail" />
      </div>
      <div className="listElementSVG">
        {article.contentType === 'video'
          ? <PlaySVG time={convertDurationToTime(article.metadata.duration)} />
          : null
        }
      </div>
      <div className="listElementText">
        <div className="listElementPublication">
          {abbreviateDistanceInWordsToNow(article.metadata.publishDate)}
          {' '}
          -
          <img className="listElementCommentPNG" src={textBubble} alt="text_bubble" />
          {article.commentsCount === 0 ? null : article.commentsCount}
        </div>
        <div className="listElementTitle">
          {article.metadata.title ? article.metadata.title : article.metadata.headline}
        </div>
      </div>
    </div>
  );
};

export default ContentListElement;
