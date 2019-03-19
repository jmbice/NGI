import React from 'react';
import ContentList from './ContentList';
import Menu from './Menu';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.state = {
      allContent: [],
      videos: [],
      articles: [],
      filter: 'latest',
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

  changeFilter(e) {
    const { filter } = this.state;
    const target = e.target.value;
    if (target === filter) {
      return;
    }
    let newFilter;
    if (target === 'latest') { newFilter = 'latest'; }
    if (target === 'videos') { newFilter = 'videos'; }
    if (target === 'articles') { newFilter = 'articles'; }
    this.setState({ filter: newFilter });
  }

  render() {
    const {
      allContent, videos, articles, filter,
    } = this.state;
    let content;
    if (filter === 'latest') {
      content = allContent;
    }
    if (filter === 'videos') {
      content = videos;
    }
    if (filter === 'articles') {
      content = articles;
    }

    return (
      <div className="rootWrapper">
        <div className="rootHeader">
          <h1> Latest News </h1>
        </div>
        <div className="rootMenu">
          <Menu
            filter={filter}
            changeFilter={this.changeFilter}
          />
        </div>
        <div className="rootContent">
          <ContentList
            content={content}
          />
        </div>
      </div>
    );
  }
}

export default Root;
