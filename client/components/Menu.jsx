import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MenuItem from './MenuItem';

const Menu = (props) => {
  const { filter, changeFilter, menuVisible } = props;

  return (
    <Router>
      <div className={menuVisible ? 'menuWrapper' : 'menuWrapper-hidden'}>
        <Link to="/">
          <MenuItem
            filter={filter}
            changeFilter={changeFilter}
            itemType="latest"
            title="Latest"
          />
        </Link>
        <Link to="/videos/">
          <MenuItem
            filter={filter}
            changeFilter={changeFilter}
            itemType="videos"
            title="Videos"
          />
        </Link>
        <Link to="/articles/">
          <MenuItem
            filter={filter}
            changeFilter={changeFilter}
            itemType="articles"
            title="Articles"
          />
        </Link>
      </div>
    </Router>
  );
};

export default Menu;
