import React from 'react'

// mui
import { Box, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

//mui-icon
import InventoryIcon from '@mui/icons-material/Inventory';

export default function TopComponent({setCategory}){
  
  // style
  const alignItems = {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  }
  
  return(
    <Box sx={{...alignItems}}>
      <div style={{...alignItems, width:'11em'}}><InventoryIcon/><h4>Add New Product</h4></div>
      <FormControl sx={{ minWidth: 100, padding:'0.8em' }} required>
        <InputLabel id="categoryLabel">Category</InputLabel>
        <Select
          labelId="categoryLabel"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          autoWidth
          label="Category"
          sx={{height:'2em'}}
        >
          <MenuItem value={"cloth"}>Cloth</MenuItem>
          <MenuItem value={"shoe"}>Shoe</MenuItem>
          <MenuItem value={"electronic"}>Electronic</MenuItem>
          <MenuItem value={"accessory"}>Accessory</MenuItem>
          <MenuItem value={"appliances"}>Appliances</MenuItem>
          <MenuItem value={"gadget"}>Gadget</MenuItem>
          <MenuItem value={"jewelry"}>Jewelry</MenuItem>
          <MenuItem value={"care-product"}>Care Product</MenuItem>
          <MenuItem value={"sport"}>Sport</MenuItem>
          <MenuItem value={"education"}>education</MenuItem>
          <MenuItem value={""}></MenuItem>
        </Select>
      </FormControl>
    </Box>
    )
  
}