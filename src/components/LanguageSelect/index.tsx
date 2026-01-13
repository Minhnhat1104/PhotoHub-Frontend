import { useRef, useState } from 'react';

import {
  Avatar,
  ClickAwayListener,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import { getUserAvatarSrc } from '~/tools/image';
import { LabelValue } from '~/types';
import Flag from 'react-world-flags';
import i18next from 'i18next';
import { LanguageOutlined } from '@mui/icons-material';

interface LanguageOption extends LabelValue {
  countryFlag: string;
}

const languageOptions: LanguageOption[] = [
  {
    label: 'Tiếng Anh',
    value: 'en',
    countryFlag: 'us',
  },
  {
    label: 'Tiếng Việt',
    value: 'vi',
    countryFlag: 'vn',
  },
];

const LanguageSelect = () => {
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

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle}>
        <LanguageOutlined />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef?.current} transition placement="bottom-start" sx={{ zIndex: 1 }}>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List>
                  {languageOptions?.map((_item) => {
                    return (
                      <ListItem disablePadding key={_item?.value}>
                        <ListItemButton
                          onClick={() => {
                            i18next.changeLanguage(_item?.value);
                            // _item?.onClick();
                            // onAfterClick && onAfterClick();
                          }}
                          // selected={isActive}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Flag code={_item?.countryFlag} width={20} />
                          </ListItemIcon>
                          <ListItemText primary={_item.label} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default LanguageSelect;
