import React from 'react';
import './HorizontalLoadingSpinner.css';

const HorizontalLoadingSpinner = () => {
  return (
    <div className="roadblock-spinner">
      <div className="roadblock-stripes">
        <div className="roadblock-slashes">
          <span className="slash">/</span>
          <span className="slash">/</span>
          <span className="slash">/</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalLoadingSpinner;
