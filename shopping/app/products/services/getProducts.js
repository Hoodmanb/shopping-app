const getProducts = async () => {
  try {
    const res = await fetch('/api/products');
    const data = await res.json();

    if (data.message === 'successful') {
      return data.products;
    }
    return data.message;
  } catch (err) {
    return err.message;
  }
};

export default getProducts;