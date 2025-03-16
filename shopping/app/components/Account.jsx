"use client"

import * as React from 'react';
import {
  MenuItem,
  MenuList,
  Button,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
} from '@mui/material';
import {
  AccountPreview,
} from '@toolpad/core/Account';
import {
  useNotifications,
} from '@toolpad/core/useNotifications';
import useAuthStore from '@/app/store/authStore';

export default function Account() {
  const { user, clearUser, userData } = useAuthStore();

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const account = {
    name: userData.name ? capitalizeFirstLetter(userData.name) : 'John Doe',
    email: userData.email || "johndoe@gmail.com",
    color: '#8B4513',
    photo: userData.photoURL || ""
  };

  const notifications = useNotifications();

  const showNotification = (text, type) => {
    notifications.show(text, {
      severity: type,
      autoHideDuration: 3000,
    });
  };

  async function logout() {
    if (user) {
      try {
        console.log(user);
        await clearUser();
        // console.log('user logged out');
        showNotification('logged out successfully', 'success');
      } catch (err) {
        showNotification('error logging out', 'error');
        // console.log(err);
      }
    } else {
      // console.log('user is not logged in');
      showNotification('error logging out', 'error');
    }
  }

  return (
    <Stack direction="column">
      <AccountPreview variant="expanded" />
      <MenuList>
        <MenuItem
          // component="button"
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            columnGap: 1,
          }}
        >
          <ListItemIcon>

            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.5rem',
                bgcolor: account.color,
              }}
              src={account.photo ?? ''}
              alt={account.name ?? ''}
            >
              {account.name}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={account.name}
            secondary={account.email}
            primaryTypographyProps={{
              fontWeight: '500',
              color: 'text.primary',
              fontSize: '0.8rem',
            }}
            secondaryTypographyProps={{
              fontWeight: '200',
              color: 'text.primary',
              fontSize: '0.6rem',
            }}
          />
        </MenuItem>

      </MenuList>
      <Button
        variant="text"
        sx={{
          textTransform: 'none',
          display: 'flex',
          ml: 'auto',
          mr: '10px',
          color: 'red',
        }}
        size="small"
        disableElevation
        onClick={logout}
      >
        Sign Out
      </Button>
    </Stack>
  );
}
