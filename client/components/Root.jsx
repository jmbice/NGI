import React from 'react';
import ign from '../../public/images/IGN_Logo.png';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img src={ign} alt="IGN_Logo" />
        <h1>Hello Cake!</h1>
      </div>
    );
  }
}

export default Root;
