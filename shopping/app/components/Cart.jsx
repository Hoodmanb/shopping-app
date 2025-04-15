'use client';

import React, { useState, useEffect } from 'react';

import {
    Button, IconButton, InputAdornment, Box, Typography, TextField,
} from '@mui/material';
import { NavigateBefore } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import useAuthStore from "@/app/store/authStore";
import axiosClient from '../hooks/axiosClient';
import { useRouter } from 'next/navigation';
import useCartStore from '../store/cartStore';
import Update from '../cart/components/UpdateCartItem'
import DeleteCartItem from '../cart/components/DeleteCartItem';
import Loading from './Loading';
import Offline from './Offline';
export default function Cart() {
    const [mounted, setMounted] = useState(false);
    const [cart, setCart] = useState({})
    const [shallowCart, setShallowCart] = useState(cart)
    const [cartItem, setCartItem] = useState([])

    const [total, setTotal] = useState(0);
    const [delivery, setFee] = useState("0.00");
    const [discount, setDiscount] = useState('0%');
    const [bagTotal, setBagTotal] = useState("0.00");
    const [extractedData, setExtractedData] = useState({})

    const { data, addOrModify, stateUpdate } = useCartStore();
    const handleUpdate = (mode, key) => {
        // console.log(key)
        mode === "add" ? addOrModify({
            [key]: (data[key] || 0) + 1
        }) : addOrModify({
            [key]: (data[key] || 0) - 1
        });
        // console.log(data)
    };


    const { user, userToken } = useAuthStore()
    const router = useRouter()
    function extractIdQuantity(obj) {
        // console.log(obj)
        const result = [];

        if (!obj?.items || !Array.isArray(obj.items)) {
            console.error("Invalid input: No items array found.");
            return result;
        }

        for (const item of obj.items) {
            if (item.chartItemId && item.quantity !== undefined) {
                result.push({
                    id: item.chartItemId,
                    quantity: item.quantity,
                    price: item.price
                });
            }
        }

        return result;
    }

    useEffect(() => {
        setMounted(true);
        const fetchData = async () => {
            try {
                const myCart = await axiosClient(`/api/cart`, "GET", {}, userToken);
                if (myCart.charts.status === "successful") {
                    setCart(myCart.charts.data)
                    // setShallowCart(myCart.charts.data)
                    const id_quantity = JSON.stringify(extractIdQuantity(myCart.charts.data))
                    setExtractedData(extractIdQuantity(myCart.charts.data))
                    extractIdQuantity(myCart.charts.data).map((item) => {
                        // console.log(extractIdQuantity(myCart.charts.data))
                        addOrModify({
                            [item.id]: item.quantity
                        })
                    })
                    const myCartItems = await axiosClient(`/api/cart-items`, "POST", id_quantity);
                    if (myCartItems.message !== "successful") return setCartItem(null)
                    // console.log(myCartItems)
                    setCartItem(myCartItems.products)
                } else {
                    setCart("empty")
                    setShallowCart("empty")
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        if (user) {
            fetchData();
        } else {
            setCartItem("offline");
        }
    }, [user, userToken, stateUpdate]); // Include `id` as a dependency

    function truncateText(text) {
        return text.length > 35 ? text.slice(0, 35) + "..." : text;
    }
    const calculateSubtotal = () => {
        if (!Array.isArray(cartItem) || cartItem.length === 0) return;
        const newSubtotal = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newSubtotal);
        setBagTotal(newSubtotal + delivery - (parseFloat(discount) / 100) * newSubtotal);
    };

    const calculateTotalPrice = (data, extractedData) => {

        if (!Array.isArray(extractedData)) {
            // console.log("extractedData is not an array:", extractedData);
            return 0;
        }

        let totalPrice = 0;

        extractedData.forEach(({ id, price }) => {
            // console.log(quantity)
            const quantity = data[id]; // Ensure this gets the correct item price
            // const price = price ? price : 0; // Default to 0 if not found
            totalPrice += quantity * price;
        });
        // console.log(totalPrice)

        setTotal(totalPrice);
        // console.log(totalPrice)
    };

    useEffect(() => {
        calculateTotalPrice(data, extractedData);
    }, [data, extractedData]);

    const columns = [
        { column: 'Total', item: total },
        { column: 'Delivery Fee', item: delivery },
        { column: 'Discount', item: discount },
    ];

    const flexSpaceBetween = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    };

    const iconStyles = {
        // color:'white',
        fontSize: '18px',
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
        padding: 0,
        margin: 1,
    };

    const inputStyle = {
        margin: '20px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '20px',
                height: '3.3em',
                background: 'none',
                border: '1px solid rgba(0, 0, 0, 0.23)', // Default border
            },

        },
    };

    if (!mounted) return <Loading />
    if (mounted && !user) return <Offline />
    return (
        <Box sx={{
            // backgroundColor:'black',
            width: '100%',
            padding: '10px',
            paddingBottom: "90px"
        }}
        >
            <div style={flexSpaceBetween}>
                <IconButton onClick={() => router.back()}><NavigateBefore sx={{ fontSize: 30 }} /></IconButton>
                {/* <Typography variant="h6" sx={{ fontSize: '20px' }}>My Chart</Typography> */}
                <IconButton><MoreVertIcon sx={{ fontSize: 30 }} /></IconButton>
            </div>
            <hr />
            {Array.isArray(cartItem) && cartItem.length > 0 && cartItem !== "offline" && cartItem.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        ...flexSpaceBetween, marginBottom: 2, marginTop: 3, borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`, padding: '10px',
                    }}
                >
                    <Box
                        component={"img"}
                        src={item.images[0]}
                        alt="Example Image"
                        style={{
                            borderRadius: '10px', marginRight: '10px',
                            width: "80px",
                            height: '80px',
                            minWidth: "80px",
                            minHeight: '80px'
                        }}
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
                        <div style={{ ...flexSpaceBetween, width: '100%', marginBottom: 10 }}>
                            <div>
                                <Typography variant="body1" sx={{ fontSize: '14px' }}>{item.name}</Typography>
                                {' '}
                                {/* Reduced font size */}
                                <Typography variant="body2" sx={{ fontSize: '10px' }}>{truncateText(item.description)}</Typography>
                            </div>
                            <DeleteCartItem id={item._id} />
                        </div>

                        <div style={{ ...flexSpaceBetween, width: '100%' }}>
                            <Typography variant="body1" sx={{ fontSize: '14px' }}>
                                $
                                {item.price}
                            </Typography>
                            <div style={flexSpaceBetween}>
                                <IconButton disabled={data[item._id] <= 1} onClick={() => handleUpdate("sub", item._id, item.quantity)} sx={{ ...iconStyles, backgroundColor: 'primary', color: 'secondary' }}><RemoveIcon sx={{ fontSize: 16 }} /></IconButton>

                                <Typography variant="body1" sx={{ fontSize: '14px' }}> {Number.isNaN(data[item._id]) ? '0' : data[item._id]}</Typography>

                                <IconButton onClick={() => handleUpdate("add", item._id, item.quantity)} sx={iconStyles}><AddIcon sx={{ fontSize: 16 }} /></IconButton>
                            </div>
                            <Update object={cart} id={item._id} quantity={data[item._id]} />
                            <IconButton><BookmarkIcon sx={{ color: 'skyblue', fontSize: 20 }} /></IconButton>
                        </div>
                    </Box>
                </Box>
            ))}
            {cartItem.length > 0 && cartItem !== "offline" ? (
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <TextField
                            label="Enter Promo Code"
                            variant="outlined"
                            sx={{
                                ...inputStyle,
                                '& .MuiInputBase-root': {
                                    paddingRight: '0px',
                                    paddingTop: '0px',
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            edge="end"
                                            size="large"
                                            sx={{
                                                backgroundColor: (theme) => theme.customColors.green,
                                                color: 'primary.sub',
                                                padding: '11px 15px',
                                                margin: '0',
                                                marginBottom: '6.8px',
                                                marginRight: '1px',
                                                borderTopRightRadius: '20px',
                                                borderBottomRightRadius: '20px',
                                                minWidth: 'auto',
                                            }}
                                        >
                                            Apply
                                        </Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    {columns.map((column, index) => (
                        <div key={index} style={{ ...flexSpaceBetween, width: '100%' }}>
                            <Typography color={index === 2 ? 'green' : 'text.primary'} variant="body1" sx={{ fontSize: '14px' }}>  {column.column}</Typography>
                            <Typography color={index === 2 ? 'green' : 'text.primary'} variant="body1" sx={{ fontSize: '16px', fontWeight: 'bold' }}>{index === 0 ? "$" : ""}{column.item}</Typography>
                        </div>
                    ))}
                    <div style={{
                        ...flexSpaceBetween, width: '100%', marginTop: '15px', borderTop: '1px solid white', paddingTop: '15px',
                    }}
                    >
                        <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 'bold' }}>Bag Total</Typography>
                        <Typography variant="body1" sx={{ fontSize: '16px', fontWeight: 'bold' }}>{bagTotal}</Typography>
                    </div>

                    <Button
                        sx={{
                            backgroundColor: 'green',
                            width: '100%',
                            color: 'text.secondary',
                            marginTop: '20px',
                            marginBottom: '20px',
                            borderRadius: '30px',
                        }}
                        endIcon={<ShoppingCartCheckoutIcon />}
                    >
                        Checkout
                    </Button>
                </div>
            ) : (
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="80vh"
                    textAlign="center"
                >
                    <Typography variant="h4" gutterBottom>
                        Your Cart is Empty
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        You have no items in your cart. Start shopping now!
                    </Typography>
                    <Box
                        component={"a"}
                        href="/dashboard"
                    >
                        Start Shopping
                    </Box>
                </Box>
            )}
        </Box>
    );
}
