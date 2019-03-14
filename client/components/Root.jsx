import React from 'react';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/content')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <div className="rootWrapper">
        <h1> Latest News </h1>
        <div className="rootMenu">
          <h2>Newest</h2> <br />
          <h2>Videos</h2> <br />
          <h2>Articles</h2>
        </div>
        <div className="rootThumbsList">
        </div>
      </div>
    );
  }
}

export default Root;
