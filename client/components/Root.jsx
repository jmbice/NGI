import React from 'react';

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
      .then((data) => {
        console.log(data);
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
          //{content} goes here
        </div>
      </div>
    );
  }
}

export default Root;
