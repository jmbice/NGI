import React from 'react';
import LoadMore from './LoadMore';
import ContentList from './ContentList';


const ContentLoaded = (props) => {
  const {
    content, show, screenWidth, showLoadingAnimation, getEarlierContent
  } = props;

  return (
    <div>
      <ContentList
        content={content}
        show={show}
        screenWidth={screenWidth}
      />
      <LoadMore
        showLoadingAnimation={showLoadingAnimation}
        getEarlierContent={getEarlierContent}
      />
    </div>
  );
};


export default ContentLoaded;
