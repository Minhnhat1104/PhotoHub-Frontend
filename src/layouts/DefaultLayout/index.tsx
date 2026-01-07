import Header from '../Header';
import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

function BackgroundLayout({ children }: any) {
  return (
    <Stack height={'100vh'}>
      <Header />

      <Container
        sx={{
          flex: 1,
          minHeight: 0,
          py: 2,
        }}
      >
        <Outlet />
      </Container>
    </Stack>
  );
}

export default BackgroundLayout;
