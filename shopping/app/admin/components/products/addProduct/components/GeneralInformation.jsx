import React, { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import debounce from 'lodash/debounce'; // Install lodash: npm install lodash

export default function GeneralInformation({ setFormData }) {
  // General Information
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [gender, setGender] = useState('');
  const [size, setSize] = useState('');

  // Style
  const alignItems = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  // Debounced setFormData
  const debouncedSetFormData = useCallback(
    debounce((key, value) => {
      setFormData(key, value);
    }, 300), // Adjust debounce delay as needed
    [setFormData]
  );

  return (
    <Box>
      <h5>General Information</h5>
      <TextField
        required
        id="name"
        label="Name"
        variant="outlined"
        size="small"
        value={name}
        sx={{ marginBottom: '20px', mt: "15px" }}
        onChange={(e) => {
          setName(e.target.value);
          debouncedSetFormData('name', e.target.value);
        }}
        fullWidth
      />

      <TextField
        required
        id="description"
        label="Description"
        variant="outlined"
        size="small"
        value={description}
        multiline
        rows={4}
        sx={{ marginBottom: '20px' }}
        onChange={(e) => {
          setDescription(e.target.value);
          debouncedSetFormData('description', e.target.value);
        }}
        fullWidth
      />

      <Box sx={{ ...alignItems, marginBottom: '20px' }}>
        <FormControl sx={{ minWidth: 80, margin: 0, paddingTop: '0.6em' }} required>
          <InputLabel id="sizeLabel">Size</InputLabel>
          <Select
            labelId="sizeLabel"
            value={size}
            id="size"
            onChange={(e) => {
              setSize(e.target.value);
              debouncedSetFormData('size', e.target.value);
            }}
            autoWidth
            label="Size"
            sx={{ height: '2em' }}
          >
            <MenuItem value="xs">XS</MenuItem>
            <MenuItem value="s">S</MenuItem>
            <MenuItem value="m">M</MenuItem>
            <MenuItem value="xl">XL</MenuItem>
            <MenuItem value="xxl">XXL</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100, margin: 0, paddingTop: '0.6em' }} required>
          <InputLabel id="genderLabel">Gender</InputLabel>
          <Select
            labelId="genderLabel"
            id="gender"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              debouncedSetFormData('gender', e.target.value);
            }}
            autoWidth
            label="Gender"
            sx={{ height: '2em' }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="unisex">Unisex</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 90, margin: 0, paddingTop: '0.6em' }} required>
          <InputLabel id="colorLabel">Color</InputLabel>
          <Select
            labelId="colorLabel"
            id="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              debouncedSetFormData('color', e.target.value);
            }}
            autoWidth
            label="Color"
            sx={{ height: '2em' }}
          >
            <MenuItem value="beige">Beige</MenuItem>
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="brown">Brown</MenuItem>
            <MenuItem value="coral">Coral</MenuItem>
            <MenuItem value="cyan">Cyan</MenuItem>
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="gray">Gray</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="ivory">Ivory</MenuItem>
            <MenuItem value="lavender">Lavender</MenuItem>
            <MenuItem value="magenta">Magenta</MenuItem>
            <MenuItem value="maroon">Maroon</MenuItem>
            <MenuItem value="navy">Navy</MenuItem>
            <MenuItem value="orange">Orange</MenuItem>
            <MenuItem value="pink">Pink</MenuItem>
            <MenuItem value="purple">Purple</MenuItem>
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="teal">Teal</MenuItem>
            <MenuItem value="white">White</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}