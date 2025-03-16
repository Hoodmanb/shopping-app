import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

function ProductImage({ setImageBlob }) {
  const [images, setImages] = useState([]);

  // Sync images with parent state
  useEffect(() => {
    setImageBlob(images);
  }, [images, setImageBlob]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = files.map((file, index) => ({
      id: Date.now() + index,
      src: URL.createObjectURL(file),
      alt: file.name,
      file, // Keep file for upload
    }));

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleRemove = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <Box mb={"15px"}>
      <h5>Product Images</h5>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-around',
          mt: "15px"
        }}
      >
        <Box
          sx={{
            border: '1px dashed #ccc',
            borderRadius: 1,
            width: '6em',
            height: '6em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UploadIcon sx={{ color: '#666' }} />
            <Typography sx={{ fontSize: '0.5em' }}>Upload Image</Typography>
          </div>
        </Box>
        {images.map((image) => (
          <Box
            key={image.id}
            sx={{
              position: 'relative',
              width: '6em',
              height: '6em',
              borderRadius: 1,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 1,
                boxShadow: 1,
                padding: '4px',
              }}
            >
              <Button
                size="small"
                color="error"
                sx={{ textTransform: 'none' }}
                onClick={() => handleRemove(image.id)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProductImage;
