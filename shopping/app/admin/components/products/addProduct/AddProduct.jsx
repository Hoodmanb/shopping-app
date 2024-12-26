import React, { useState } from "react";
import { Button, Box } from "@mui/material";

// css styles
import styles from "@/app/assets/css-files/AddProduct.css"

// Components
import GeneralInformation from "./components/GeneralInformation";
import PricingDiscount from "./components/PricingDiscount";
import ShippingDelivery from "./components/ShippingDelivery";
import TopComponent from "./components/TopComponent";
import ProductImage from "./components/ProductImage.jsx"

export default function AddProduct() {
  const alignItems = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:10
  };

  const [type, setType] = useState("");
  const [data, setData] = useState({}); 
  
  function setFormData(key, newData) {
    setData((prev) => ({
      ...prev,
      [key]: newData,
    }));
  }

  function setCategory(category) {
    setType(category);
    setFormData('category', category)
    return category;
  }

  return (
  <Box>
      <TopComponent setCategory={setCategory} />

      <GeneralInformation setFormData={setFormData}/>
      
      <PricingDiscount setFormData={setFormData}/>

      {Object.keys(data).length > 0 && (
        <Box>
          <h4>Product Data:</h4>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      )}
      
      <ProductImage/>
          
      <ShippingDelivery setFormData={setFormData}/>

      <Box sx={alignItems}>
        <Button variant="outlined">Discard</Button>
        <Button variant="contained">Add Product</Button>
      </Box>
    </Box>
  );
}