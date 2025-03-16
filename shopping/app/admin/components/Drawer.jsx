'use client';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from '@mui/material/styles';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import TransformIcon from '@mui/icons-material/Transform';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { useNotifications } from '@toolpad/core/useNotifications';

import {
  AppProvider,
  DashboardLayout,
} from '@toolpad/core';

import Image from 'next/image';
import logo from '@/public/images/download.jpg';

import Interface from './Interface';
import useAuthStore from '@/app/store/authStore';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <InventoryIcon />,
  },
  {
    segment: 'add-products',
    title: 'Add Products',
    icon: <AddBoxIcon />,
  },
  {
    segment: 'modify-products',
    title: 'Modify Products',
    icon: <TransformIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Transactions',
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <DoneAllIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'General',
  },
  {
    segment: 'notification',
    title: 'Notification',
    icon: <NotificationsIcon />,
  },
  {
    segment: 'feedback',
    title: 'Feedback',
    icon: <FeedbackIcon />,
  },
  {
    segment: 'review',
    title: 'Review',
    icon: <ReviewsIcon />,
  },
];

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        // overflow: 'hidden',
        padding: '20px',
      }}
    >
      <Interface pathname={pathname} />
    </Box>
  );
}

DemoPageContent.propTypes = { pathname: PropTypes.string.isRequired };

function SidebarFooterAccount() {

  const { userData } = useAuthStore();

  const account = {
    name: userData.name ? capitalizeFirstLetter(userData.name) : 'John Doe',
    email: userData.email || "johndoe@gmail.com",
    color: '#8B4513',
    photo: userData.photoURL || ""
  };

  return (
    <Box sx={{
      p: 2, display: 'flex', alignItems: 'center', columnGap: 2,
    }}
    >


      {/* <Avatar
        sx={{ width: 32, height: 32 }}
        src="https://avatars.githubusercontent.com/u/19550456"
        alt="Bharat Kashyap"
      /> */}

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
        {account.name ?? 'john doe'}
      </Avatar>
      <Typography variant="body2">{account.name ?? 'john doe'}</Typography>
    </Box>
  );
}

function DashboardLayoutAccountSidebar() {

  const notifications = useNotifications();
  const [pathname, setPathname] = useState('/dashboard');
  const { user, clearUser, userData } = useAuthStore();


  const showNotification = (text, type) => {
    notifications.show(text, {
      severity: type,
      autoHideDuration: 3000,
    });
  };

  const [session, setSession] = useState({
    user: {
      name: userData.name ? capitalizeFirstLetter(userData.name) : 'John Doe',
      email: userData.email || "johndoe@gmail.com",
      image: userData.photoURL || ""
    },
  });

  async function logout() {
    if (user) {
      try {
        console.log(user);
        await clearUser();
        // console.log('user logged out');
        setSession({})
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

  // const theme = useTheme();
  const theme = useTheme()

  const router = useMemo(
    () => ({
      pathname,
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname],
  );

  const authentication = useMemo(
    () => ({
      signOut: () => logout(),
    }),
    [],
  );

  return (
    <AppProvider
      theme={theme}
      navigation={NAVIGATION}
      branding={{
        logo: <Image src={logo} alt="App logo" width={50} height={50} sx={{ borderRadius: '50%' }} />,
        title: 'Shopper',
        homeUrl: '/dashboard',
      }}
      router={router}
      authentication={authentication}
      session={session}

    >
      <DashboardLayout slots={{
        sidebarFooter: SidebarFooterAccount,
      }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutAccountSidebar;
