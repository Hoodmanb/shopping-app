import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// mui icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SpaIcon from '@mui/icons-material/Spa';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import PowerIcon from '@mui/icons-material/Power';
import ComputerIcon from '@mui/icons-material/Computer';
import Face2Icon from '@mui/icons-material/Face2';
import FaceIcon from '@mui/icons-material/Face';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import GamepadIcon from '@mui/icons-material/Gamepad';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import NetworkWifi3BarIcon from '@mui/icons-material/NetworkWifi3Bar';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import renderContent from '@/app/hooks//matchPages'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function AppBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activePage, setActivePage] = React.useState('Inbox');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pages = [
  { text: 'Orders', icon: <LocalShippingIcon /> },
  { text: 'Voutcher', icon: <DiscountIcon/> },
  { text: 'Saved Items', icon: <FavoriteBorderIcon/> },
  { text: 'Phone and Tablets', icon: <PhoneIphoneIcon/> },
  { text: 'Appliances', icon: <MicrowaveIcon/> },
  { text: 'Electronics', icon: <LiveTvIcon/> },
  { text: 'Health and Beauty', icon: <SpaIcon/> },
  { text: 'Home and Office', icon: <AddHomeWorkIcon/> },
  { text: 'Power', icon: <PowerIcon/> },
  { text: 'Computing', icon: <ComputerIcon/> },
  { text: 'Women Fashion', icon: <Face2Icon/> },
  { text: 'Men Fashion', icon: <FaceIcon/> },
  { text: 'Baby Products', icon: <ChildFriendlyIcon/> },
  { text: 'Gaming', icon: <GamepadIcon/> },
  { text: 'Sporting', icon: <SportsFootballIcon/> },
  { text: 'Automobile', icon: <ElectricCarIcon/> },
  { text: 'Food', icon: <FastfoodIcon/> },
  { text: 'Sell Products', icon: <StorefrontIcon/> },
  { text: 'Airtime', icon: <AddIcCallIcon/> },
  { text: 'Data', icon: <NetworkWifi3BarIcon/> },
  { text: 'Electricity', icon: <ElectricMeterIcon/> },
  { text: 'Support', icon: <SupportAgentIcon/> },
  { text: 'FaQ', icon: <LiveHelpIcon/> }
];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
<List>
  {pages.slice(0, 3).map((item, index) => (
    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={() => {
          setActivePage(item.text);
          handleDrawerClose();
        }}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
            },
            open
              ? {
                  mr: 3,
                }
              : {
                  mr: 'auto',
                },
          ]}
        >
         {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={[
            open
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

<List>
  <Divider />
  <Typography variant="subtitle1" sx={{ pl: 2, pt: 1 }}>
    Categories
  </Typography>
  {pages.slice(3, 17).map((item, index) => (
    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={() => {
          setActivePage(item.text);
          handleDrawerClose();
        }}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
            },
            open
              ? {
                  mr: 3,
                }
              : {
                  mr: 'auto',
                },
          ]}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={[
            open
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>
  
  <List>
  <Divider />
  <Typography variant="subtitle1" sx={{ pl: 2, pt: 1 }}>
    Our services
  </Typography>
  {pages.slice(17, 21).map((item, index) => (
    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={() => {
          setActivePage(item.text);
          handleDrawerClose();
        }}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
            },
            open
              ? {
                  mr: 3,
                }
              : {
                  mr: 'auto',
                },
          ]}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={[
            open
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

 <List>
  <Divider />
  <Typography variant="subtitle1" sx={{ pl: 2, pt: 1 }}>
    Customer Support
  </Typography>
  {pages.slice(21).map((item, index) => (
    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={() => {
          setActivePage(item.text);
          handleDrawerClose();
        }}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
            },
            open
              ? {
                  mr: 3,
                }
              : {
                  mr: 'auto',
                },
          ]}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={[
            open
              ? {
                  opacity: 1,
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {renderContent(activePage)}
      </Box>
    </Box>
  );
}