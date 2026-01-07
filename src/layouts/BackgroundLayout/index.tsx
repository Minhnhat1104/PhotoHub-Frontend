import Header from '../Header';
import React from 'react';
import { Box, Stack } from '@mui/material';
import background from '~/assets/img/img.jpg';
import { Outlet } from 'react-router-dom';

function BackgroundLayout({ children }: any) {
  return (
    <Stack height={'100vh'}>
      <Header />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          width: 1,
          background: `url(${background}) no-repeat center center fixed`,
          webkitBackgroundSize: 'cover',
          mozBackgroundSize: 'cover',
          oBackgroundSize: 'cover',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}

export default BackgroundLayout;
