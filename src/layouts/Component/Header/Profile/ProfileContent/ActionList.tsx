import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useTheme } from '@mui/material';

import { LabelValue } from '~/types';
import { LockOutlined, LogoutOutlined, SettingsOutlined, SvgIconComponent } from '@mui/icons-material';

interface ActionListProps {
  handleLogout: () => void;
  onAfterClick?: () => void;
}

interface ProfileItemInterface extends LabelValue<string, number> {
  url: string;
  icon: SvgIconComponent;
  onClick?: () => void; // if onClick is defined, url is not used
}

const ActionList = (props: ActionListProps) => {
  const { handleLogout, onAfterClick } = props;
  const navigate = useNavigate();
  const theme = useTheme();

  const profileItems: ProfileItemInterface[] = [
    {
      label: 'Setting',
      value: 0,
      url: 'setting',
      icon: SettingsOutlined,
    },
    {
      label: 'Change password',
      value: 1,
      url: 'change-password',
      icon: LockOutlined,
    },
    {
      label: 'Logout',
      value: 2,
      url: 'logout',
      icon: LogoutOutlined,
    },
  ];

  return (
    <List>
      {profileItems?.map((_item: ProfileItemInterface) => {
        const Icon = _item?.icon;

        return (
          <ListItem disablePadding>
            <ListItemButton
            // LinkComponent={NavLink}
            // selected={isActive}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText primary={_item.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ActionList;
