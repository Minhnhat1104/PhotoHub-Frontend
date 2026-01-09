import { Box, Button, Container, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '~/assets/img/favicon.ico';
import React, { useState } from 'react';
import useConfig from '~/hooks/useConfig';
import { useAuthMutation } from '~/hooks/useAuthMutation';
import { useRecoilState } from 'recoil';
import { userState } from '~/atoms';
import { ImageOutlined, UploadOutlined } from '@mui/icons-material';
import { COOKIE_KEY, cookieService } from '~/tools/storages';
import ThemeToggle from '~/components/ThemeToggle';
import Profile from './Profile';
import NavList from './NavList';
import UploadModal from '~/pages/UploadModal';

function Header() {
  const [user, setUser] = useRecoilState(userState);
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();
  const [openWrite, setOpenWrite] = useState<boolean>(false);
  const { mUserLogout } = useAuthMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await mUserLogout.mutateAsync({});
    setUser(null);
    cookieService.remove(COOKIE_KEY.REFRESH_TOKEN);
    navigate('/login');
  };

  return (
    <>
      <Box
        px={2}
        sx={{
          width: '100%',
          height: 80,
          // position: 'fixed',
          top: 0,
          zIndex: 1,
          // boxShadow: `0 3px 6px ${theme.palette.divider}`,
          background: theme.palette.background.paper,
          borderBottom: theme.border.light,
        }}
      >
        <Container
          sx={{
            margin: 'auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Stack direction="row" alignItems="center" spacing={1} height={'100%'}>
              <img style={{ width: 40, height: 40 }} src={logo} alt="Logo" />
              <Typography fontWeight="500" fontSize={24} fontStyle={'Italic'}>
                Wallpaper
              </Typography>
            </Stack>
          </Link>
          {user ? (
            <>
              <NavList />
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton size="medium" onClick={() => setOpenWrite(true)}>
                  <UploadOutlined />
                </IconButton>
                <IconButton size="medium" href="/">
                  <ImageOutlined />
                </IconButton>
                <ThemeToggle />
                {/* <Typography pr={1}>{user.username}</Typography>
                <Button size="medium" variant="outlined" onClick={handleLogout}>
                  Log Out
                </Button> */}
                <Profile />
              </Stack>
            </>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button component={Link} variant="contained" to="/login">
                Join
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      {openWrite && <UploadModal isOpen={openWrite} onClose={() => setOpenWrite(false)} />}
    </>
  );
}

export default Header;
