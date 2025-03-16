import React from 'react';
import { Box, Divider, Button } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function Reciept({ transaction }) {
  const status = 'shipped'; // Example status for testing
  const deliveredText = 'Your shipment was just dropped off. Go on. Open it and enjoy.';
  const shippedText = 'Your shipment is being shipped. You would be contacted soon, Thank you';
  const orderedText = 'Your order is confirmed, you would be contacted soon';

  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      quantity: 10,
      image: './file-UBZWaeUrMheB2KgDBkXpyaRb.webp',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 49.99,
      quantity: 5,
      image: './file-UBZWaeUrMheB2KgDBkXpyaRb.webp',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 19.99,
      quantity: 8,
      image: './file-UBZWaeUrMheB2KgDBkXpyaRb.webp',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 39.99,
      quantity: 12,
      image: './file-UBZWaeUrMheB2KgDBkXpyaRb.webp',
    },
  ];

  const sections = [
    {
      data: [
        { title: 'Order Id', content: 'XHLEMKSKMWLLSKMKSK' },
        { title: 'Order Id', content: 'I don’t give a shit' },
      ],
      width: '70%',
    },
    {
      data: [
        { title: 'Payment Method', content: 'Bank Transfer akajkkaoosoksklospooala' },
        { title: 'Shipping Address', content: 'no 5 awalowo road, ibadan nigeria' },
      ],
      width: '70%',
    },
  ];

  const priceDetails = [{ tag: 'Shipping', price: '200.00' }, { tag: 'Discount', price: '10' }, { tag: 'Tax', price: '0.00' }, { tag: 'Total', price: '190' }];

  const alignItems = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  };

  function DataBox({ data, sx }) {
    return (
      <Box sx={sx}>
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: '15px', width: '50%' }}>
            <h6 style={{
              margin: 0,
              wordBreak: 'break-word',
              whiteSpace: 'normal',
            }}
            >
              {item.title}
            </h6>
            <p style={{
              fontSize: '0.75rem', margin: 0, wordBreak: 'break-word', whiteSpace: 'normal',
            }}
            >
              {item.content}
            </p>
          </div>
        ))}
      </Box>
    );
  }

  return (

    <Box sx={{ m: '10px' }}>
      <h4>Hello Nwigiri Joshua,</h4>
      <h6>
        {
        status === 'delivered' ? `${deliveredText}`
          : status === 'shipped' ? `${shippedText}`
            : `${orderedText}`
      }
      </h6>

      <Box>
        <Box sx={{ ...alignItems }}>

          <CheckCircleIcon sx={{ color: 'green' }} />

          <Divider sx={{ width: '40%', borderColor: `${status === 'shipped' || status === 'delivered' ? 'green' : 'grey'}`, borderWidth: 2 }} />
          <CheckCircleIcon sx={{ color: `${status === 'shipped' || status === 'delivered' ? 'green' : 'grey'}` }} />

          <Divider sx={{ width: '40%', borderColor: `${status === 'delivered' ? 'green' : 'grey'}`, borderWidth: 2 }} />
          <CheckCircleIcon sx={{ color: `${status === 'delivered' ? 'green' : 'grey'}` }} />
        </Box>

        {/* Align the labels with the icons */}
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', p: 0, mb: '20px',
        }}
        >
          {['Ordered', 'Shipped', 'Delivered'].map((label) => (
            <Box
              key={label}
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0,
              }}
            >
              <h5 style={{ padding: 0, margin: 0 }}>{label}</h5>
            </Box>
          ))}
        </Box>

        { products.map((product, index) => (
          <Box
            sx={{
              ...alignItems, borderRadius: '10px', backgroundColor: 'grey', mb: '10px', pr: '5px', pl: '5px',
            }}
            key={product.id}
          >
            <Box sx={alignItems} key={product.id}>
              <img
                src={product.image}
                style={{
                  width: '60px', height: '60px', borderRadius: '5px', marginRight: '20px',
                }}
              />
              <Box>
                <h5>{product.name}</h5>
                <h6>
                  Id:
                  {product.id}
                </h6>
              </Box>
            </Box>
            <Box>
              <h5>
                $
                {product.price}
              </h5>
              <h6>
                Quantity:
                {product.quantity}
              </h6>
            </Box>
          </Box>
        ))}

        <Divider sx={{ mt: '20px' }} />
        <Button sx={{
          mt: '5px', mb: '5px', fontSize: '10px', color: 'black',
        }}
        >
          <LocalShippingIcon sx={{ color: 'blue' }} />
          {' '}
          Track Shipment
        </Button>
        <Divider />
      </Box>

      <Box className="footer">
        {sections.map((section, index) => (
          <DataBox
            key={index}
            data={section.data}
            sx={{
              ...alignItems, width: section.width, mt: '15px', mb: '15px',
            }}
          />
        ))}

        {priceDetails.map((prices, index) => (
          <Box sx={{ textAlign: 'right', width: '60%', marginLeft: 'auto' }}>
            <div style={{ ...alignItems, gap: '20px' }}>
              <h6 style={{ margin: '0' }}>{prices.tag}</h6>
              <p style={{ fontSize: '0.75rem', margin: 0 }}>
                {prices.tag !== 'Discount' ? `$${prices.price}` : prices.price}
              </p>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
