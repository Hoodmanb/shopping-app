import React, { useState } from 'react';

// mui
import { Box, TextField, InputAdornment } from '@mui/material';

export default function PricingDiscount({ setFormData }) {
  // Pricing And Discounts
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('');

  // style
  const inputStyle = {
    width: '45%',
    marginBottom: '20px',
  };

  return (
    <Box>
      <h5>Pricing And Discounts</h5>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mt: "15px" }}>
        <TextField
          required
          id="price"
          label="Price"
          variant="outlined"
          type="number"
          size="small"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={(e) => setFormData('price', e.target.value)}
          sx={inputStyle}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            },
          }}
        />

        <TextField
          required
          id="stock"
          label="Stock"
          variant="outlined"
          type="number"
          size="small"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          onBlur={(e) => setFormData('stock', e.target.value)}
          sx={inputStyle}
        />

        <TextField
          id="discount"
          label="Discount"
          variant="outlined"
          type="number"
          size="small"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          onBlur={(e) => setFormData('discount', e.target.value)}
          sx={inputStyle}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
        />

        <TextField
          id="discountType"
          label="Discount Type"
          variant="outlined"
          size="small"
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          onBlur={(e) => setFormData('discount_type', e.target.value)}
          sx={inputStyle}
        />
      </Box>

    </Box>
  );
}
