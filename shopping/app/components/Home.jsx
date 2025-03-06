import React from 'react';
import { Box, Badge, Typography, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import StarIcon from '@mui/icons-material/Star';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import image8 from "@/app/assets/images/image8.png"
import image1 from "@/app/assets/images/image1.png"

import logo from '@/app/assets/images/download.jpg';
import Image from 'next/image';

import styles from '@/app/assets/css-files/Home.module.css'

export default function Home() {
  
  const womenShoe = ['Shoes', 'Beauty', 'Women Fashion', 'Jewelry', 'Men Fashion']
  return (
    <Box sx={{
      padding: '10px 20px',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      flexDirection:'column',
      justifyContent:'center',
      color:(theme) => theme.customColors.secondary,
    }}>
      <Box sx={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        mb:'10px'
      }}>
      <IconButton>
        <AdminPanelSettingsIcon 
        sx={{
          backgroundColor: '#ffff',
          borderRadius: '50%',
          color:'#2ECC71',
          p:'2px'
        }}/>
      </IconButton>
      <IconButton sx={{ marginLeft: 'auto' }}>
        <Badge variant="dot" color="primary">
          <NotificationsIcon 
            sx={{
              backgroundColor: 'grey',
              borderRadius: '50%',
            }}
          />
        </Badge>
      </IconButton>
      </Box>
      
      <Paper
        component="form"
        sx={{  display: 'flex', alignItems: 'center', width: "100%", border:'0.5px solid grey', borderRadius:'30px' }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="Search product">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search products' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <TuneIcon />
        </IconButton>
      </Paper>
      
      <Box sx={{
        backgroundColor:'#2ECC71',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        mt:'20px',
        borderRadius:'10px',
        width:'100%',
      }}>
        <Typography variant="h5"
          sx={{width:'50%', p:'10px 15px', color:'white'}}><b>Super Sale Discount</b> up to <b>50%</b>
        <Button variant="contained"
          sx={{borderRadius:'20px',
            backgroundColor:'white',
            color:'#2ECC71'
          }}>Shop Now</Button>  
        </Typography>
        <Image src={image8} width="50%" alt='product image'
          style={{backgroundColor:'transparent',
            maxWidth:'50%',
            maxHeight:'7em'
          }}/>
      </Box>
      
      <Box sx={{
        display:'flex', 
        flexDirection:'column',
        width:'100%',
        marginBottom:'10px'
      }}>
        <div className={styles.labels}>
          <h6>Categories</h6>
          <Button>See All</Button>
        </div>
        <div className={styles.categories}>
          {[0,1,2,3,4,5,6,7].slice(0, 5).map(item => (
          <span key={item} className={styles.categoriesitem}>
            <Image src={image8} alt='product image'
            style={{
              borderRadius:'50%',
              backgroundColor:'grey',
              maxWidth:'80%',
              maxHeight:'1.8em'
            }} />
            <h6 className={styles.categoriesname}>{womenShoe[item]}</h6>
          </span>
          ))}
        </div>
      </Box>
      
      <Box sx={{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between'
      }}>
      {[1,2,3,4,5,6,7,8].map(item => ( 
      <Box 
      key={item}
      sx={{
        width:'6em',
        borderRadius:'10px',
        position:'relative'
      }}>
        <span className={styles.productdiscount}></span>
        <Image /*src={`image${item}`}*/ src={image8} alt='product image' width='100%' className={styles.productimage}/>
        <div className={styles.productdetails}>
          <div>
            <h6 className={styles.productname}>airpods</h6>
            <h5 className={styles.productprice}>$300</h5>
          </div>
          <h6 className={styles.productrating}><StarIcon 
          sx={{
            fontSize:'0.9em',
            color:'orange'
          }}/>5.56</h6>
        </div>
      </Box>
      ))}
      </Box>
    </Box>
  );
}