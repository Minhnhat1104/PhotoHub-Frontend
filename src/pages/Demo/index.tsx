import { List, ListItemButton, ListItemText, Stack, useTheme } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { demoRoute } from './demoRoute';

interface DemoProps {}

const Demo = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" sx={{ flex: 1, minHeight: 0, width: 1 }}>
      <List sx={{ width: 300, bgcolor: 'background.paper' }} component="nav">
        {demoRoute?.map((_item) => {
          if (!_item?.path) {
            return;
          }
          return (
            <ListItemButton key={_item?.path}>
              <ListItemText primary={_item?.path} />
            </ListItemButton>
          );
        })}
      </List>

      <Stack sx={{ flex: 1, minWidth: 0, ml: 3, background: theme.palette.common.white }}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default Demo;
