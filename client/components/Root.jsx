import React from 'react';
import Menu from './Menu';
import ContentLoaded from './ContentLoaded';
import throttle from '../../modularize/throttle'; // import throttle/debounce from lodash

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.fadeAnimation = this.fadeAnimation.bind(this);
    this.getLatest = this.getLatest.bind(this);
    this.throttleGetLatest = throttle(this.throttleGetLatest.bind(this), 120000);
    this.getEarlierContent = this.getEarlierContent.bind(this);
    this.handleMenuScroll = this.handleMenuScroll.bind(this);
    this.state = {
      allContent: [],
      videos: [],
      articles: [],
      filter: 'latest',
      show: false,
      prevScrollPosition: window.pageYOffset,
      menuVisible: true,
      screenWidth: 0,
      showLoadingAnimation: false,
    };
  }

  componentDidMount() {
    this.throttleGetLatest();
    window.addEventListener('scroll', this.handleMenuScroll);
    this.setState({ screenWidth: screen.width });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleMenuScroll);
  }

  getLatest() {
    const { allContent, videos, articles } = this.state;
    const count = 20; // number of articles to load, API limits 1-20
    fetch(`/content/${count}`)
      .then(res => res.json())
      .then((d) => {
        const newVideos = [];
        const newArticles = [];
        const newAllContent = [];
        const ids = [];
        for (let j = 0; j < d.data.length; j += 1) {
          if (allContent.length > 0 && d.data[j].contentIds === allContent[0].contentIds) {
            break;
          } else {
            if (d.data[j].contentType === 'article') { newArticles.push(d.data[j]); }
            if (d.data[j].contentType === 'video') { newVideos.push(d.data[j]); }
            newAllContent.push(d.data[j]);
            ids.push(d.data[j].contentId);
          }
        }

        if (ids.length === 0) { return; }

        this.setState({
          videos: [...newVideos, ...videos],
          articles: [...newArticles, ...articles],
          allContent: [...newAllContent, ...allContent],
          showPlaceHolderData: true,
        }, () => {
          this.fadeAnimation();
          this.getComments(ids, 0);
        });
      });
  }

  getEarlierContent() {
    this.setState({ showLoadingAnimation: true });
    const { allContent, videos, articles } = this.state;
    const startIndex = allContent.length;
    const count = 20;
    fetch(`/content/${startIndex}/${count}`)
      .then(res => res.json())
      .then((d) => {
        const newVideos = [];
        const newArticles = [];
        const ids = [];

        d.data.forEach((e) => {
          if (e.contentType === 'article') { newArticles.push(e); }
          if (e.contentType === 'video') { newVideos.push(e); }
          ids.push(e.contentId);
        });

        this.setState({
          videos: [...videos, ...newVideos],
          articles: [...articles, ...newArticles],
          allContent: [...allContent, ...d.data],
          showLoadingAnimation: false,
        }, () => {
          this.getComments(ids, startIndex);
        });
      });
  }

  getComments(ids, startIndex) {
    const { allContent } = this.state;
    const newContent = [...allContent];

    fetch(`/comments/${ids}`)
      .then(res => res.json())
      .then((d) => {
        d.content.forEach((e, i) => {
          if (newContent[i + startIndex].contentId === e.id) {
            newContent[i + startIndex].commentsCount = e.count;
          }
        });

        const videos = [];
        const articles = [];
        newContent.forEach((e) => {
          if (e.contentType === 'article') { articles.push(e); }
          if (e.contentType === 'video') { videos.push(e); }
        });

        this.setState({
          videos,
          articles,
          allContent: newContent,
        });
      });
  }

  throttleGetLatest() {
    this.getLatest();
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
    if (target === 'videos') { newFilter = 'videos'; }
    if (target === 'articles') { newFilter = 'articles'; }
    if (target === 'latest') {
      newFilter = 'latest';
      this.throttleGetLatest();
    }

    this.setState({ filter: newFilter, show: false }, () => {
      this.fadeAnimation();
    });
  }

  handleMenuScroll() {
    const { prevScrollPosition } = this.state;
    const currentScroll = window.pageYOffset;
    const menuVisible = prevScrollPosition > currentScroll;

    this.setState({
      prevScrollPosition: currentScroll,
      menuVisible,
    });
  }

  render() {
    const {
      allContent, videos, articles, filter, show, menuVisible, screenWidth,
    } = this.state;

    let content;
    if (filter === 'latest') { content = allContent; }
    if (filter === 'videos') { content = videos; }
    if (filter === 'articles') { content = articles; }

    return (
      <div className="rootWrapper">
        <div className={menuVisible ? 'rootHeader' : 'rootHeader-hidden'}>
          <div className="header-title">
            Gamer News
          </div>
        </div>
        <div className="rootBody">
          <div className="body-left">
            <Menu
              menuVisible={menuVisible}
              filter={filter}
              changeFilter={this.changeFilter}
            />
          </div>
          <div className="body-content">
            {showPlaceHolderData
              ? (
                <ContentLoaded
                  content={content}
                  show={show}
                  screenWidth={screenWidth}
                  showLoadingAnimation={showLoadingAnimation}
                  getEarlierContent={this.getEarlierContent}
                />
              )
              : <PlaceHolderContent />
           }
          </div>
        </div>
      </div>
    );
  }
}

export default Root;
