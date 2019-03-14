import React from 'react';
import ContentThumbs from './ContentThumbs';

const ContentThumbsList = (props) => {
  const { content } = props;
  return (
    <ul>
      {content.map(e => <ContentThumbs article={e} key={e.contentId} />)}
    </ul>
  );
};

export default ContentThumbsList;
