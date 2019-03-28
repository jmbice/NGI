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
        text="Latest"
      />
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="videos"
        text="Videos"
      />
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="articles"
        text="Articles"d}
      />
    </div>
  );
};

export default Menu;
