import React from 'react';

const MenuItem = (props) => {
  const { itemType, text, changeFilter, filter, passive, active, selected } = props;

  return (
    <button
      type="button"
      value={itemType}
      className={filter === itemType ? 'menu-btn-active' : 'menu-btn'}
      onClick={changeFilter}
    >
      <div className={`png-${itemType}`} alt="latest" />
      <div className="menuTitles">{text}</div>
    </button>
  );
};

export default MenuItem;
