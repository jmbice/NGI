import React from 'react';
import ContentThumbsList from './ContentThumbsList';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allContent: [],
      videos: [],
      articles: [],
      filter: 0,
    };
  }

  componentDidMount() {
    fetch('/content')
      .then(res => res.json())
      .then((d) => {
        const videos = [];
        const articles = [];
        d.data.map((e, i) => {
          e.commentsCount = d.comments[i].count;
          e.commentsId = d.comments[i].id;
          if (e.contentType === 'article') { articles.push(e); }
          if (e.contentType === 'video') { videos.push(e); }
          return e;
        });
        this.setState({
          allContent: d.data,
          videos,
          articles,
        });
      });
  }

  render() {
    const {
      allContent, videos, articles, filter,
    } = this.state;
    let content;
    if (filter === 0) {
      content = allContent;
    }
    if (filter === 1) {
      content = videos;
    }
    if (filter === 2) {
      content = articles;
    }

    return (
      <div className="rootWrapper">
        <h1> Latest News </h1>
        <div className="rootMenu">
          <h2>Newest</h2> <br />
          <h2>Videos</h2> <br />
          <h2>Articles</h2>
        </div>
        <div className="rootThumbsList">
          <ContentThumbsList
            content={content}
          />
        </div>
      </div>
    );
  }
}

export default Root;
