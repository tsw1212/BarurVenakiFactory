import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../css/AccessibilityButton.css';

const AccessibilityButton = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isTextLarge, setIsTextLarge] = useState(false);

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    // document.body.classList.toggle('high-contrast', !isHighContrast);
  };

  const toggleTextSize = () => {
    setIsTextLarge(!isTextLarge);
    // document.body.classList.toggle('large-text', !isTextLarge);
  };

  const classNames = `${isHighContrast ? 'high-contrast' : ''} ${isTextLarge ? 'large-text' : ''}`;


  return (
    <>
    <div className="accessibility-button">
      <button onClick={toggleHighContrast}>
        {isHighContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
      </button>
      <button onClick={toggleTextSize}>
        {isTextLarge ? 'Decrease Text Size' : 'Increase Text Size'}
      </button>
    </div>
    <div className={classNames}>
        <Outlet />
      </div>    </>
  );
};

export default AccessibilityButton;
