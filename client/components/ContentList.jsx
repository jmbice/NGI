import React from 'react';
import ContentListElement from './ContentListElement';

const ContentList = (props) => {
  const { content } = props;
  return (
    <ul>
      {content.map(e => <ContentListElement article={e} key={e.contentId} />)}
    </ul>
  );
};

export default ContentList;
