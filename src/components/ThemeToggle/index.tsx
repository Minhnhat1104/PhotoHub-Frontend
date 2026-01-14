import { DarkMode, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { configState } from '~/atoms/config';

const ThemeToggle = () => {
  const [config, setConfig] = useRecoilState(configState);

  return (
    <>
      <IconButton
        onClick={(e) => setConfig((prev) => ({ ...prev, mode: config?.mode === 'light' ? 'dark' : 'light' }))}
      >
        {config?.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </>
  );
};

export default ThemeToggle;
