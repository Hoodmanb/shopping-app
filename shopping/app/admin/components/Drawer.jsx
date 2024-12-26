"use client";

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import {
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import TransformIcon from '@mui/icons-material/Transform';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PendingIcon from '@mui/icons-material/Pending';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ReviewsIcon from '@mui/icons-material/Reviews';

import {
  AppProvider,
  DashboardLayout,
  Account,
} from '@toolpad/core';

import Image from 'next/image';
import logo from '@/app/assets/images/download.jpg';

import Interface from "./Interface";

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
    title: 'Transaction',
  },
  {
    segment: 'successful',
    title: 'Successful',
    icon: <DoneAllIcon />,
  },
  {
    segment: 'refund',
    title: 'Refund',
    icon: <KeyboardReturnIcon />,
  },
  {
    segment: 'pending',
    title: 'Pending',
    icon: <PendingIcon />,
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
    segment: 'subscription',
    title: 'Subscription',
    icon: <SubscriptionsIcon />,
  },
  {
    segment: 'review',
    title: 'Review',
    icon: <ReviewsIcon />,
  },
];

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Interface pathname={pathname} />
    </Box>
  );
}

DemoPageContent.propTypes = { pathname: PropTypes.string.isRequired };

const SidebarFooterAccount = () => (
  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', columnGap: 2 }}>
    <Avatar
      sx={{ width: 32, height: 32 }}
      src="https://avatars.githubusercontent.com/u/19550456"
      alt="Bharat Kashyap"
    />
    <Typography variant="body2">Bharat Kashyap</Typography>
  </Box>
);

const DashboardLayoutAccountSidebar = ({ window }) => {
  const [pathname, setPathname] = useState('/dashboard');
  const [session, setSession] = useState({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });

  const router = useMemo(
    () => ({
      pathname,
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );

  const authentication = useMemo(
    () => ({
      signOut: () => setSession(null),
    }),
    []
  );

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <Image src={logo} alt="App logo" width={50} height={50} sx={{borderRadius:"50%"}}/>,
        title: 'Shopper',
        homeUrl: '/dashboard',
      }}
      router={router}
      authentication={authentication} 
      session={session}
    >
      <DashboardLayout slots={{ 
        sidebarFooter: SidebarFooterAccount,
      }}>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutAccountSidebar;