// components/ClientDashboard.js
"use client"
import dynamic from 'next/dynamic';

const ClientComponent = dynamic(() => import('./Swiper.js'), { ssr: false });

export default function ClientDashboard() {
  return (
    <div>
      <ClientComponent />
    </div>
  );
}