'use client'
import React, { useState } from 'react';
import Image from 'next/image';

//asset
import logo from '@/app/assets/images/download.jpg';

// mui
import { FormControlLabel, Button, IconButton, InputAdornment, Box, Checkbox, Typography, TextField, Link } from '@mui/material';
import Divider from '@mui/material/Divider';
import { NavigateBefore } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export default function Chart() {
  
  const [items, setItems] = useState([
    { logo, name: 'shoe', price: 100.00, quantity: 7, description: 'women shoe' },
    { logo, name: 'shoe', price: 100.00, quantity: 7, description: 'women shoe' },
    { logo, name: 'shoe', price: 100.00, quantity: 7, description: 'women shoe' },
    { logo, name: 'shoe', price: 100.00, quantity: 7, description: 'women shoe' },
    { logo, name: 'shoe', price: 100.00, quantity: 7, description: 'women shoe' }
  ]);

  const [total, setTotal] = useState(0.00);
  const [delivery, setFee] = useState(0.00);
  const [discount, setDiscount] = useState('0%');
  const [bagTotal, setBagTotal] = useState(0.00);

  const calculateSubtotal = () => {
    const newSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newSubtotal);
    setBagTotal(newSubtotal + delivery - (parseFloat(discount) / 100) * newSubtotal);
  };

  const handleQuantityChange = (index, delta) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(0, newItems[index].quantity + delta); // Prevent negative quantity
    setItems(newItems);
    calculateSubtotal();
  };

  const columns = [
    { column: 'Total', item: total },
    { column: 'Delivery Fee', item: delivery },
    { column: 'Discount', item: discount },
  ];

  const flexSpaceBetween = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const iconStyles = {
    // color:'white',
    fontSize: '18px',
    border: (theme) => `1px solid ${theme.palette.primary.main}`,
    padding:0,
    margin:1
  };
  
  const inputStyle = {
    margin:"20px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        // borderColor: "white", // Border color
        borderRadius:'20px',
        height:'3.3em',
      },
      "&:hover fieldset": {
        // borderColor: "white", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        // borderColor: "white", // Border color when focused
      },
    },
    "& .MuiInputLabel-root": {
      // color: "white", // Label text color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      // color: "white", // Label text color when focused
    },
    input: {
      // color: "white", // Input text color
    },
  }
  
  return (
    <Box sx={{
      // backgroundColor:'black',
      width:'100%',
      padding:'10px',
    }}>
      <div style={flexSpaceBetween}>
        <IconButton><NavigateBefore sx={{ fontSize: 30 }} /></IconButton>
        <Typography variant="h6" sx={{ fontSize: '20px' }}>My Chart</Typography> 
        <IconButton><MoreVertIcon sx={{ fontSize: 30 }} /></IconButton>
      </div>
      <hr />
      {items && items.map((item, index) => (
        <Box key={index} sx={{ ...flexSpaceBetween, marginBottom: 2, marginTop:3, borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`, padding:'10px'}}>
          <Image
            src={item.logo}
            alt="Example Image"
            width={80}  // Reduced image size
            height={80}  // Reduced image size
            style={{ borderRadius: '10px', marginRight:'10px' }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div style={{ ...flexSpaceBetween, width: '100%', marginBottom:10 }}>
              <div>
                <Typography variant="body1" sx={{ fontSize: '14px' }}>{item.name}</Typography> {/* Reduced font size */}
                <Typography variant="body2" sx={{ fontSize: '10px' }}>{item.description}</Typography>
              </div>
              <IconButton><DeleteForeverIcon sx={{ color: 'red', fontSize: 20 }} /></IconButton>
            </div>

            <div style={{ ...flexSpaceBetween, width: '100%' }}>
              <Typography variant="body1" sx={{ fontSize: '14px' }}>
                ${item.price}
              </Typography>
              <div style={flexSpaceBetween}>
                <IconButton onClick={() => handleQuantityChange(index, -1)} sx={{...iconStyles, backgroundColor:'primary', color:'secondary'}}><RemoveIcon sx={{ fontSize: 16 }} /></IconButton>
                
                <Typography variant="body1" sx={{ fontSize: '14px' }}>{item.quantity}</Typography> 
                
                <IconButton onClick={() => handleQuantityChange(index, 1)} sx={iconStyles}><AddIcon sx={{ fontSize: 16 }} /></IconButton>
              </div>
              <IconButton><BookmarkIcon sx={{ color: 'skyblue', fontSize: 20 }} /></IconButton>
            </div>
          </Box>
        </Box>
      ))}
    <div style={{textAlign:'center'}}>
<TextField
  label="Enter Promo Code"
  variant="outlined"
  sx={{
    ...inputStyle,
    '& .MuiInputBase-root': {
      paddingRight: '0px', 
      paddingTop:'0px'
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Button 
          edge="end" 
          size="large" 
          sx={{
            backgroundColor:'primary.main',
            color:'primary.sub',
            padding: '11px 15px', 
            margin: '0', 
            marginBottom:'6.8px',
            marginRight:'1px',
            borderTopRightRadius:'20px',
            borderBottomRightRadius:'20px',
            minWidth: 'auto', 
          }}
        >
          Apply
        </Button>
      </InputAdornment>
    ),
  }}
/>
</div >
      
      {columns.map((column, index) => (
        <div key={index} style={{ ...flexSpaceBetween, width: '100%' }}>
          <Typography color={index === 2 ? 'green' : 'text.primary'} variant="body1" sx={{ fontSize: '14px' }}>{column.column}</Typography> 
          <Typography color={index === 2 ? 'green' : 'text.primary'}variant="body1" sx={{ fontSize: '16px', fontWeight:'bold' }}>{column.item}</Typography> 
        </div>
      ))}
        <div style={{ ...flexSpaceBetween, width: '100%', marginTop:'15px', borderTop:'1px solid white', paddingTop:'15px' }}>
          <Typography variant="body1" sx={{ fontSize: '14px', fontWeight:'bold' }}>Bag Total</Typography> 
          <Typography variant="body1" sx={{ fontSize: '16px', fontWeight:'bold' }}>{bagTotal}</Typography> 
        </div>
      
      <Button sx={{
        backgroundColor:'green',
        width:'100%',
        color:'text.secondary',
        marginTop:'20px',
        marginBottom:'20px',
        borderRadius:'30px'
      }}
        endIcon={<ShoppingCartCheckoutIcon/>}
      >Checkout</Button>
    </Box>
  );
}