'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

import HomeIcon from '@mui/icons-material/Home';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';

import Cart from "./Cart"
import Home from './Home';
import Profile from './Profile';
import { Box } from '@mui/material';
import Categories from './Categories';
import Chat from './Chat';
import '@/public/css-files/dashboard.css'; // Corrected import

export default function NavigationPanel() {
  const router = useRouter();
  const pathname = usePathname();

  const routes = ['/dashboard', '/categories', '/chat', '/chart', '/profile'];
  const icons = [HomeIcon, CategoryIcon, ChatBubbleIcon, ShoppingCartIcon, PersonIcon];
  const iconsText = ["Home", "Category", "Chat", "Cart", "You"];

  const activeIndex = routes.indexOf(pathname);

  return (
    <div>
      <div className="mySwiperSlide">
        {activeIndex === 0 && <Home />}
        {activeIndex === 1 && <Categories />}
        {activeIndex === 2 && <Chat />}
        {activeIndex === 3 && <Cart />}
        {activeIndex === 4 && <Profile />}
      </div>

      {/* Custom Navigation Panel */}
      <Box sx={{
        width: "90%",
        margin: "auto",
        borderRadius: "15px",
        backgroundColor: "background.paper",
        justifySelf: "center",
        marginBottom: "-10px"
        // borderTopLeftRadius: "10px",
        // borderTopRightRadius: "10px"
      }} className="custom-pagination">
        {icons.map((IconComponent, index) => (
          <span key={iconsText[index]}>
            <span
              className={`bullet ${index === activeIndex ? 'active' : ''} ${index === 2 ? 'center' : 'side'}`}
              onClick={() => router.push(routes[index])}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <IconComponent fontSize="medium" />
            </span>
            {index !== 2 && index === activeIndex ? (<h6 style={{
              fontSize: "0.5em",
              cursor: "pointer"
            }}
              className={` text ${index === activeIndex ? 'active' : ''}`}
            >{iconsText[index]}</h6>) : ""}
          </span>
        ))}
      </Box>
    </div>
  );
}


