import { useRef, useState } from 'react';

import { Avatar, Box, ButtonBase, ClickAwayListener, Fade, IconButton, Paper, Popper, Stack } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// project import

import ProfileContent from './ProfileContent';
import { useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import userImagePlaceholder from '~/assets/img/UserPlaceholder.png';

const Profile = () => {
  const theme = useTheme();
  const user = useRecoilValue(userState);

  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    setOpen(false);
  };

  const border = `1px solid ${theme.palette.border.light}`;
  return (
    <>
      <IconButton
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar alt="profile user" src={userImagePlaceholder} sx={{ width: 32, height: 32 }} />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef?.current} transition placement="bottom-end" sx={{ zIndex: 1 }}>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <ProfileContent onAfterClick={() => setOpen(false)} />
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default Profile;
