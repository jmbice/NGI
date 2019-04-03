import React from 'react';
import MenuItem from './MenuItem';


const Menu = (props) => {
  const { filter, changeFilter, menuVisible } = props;

  return (
    <div className={menuVisible ? 'menuWrapper' : 'menuWrapper-hidden'}>
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="latest"
        title="Latest"
      />
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="videos"
        title="Videos"
      />
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="articles"
        title="Articles"
      />
    </div>
  );
};

export default Menu;
