import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Products from './Products';
import AddProduct from './products/addProduct/AddProduct.jsx';
import ModifyProducts from './ModifyProducts';
import Transactions from './Transactions';
import Notification from './Notification';
import Feedback from './Feedback';
import Review from './Review';
import Subscription from './Subscription';
import NotFound from './NotFound';

export default function Interface({ pathname }) {
  const [section, setSection] = useState(null);

  // Function to match the path to the correct component
  const matchPath = (path) => {
    switch (path) {
      case '/dashboard':
        return <Dashboard />;
      case '/products':
        return <Products />;
      case '/add-products':
        return <AddProduct />;
      case '/modify-products':
        return <ModifyProducts />;
      case '/orders':
        return <Transactions />;
      case '/notification':
        return <Notification />;
      case '/feedback':
        return <Feedback />;
      case '/review':
        return <Review />;
      // case '/subscription':
      //   return <Subscription />;
      default:
        return <NotFound code={path} />;
    }
  };

  // Update the section state whenever the pathname changes
  useEffect(() => {
    setSection(matchPath(pathname));
  }, [pathname]); // Dependency on pathname to re-render on path change

  return (
    <div style={{ padding: '15px', paddingTop: '0' }}>
      {section}
    </div>
  );
}
