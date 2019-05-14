import React from 'react';

const MenuItem = (props) => {
  const { itemType, title, changeFilter, filter } = props;

  return (
    <button
      type="button"
      value={itemType}
      className={filter === itemType ? 'menu-btn-active' : 'menu-btn'}
      onClick={changeFilter}
    >
      <div className={`png-${itemType}`} alt={`${itemType}`} />
      <div className="menu-titles">{title}</div>
    </button>
  );
};

export default MenuItem;
