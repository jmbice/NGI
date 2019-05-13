import React from 'react';

const LoadMore = (props) => {
  const { getEarlierContent, showLoadingAnimation } = props;
  return (
    <div>
      {showLoadingAnimation
        ? (
          <div className="loading-animation-wrapper">
            <div className="loading-animation-outter">
              <div className="loading-animation-inner" />
            </div>
          </div>
        )
        : (
          <button
            type="button"
            className="loadMore-content-button"
            onClick={getEarlierContent}
          >
          Load Earlier Content
          </button>
        )
      }
    </div>
  );
};


export default LoadMore;
