import React from 'react';

const MenuItem = (props) => {
  const { itemType, title, changeFilter, filter, passive, active, selected } = props;

  return (
    <button
      type="button"
      value={itemType}
      className={filter === itemType ? 'menu-btn-active' : 'menu-btn'}
      onClick={changeFilter}
    >
      <div className={`png-${itemType}`} alt="latest" />
      <div className="menuTitles">{title}</div>
    </button>
  );
};

export default MenuItem;
