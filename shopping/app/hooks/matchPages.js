const renderContent = (activePage) => {
  switch (activePage) {
    case 'Orders':
      return 'Manage your Orders here.';
    case 'Voutcher':
      return 'View available Vouchers.';
    case 'Saved Items':
      return 'Your saved items are here.';
    case 'Phone and Tablets':
      return 'Explore Phone and Tablet deals.';
    case 'Appliances':
      return 'Find great deals on Appliances.';
    case 'Electronics':
      return 'Shop Electronics and Gadgets.';
    case 'Health and Beauty':
      return 'Discover Health and Beauty products.';
    case 'Home and Office':
      return 'Upgrade your Home and Office.';
    case 'Power':
      return 'Power solutions available here.';
    case 'Computing':
      return 'Browse Computing devices.';
    case 'Women Fashion':
      return 'Discover Women’s Fashion trends.';
    case 'Men Fashion':
      return 'Explore Men’s Fashion collections.';
    case 'Baby Products':
      return 'Shop Baby Products.';
    case 'Gaming':
      return 'Find Gaming accessories and consoles.';
    case 'Sporting':
      return 'Sporting goods are here.';
    case 'Automobile':
      return 'Automobile parts and accessories.';
    case 'Food':
      return 'Order delicious Food.';
    case 'Sell Products':
      return 'Sell your products on the platform.';
    case 'Airtime':
      return 'Buy Airtime easily.';
    case 'Data':
      return 'Purchase Data bundles.';
    case 'Electricity':
      return 'Pay for Electricity bills.';
    case 'Support':
      return 'Contact Support for help.';
    case 'FaQ':
      return 'Find answers to common questions.';
    default:
      return 'Select a page from the menu.';
  }
};

export default renderContent;