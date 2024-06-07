import * as React from 'react';
import { useState } from 'react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import styles from './AnkitFinalProject.module.scss'

const ToggleBtn: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
      <div className={`${styles.toggleButtonContainer} ${isDarkMode ? styles.dark : styles.light}`}>
        {/* <h1 className={styles.wrapper}> this is testing -</h1> */}
      <Toggle
        label="Dark Mode"
        inlineLabel
        checked={isDarkMode}
        onChange={handleToggle}
        onText="On"
        offText="Off"
      />
    </div>
  );
};


export default ToggleBtn;
