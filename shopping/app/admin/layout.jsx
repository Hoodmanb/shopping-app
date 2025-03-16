'use client';

import React from 'react';
import { Box } from '@mui/material';
import DashboardLayoutAccountSidebar from './components/Drawer.jsx';
import useAuthStore from '../store/authStore.js';
import Offline from '../components/Offline.jsx';

export default function AdminLayout({ children }) {
  const { user } = useAuthStore()

  if (!user) return <Offline />

  return (
    <Box>
      <DashboardLayoutAccountSidebar />
      {children}
    </Box>
  );
}

