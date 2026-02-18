import React from 'react';

const ProgressBar = ({ prog }) => {
  return (
    <div className="prog" style={{ width: `${prog * 100}%` }} />
  );
};

export default ProgressBar;
