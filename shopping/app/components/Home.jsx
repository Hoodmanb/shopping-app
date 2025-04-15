"use client"
import React, { useEffect, useState } from 'react';
import {
  Box, Badge, Typography, Stack, Button, Avatar, Menu,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import StarIcon from '@mui/icons-material/Star';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Image from 'next/image';
import useAuthStore from '@/app/store/authStore';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@toolpad/core/useNotifications';

import image8 from '@/public/images/image8.png';
import Account from './Account';
import axiosClient from '../hooks/axiosClient';

import { useQueryClient, useQuery,} from '@tanstack/react-query';

import styles from '@/public/css-files/Home.module.css';
import Products from '../admin/components/Products';
import ProductsSkeleton from './Skeleton/Products';
import { useModalStore } from '../store/useModalStore';
import SignIn from './Auth/Login';

export default function Home() {
  const { user } = useAuthStore();
  const [isUser, setUser] = useState(null);
  const [products, setProducts] = useState({})
  const router = useRouter()
  const {openModal} = useModalStore()

  const notifications = useNotifications();
  const showNotification = (text, type) => {
    notifications.show(text, {
      severity: type,
      autoHideDuration: 3000,
    });
  };

  const theme = useTheme();
  const womenShoe = [
    'Shoes',
    'Beauty',
    'Women Fashion',
    'Jewelry',
    'Men Fashion',
  ];

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient("/api/products", "GET");
        if (response.message === "successful" && response.products.length > 0) return setProducts(response.products);
        if (response.message === "successful" && response.products.length <= 0) return setProducts("empty");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);*/

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axiosClient('/api/products', 'GET');
      /*if (response.message === 'successful') return response.products;*/
      if (response.message === 'successful') {
        if (response.products.length === 0) return 'empty';
        return response.products;
      }
      throw new Error('Failed to fetch products');
    },
  });

  useEffect(() => {
    if (data && data !== 'empty') {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    setUser(user);
  }, [user]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        padding: '10px 20px',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        marginBottom: "70px"
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          mb: '10px',
        }}
      >
        <IconButton component="a" onClick={() => {
          isUser ? router.push("/admin") : showNotification("login to access this feature", "info")
        }}>
          <AdminPanelSettingsIcon
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: '50%',
              color: (theme) => theme.customColors.green,
              p: '2px',
            }}
          />
        </IconButton>
        <Stack direction="row" gap={2}>
          <IconButton sx={{ marginLeft: 'auto' }} onClick={() => showNotification("feature not available yet", "info")}>
            <Badge variant="dot" color="primary">
              <NotificationsIcon
                sx={{
                  backgroundColor: '#EFEFEF',
                  borderRadius: '50%',
                }}
              />
            </Badge>
          </IconButton>

          {isUser && (
            <IconButton>
              <Avatar
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.95rem',
                }}
                src=""
                alt=""
              />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{ p: 0, m: 0 }}
          >
            <Account />
          </Menu>
          {!isUser && (
            <Button
              variant="text"
              size="small"
              onClick={() => 
                openModal(SignIn)
              }
              sx={{
                textTransform: 'none',
                color: (theme) => theme.customColors.green,
              }}
            >
              Log In
            </Button>
          )}
        </Stack>
      </Box>

      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: 'none',
          borderRadius: '30px',
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="Search product">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search products' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <TuneIcon />
        </IconButton>
      </Paper>

      <Box
        sx={{
          backgroundColor: (theme) => theme.customColors.green,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          mt: '20px',
          borderRadius: '10px',
          width: '100%',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            width: '50%',
            p: '10px 15px',
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <b>Super Sale Discount</b>
          {' '}
          up to
          <b>50%</b>
          <Button
            variant="contained"
            sx={{
              borderRadius: '20px',
              backgroundColor: 'white',
              color: (theme) => theme.customColors.green,
              textTransform: 'none',
            }}
          >
            Shop Now
          </Button>
        </Typography>
        <Image
          src={image8}
          width="50%"
          alt="product image"
          style={{
            backgroundColor: 'transparent',
            maxWidth: '50%',
            maxHeight: '7em',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginBottom: '10px',
        }}
      >
        <div className={styles.labels}>
          <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
            Categories
          </Typography>
          <Button
            sx={{
              textTransform: 'none',
              color: (theme) => theme.customColors.green,
            }}
          >
            See All
          </Button>
        </div>
        {/* <div>
      <Button onClick={() => { showNotification("Notification!", "info")}}>Show Notification</Button>
    </div> */}
        <Stack
          className={styles.categories}
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].slice(0, 5).map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%', // Take full width of parent
                padding: '10px', // Add some padding
                boxSizing: 'border-box', // Ensure padding is included in width
                flexWrap: 'wrap', // Allow wrapping on smaller screens
              }}
            >
              <div
                style={{
                  flexShrink: 0, // Prevent image from shrinking
                  marginRight: '10px', // Space between image and text
                  display: 'flex', // Needed to center image
                  // alignItems: 'center' // Needed to center image
                }}
              >
                <Image
                  src={image8}
                  alt="product image"
                  style={{
                    borderRadius: '50%',
                    backgroundColor: theme.palette.background.paper,
                    maxWidth: '50px', // Fixed max width for image
                    maxHeight: '50px', // Fixed max height for image
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover' // prevent image distortion
                  }}
                />
              </div>
              <h6
                // className={styles.categoriesname}
                style={{
                  margin: 0, // Remove default margin from h6
                  flexGrow: 1, // Allow text to take remaining space
                  whiteSpace: 'wrap', // Prevent text from wrapping if possible
                  overflow: 'hidden', // Hide overflow text
                  textOverflow: 'ellipsis', // Add ellipsis to hidden text
                  fontSize: "0.5em",
                  fontWeight: "400"
                }}
              >
                {womenShoe[item]}
              </h6>
            </div>
          ))}
        </Stack>
      </Box>
      
      {
        isLoading ? (<ProductsSkeleton/> ) :
        error ? (<Box>Error</Box>) :
        products.length >= 1 && products !== "empty" ? (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {products.map((item) => (
              <Box
                component={"a"}
                href={`/product/${item._id}`}
                key={item._id}
                sx={{
                  width: '48%',
                  minWidth: "120px",
                  maxWidth: "190px",
                  borderRadius: '10px',
                  position: 'relative',
                  color: "text.primary",
                  marginBottom: "15px",
                  // height: "200px"
                  fontSize: "1.4em"
                }}

                className={styles.zoomable}
              >
                {item.discount >= 1 ? (<span
                  className={styles.productdiscount}
                  style={{ backgroundColor: theme.customColors.green }}
                >
                  -{item.discount}%
                </span>) : ""}
                <img
                  src={item.images.length > 0 ? item.images[0] : image8}
                  alt={item.name}
                  style={{ backgroundColor: theme.palette.background.paper }}
                  width={"100%"}
                  height={"100%"}
                  className={styles.productimage}
                // priority
                />
                <div className={styles.productdetails}>
                  <div>
                    <h6 className={styles.productname}>{item.name}</h6>
                    <h5 className={styles.productprice}>${item.price}</h5>
                  </div>
                  <div style={{
                    display: "flex", alignItems: "end",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    flexDirection: "column"
                  }}>
                    <h6 className={styles.productrating}>
                      <StarIcon
                        sx={{
                          fontSize: '0.9em',
                          color: 'orange',
                        }}
                      />
                      5.56
                    </h6>
                    <h5 style={{
                      textAlign: "right",
                      fontWeight: "400",
                      fontSize: "0.6em"
                    }}>{item.stock} items left</h5>
                  </div>
                </div>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            Nothing was found
          </Box>
        )
      }

    </Box >
  );
}
