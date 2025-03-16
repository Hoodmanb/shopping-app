"use client"

import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import GeneralInformation from './components/GeneralInformation';
import PricingDiscount from './components/PricingDiscount';
import ShippingDelivery from './components/ShippingDelivery';
import TopComponent from './components/TopComponent';
import ProductImage from './components/ProductImage.jsx';
import axiosClient from '@/app/hooks/axiosClient';
import useAuthStore from '@/app/store/authStore';
import uploadProject from '@/app/hooks/uploadProduct';
import {
  useNotifications,
} from '@toolpad/core/useNotifications';


export default function AddProduct() {
  const [type, setType] = useState('');
  const [data, setData] = useState({});
  const [images, setImageBlob] = useState([]);
  const { userToken } = useAuthStore();
  const [loading, setLoading] = useState(false)

  const notifications = useNotifications();

  const showNotification = (text, type) => {
    notifications.show(text, {
      severity: type,
      autoHideDuration: 3000,
    });
  };


  const setFormData = (key, newData) => {
    setData((prev) => ({ ...prev, [key]: newData }));
  };

  const setCategory = (category) => {
    setType(category);
    setFormData('category', category);
  };

  const handleSubmit = async () => {
    try {
      if (!data.category) {
        return showNotification("Category is required", "info");
      } else if (!data.name || !data.name.trim()) {
        return showNotification("Name is required", "info");
      } else if (!data.description || !data.description.trim()) {
        return showNotification("Description is required", "info");
      } else if (!data.size) {
        return showNotification("Size is required", "info");
      } else if (!data.gender) {
        return showNotification("Gender is required", "info");
      } else if (!data.color) {
        return showNotification("Color is required", "info");
      } else if (!data.price) {
        return showNotification("Price is required", "info");
      } else if (!data.stock) {
        return showNotification("Stock is required", "info");
      } else if (!images || images.length === 0) {
        return showNotification("At least one image is required", "info");
      }
      // if (!images.length) return showNotification("please upload at least one image.", "info")
      setLoading(true)
      const imagesResponse = await uploadProject(images);
      if (imagesResponse.message !== 'successful') {
        return showNotification(imagesResponse.data[0], "error")
      }

      console.log(imagesResponse.data)
      const updatedData = { ...data, images: imagesResponse.data };

      console.log(updatedData); // Should log correct data before sending request
      await axiosClient('/api/product', 'POST', updatedData, userToken);

      setLoading(false);

      // console.log(serverResponse)
      showNotification("product uploaded successfully", "success")
    } catch (error) {
      showNotification("error uploading product", "error")
    }
  };

  return (
    <Box>
      <TopComponent setCategory={setCategory} />
      <GeneralInformation setFormData={setFormData} />
      <PricingDiscount setFormData={setFormData} />
      <ProductImage setImageBlob={setImageBlob} />
      <ShippingDelivery setFormData={setFormData} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="outlined" sx={{ textTransform: 'none', borderColor: 'green' }}>Clear</Button>
        <Button variant="contained" disabled={!data.name || !data.description || !data.color || !data.gender || !data.price ||
          data.price <= 0 || !data.category || !data.stock || data.stock <= 0 || !images || images.length === 0 || !data.size}
          onClick={handleSubmit} sx={{ textTransform: 'none', backgroundColor: 'green' }} loading={loading}>Add Product</Button>
      </Box>
    </Box>
  );
}
