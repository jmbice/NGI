import React from 'react';
import ContentListElement from './ContentListElement';

const ContentList = (props) => {
  const { content, show, width } = props;
  return (
    <ul className={show ? 'contentListWrapper-show' : 'contentListWrapper-hide'}>
      {content.map(e => <ContentListElement news={e} key={e.contentId} screenWidth={width} />)}
    </ul>
  );
};

export default ContentList;
