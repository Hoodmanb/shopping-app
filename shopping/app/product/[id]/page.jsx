"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosClient from "@/app/hooks/axiosClient";
import { Box, Grid2, Button, IconButton, Stack, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useAuthStore from "@/app/store/authStore";
import { useNotifications } from '@toolpad/core/useNotifications';
import { NavigateBefore } from "@mui/icons-material";
import { useRouter } from "next/navigation";


function ImageGallery({ images = [] }) {
    const [selectedImage, setSelectedImage] = useState(images[0] || "");

    if (images.length === 0) return <p>No images available</p>;

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={0} pb={"20px"}>
            {/* Large Image Preview */}
            <Box sx={{ width: "100%", minHeight: 300, height: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                    component="img"
                    src={selectedImage}
                    alt="Selected"
                    sx={{
                        width: "100%",
                        maxWidth: 500,
                        height: "100%",
                        objectFit: "contain",
                        m: 0
                    }}
                />
            </Box>


            {/* Small Image Thumbnails */}
            {
                images.length > 1 && (
                    <Grid2 container spacing={1} justifyContent="center">
                        {images.map((img, index) => (
                            <Grid2 item key={index}>
                                <IconButton onClick={() => setSelectedImage(img)}>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            objectFit: "cover",
                                            borderRadius: 1,
                                            border: selectedImage === img ? "2px solid #1976d2" : "2px solid transparent",
                                            transition: "border 0.3s",
                                        }}
                                    />
                                </IconButton>
                            </Grid2>
                        ))}
                    </Grid2>
                )
            }
        </Box >
    );
}

export default function Product() {
    const params = useParams();
    const id = params?.id;
    const [product, setProduct] = useState(null);
    const { user, userToken } = useAuthStore()
    const router = useRouter()

    const notifications = useNotifications();

    const showNotification = (text, type) => {
        notifications.show(text, {
            severity: type,
            autoHideDuration: 3000,
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            if (!id) return; // Prevent fetching without an ID

            try {
                const response = await axiosClient(`/api/product/${id}`, "GET");

                if (response.message === "successful" && response.product?._id) {
                    setProduct(response.product);
                } else {
                    setProduct("empty");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchData();
    }, [id]); // Include `id` as a dependency

    const addToCart = async () => {
        if (!id) return;
        if (!user) return showNotification("unauthorised please sign in", "info")
        try {
            const response = await axiosClient(`/api/cart/${id}`, "POST", { quantity: 1, price: product.price }, userToken);
            console.log(response)
            if (response.status === "successful" && response.data?._id) {
                showNotification(response.message, "success")
            } else if (response.status === "exist" && response.data?._id) {
                showNotification(response.message, "info")
            }
            else {
                showNotification(response.message, "error")
            }
        } catch (err) {
            showNotification("error adding item to cart", "error")
        }
    }



    if (!product) return <p>Loading...</p>;
    if (product === "empty") return <p>No product found.</p>;

    return (
        <Box bgcolor={"background.default"}  >
            <Box sx={{ position: "absolute" }}>
                <IconButton
                    sx={{ marginBottom: '30px', marginTop: '10px', marginLeft: "20px", }}
                    onClick={() => router.back()}
                >
                    <NavigateBefore />
                </IconButton>
            </Box>
            {product.images && <ImageGallery images={product.images} />}
            <Box mt={"-20px"} sx={{
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                backgroundColor: "background.paper",
                padding: ' 0px 10px',
                pt: "30px"
            }} >
                <Stack direction={"column"} alignItems={"start"} gap={2} pb={"100px"}>
                    <Typography p={"0px 10px"} variant="subtitle1">{product.name}</Typography>
                    <Typography p={"0px 10px"} variant="subtitle2" color={product.color}> color: {product.color}</Typography>
                    <Box
                        sx={{
                            width: '70%',
                            display: 'flex',
                            justifyContent: 'space-between', // Center buttons horizontally
                            // padding: ' 0px 10px',
                        }}
                    >
                        <Button variant="text"
                            size="medium"
                            sx={{
                                pr: "20px",
                                pl: "20px",
                                margin: '0 8px',
                                backgroundColor: "background.default",
                                textTransform: "none",
                                color: "text.primary",
                            }}>
                            Details
                        </Button>
                        <Button variant="text"
                            size="medium"
                            sx={{
                                pr: "20px",
                                pl: "20px",
                                margin: '0 8px',
                                // backgroundColor: "background.default",
                                textTransform: "none",
                                color: "text.primary",
                            }}>
                            Reviews
                        </Button>
                    </Box>
<Typography
  variant="subtitle2"
  sx={{
    margin: '0 8px',
    fontWeight: 400,
    wordBreak: 'break-word', // This is key
    overflowWrap: 'break-word',
    whiteSpace: 'normal' // Make sure text wraps
  }}
>
  {product.description}
</Typography>
                </Stack>

                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between', // Center buttons horizontally
                        padding: '20px 10px',
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        backgroundColor: (theme) => theme.customColors.green,
                        // backgroundColor: 'background.paper', 
                        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow
                    }}
                >
                    <Button variant="outlined"
                        size="large"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => {
                            addToCart()
                        }}
                        sx={{
                            margin: '0 8px',
                            borderRadius: "50px",
                            backgroundColor: "background.default",
                            textTransform: "none",
                            color: "text.primary",
                            width: "40%",
                            fontSize: "0.7em"
                        }}>
                        Add To Cart
                    </Button>
                    <Button variant="contained"
                        size="large"
                        sx={{
                            margin: '0 8px',
                            borderRadius: "50px",
                            color: (theme) => theme.customColors.green,
                            width: "35%",
                            backgroundColor: "background.paper",
                            textTransform: "none",
                            fontSize: "0.7em"
                        }}>
                        Buy Now
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
