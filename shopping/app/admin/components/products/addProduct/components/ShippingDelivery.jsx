import React, { useState } from 'react';

// mui
import {
  Box, FormControl, FormHelperText, OutlinedInput, InputAdornment,
  Typography,
} from '@mui/material';

export default function ShippingDelivery({ setFormData }) {
  // Shipping and Delivery
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [breadth, setBreadth] = useState('');

  // style
  const inputStyle = {
    width: '45%',
    marginBottom: '20px',
  };

  return (
    <Box>
      <h5>Shipping And Delivery</h5>
      <Box sx={{ mt: "15px", display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

        <FormControl sx={inputStyle} variant="outlined">
          <OutlinedInput
            id="weight"
            value={weight}
            type="number"
            size='small'
            onChange={(e) => setWeight(e.target.value)}
            onBlur={(e) => setFormData('weight', e.target.value)}
            endAdornment={<InputAdornment position="end"><Typography sx={{ color: (theme) => theme.customColors.secondary }}>kg</Typography></InputAdornment>}
            aria-describedby="product weight"
            inputProps={{
              'aria-label': 'Product Weight',
            }}
          />
          <FormHelperText id="WeightLabel" sx={{ color: (theme) => theme.customColors.secondary }}>Weight</FormHelperText>
        </FormControl>

        <FormControl sx={inputStyle} variant="outlined">
          <OutlinedInput
            id="length"
            value={length}
            type="number"
            size='small'
            onChange={(e) => setLength(e.target.value)}
            onBlur={(e) => setFormData('length', e.target.value)}
            endAdornment={<InputAdornment position="end"><Typography sx={{ color: (theme) => theme.customColors.secondary }}>inch</Typography></InputAdornment>}
            aria-describedby="product length"
            inputProps={{
              'aria-label': 'length',
            }}
          />
          <FormHelperText id="lengthLabel" sx={{ color: (theme) => theme.customColors.secondary }}>Length</FormHelperText>
        </FormControl>

        <FormControl sx={inputStyle} variant="outlined">
          <OutlinedInput
            id="width"
            value={width}
            type="number"
            size='small'
            onChange={(e) => setWidth(e.target.value)}
            onBlur={(e) => setFormData('width', e.target.value)}
            endAdornment={<InputAdornment position="end"><Typography sx={{ color: (theme) => theme.customColors.secondary }}>inch</Typography></InputAdornment>}
            aria-describedby="product width"
            inputProps={{
              'aria-label': 'width',
            }}
          />
          <FormHelperText id="widthLabel" sx={{ color: (theme) => theme.customColors.secondary }}>Width</FormHelperText>
        </FormControl>

        <FormControl sx={inputStyle} variant="outlined">
          <OutlinedInput
            id="breadth"
            value={breadth}
            type="number"
            size='small'
            onChange={(e) => setBreadth(e.target.value)}
            onBlur={(e) => setFormData('breadth', e.target.value)}
            endAdornment={<InputAdornment position="end"><Typography sx={{ color: (theme) => theme.customColors.secondary }}>inch</Typography></InputAdornment>}
            aria-describedby="product breadth"
            inputProps={{
              'aria-label': 'breadth',
            }}
          />
          <FormHelperText id="breadthLabel" sx={{ color: (theme) => theme.customColors.secondary }}>Breadth</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}
