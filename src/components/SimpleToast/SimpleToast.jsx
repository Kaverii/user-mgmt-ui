import React from 'react';
import './SimpleToast.scss';

function SimpleToast({text}) {
  return (
    <div className="simple-toast-wrap">
      <h3>{text}</h3>
    </div>
  );
}

export default SimpleToast;
