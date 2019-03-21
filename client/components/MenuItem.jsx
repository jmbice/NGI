import React from 'react';

const MenuItem = (props) => {
  const { itemType, text, changeFilter, filter, passive, active, selected } = props;

  let item = passive;
  let latestHover = active;
  if (filter === itemType) {
    item = selected;
    latestHover = selected;
  }

  return (
    <button
      type="button"
      value={itemType}
      className={filter === itemType ? 'menu-btn-active' : 'menu-btn'}
      onClick={changeFilter}
      onMouseOver={e => e.currentTarget.children[0].src = latestHover}
      onMouseLeave={e => e.currentTarget.children[0].src = item}
    >
      <img className="menuPNG" src={item} alt="latest" />
      <div className="menuText">{text}</div>
    </button>
  );
};

export default MenuItem;
