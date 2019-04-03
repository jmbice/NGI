import React from 'react';
import ContentList from './ContentList';
import Menu from './Menu';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.fadeAnimation = this.fadeAnimation.bind(this);
    this.getLatest = this.getLatest.bind(this);
    this.state = {
      allContent: [],
      videos: [],
      articles: [],
      filter: 'latest',
      show: false,
    };
  }

  componentDidMount() {
    this.getLatest();
  }

  getLatest() {
    const { allContent } = this.state;
    fetch('/content')
      .then(res => res.json())
      .then((d) => {
        const videos = [];
        const articles = [];
        const ids = [];
        d.data.map((e) => {
          e.commentsCount = 0;
          if (e.contentType === 'article') { articles.push(e); }
          if (e.contentType === 'video') { videos.push(e); }
          ids.push(e.contentId);
          return e;
        });

        if (allContent.length > 0 && ids[0] === allContent[0].contentId) { return; }
        this.setState({
          videos,
          articles,
          allContent: d.data,
        }, () => {
          this.fadeAnimation();
          this.getComments(ids);
        });
      });
  }

  getComments(ids) {
    const { allContent } = this.state;
    const newContent = [...allContent];
    const videos = [];
    const articles = [];

    fetch(`/comments/${ids}`)
      .then(res => res.json())
      .then((d) => {
        d.content.map((e, i) => {
          if (newContent[i].contentId === e.id) {
            newContent[i].commentsCount = e.count;
            if (newContent[i].contentType === 'article') { articles.push(newContent[i]); }
            if (newContent[i].contentType === 'video') { videos.push(newContent[i]); }
          }
          return e;
        });

        this.setState({
          videos,
          articles,
          allContent: newContent,
        });
      });
  }

  fadeAnimation() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 100);
  }

  changeFilter(e) {
    const { filter } = this.state;
    const target = e.target.value;
    if (target === filter && target !== 'latest') {
      return;
    }
    let newFilter;
    if (target === 'latest') {
      newFilter = 'latest';
    }
    if (target === 'videos') { newFilter = 'videos'; }
    if (target === 'articles') { newFilter = 'articles'; }
    this.setState({ filter: newFilter, show: false }, () => {
      this.fadeAnimation();
    });
  }

  render() {
    const {
      allContent, videos, articles, filter, show,
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
        <div className="root-header">
          <div className="header-title">
            Gamer News
          </div>
        </div>
        <div className="rootBody">
          <div className="body-left">
            <Menu
              filter={filter}
              changeFilter={this.changeFilter}
            />
          </div>
          <div className="body-content">
            <ContentList
              content={content}
              show={show}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
