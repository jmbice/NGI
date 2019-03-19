import React from 'react';
import latestPassive from '../../public/images/latest_passive.png';
import latestActive from '../../public/images/latest_active.png';
import latestSelected from '../../public/images/latest_selected.png';
import videosPassive from '../../public/images/videos_passive.png';
import videosActive from '../../public/images/videos_active.png';
import videosSelected from '../../public/images/videos_selected.png';
import articlesPassive from '../../public/images/articles_passive.png';
import articlesActive from '../../public/images/articles_active.png';
import articlesSelected from '../../public/images/articles_selected.png';

import MenuItem from './MenuItem';


const Menu = (props) => {
  const { filter, changeFilter } = props;

  return (
    <div>
      <br />
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="latest"
        text="Latest"
        passive={latestPassive}
        active={latestActive}
        selected={latestSelected}
      />
      <br />
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="videos"
        text="Videos"
        passive={videosPassive}
        active={videosActive}
        selected={videosSelected}
      />
      <br />
      <MenuItem
        filter={filter}
        changeFilter={changeFilter}
        itemType="articles"
        text="Articles"
        passive={articlesPassive}
        active={articlesActive}
        selected={articlesSelected}
      />
    </div>
  );
};

export default Menu;
