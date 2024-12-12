const getProduct = async (id) => {
  try {
    const res = await fetch(`/api/product/${id}`);
    const data = await res.json();

    if (data.message === 'successful') {
      return data.product;
    }
    return data.message;
  } catch (err) {
    return err.message;
  }
};

export default getProduct;