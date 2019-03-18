import React from 'react';
import dateFns from 'date-fns';

// import ign from '../../public/images/IGN_Logo.png';

const ContentThumbs = (props) => {
  const { article } = props;

  return (
    <div className="thumbWrapper">
      <div className="thumbImage">
        <img src={article.thumbnails[0].url} alt="small_thumbnail" />
      </div>
      <div className="thumbText">
        <div className="thumbPublication">
          {dateFns(article.metadata.publishDate).format('MM/DD/YYYY')}
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
