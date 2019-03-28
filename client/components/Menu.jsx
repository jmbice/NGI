import React from 'react';
import MenuItem from './MenuItem';


const Menu = (props) => {
  const { filter, changeFilter } = props;

  return (
    <div className="menuWrapper">
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
        title="Articles"d}
      />
    </div>
  );
};

export default Menu;
