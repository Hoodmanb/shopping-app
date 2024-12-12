const getBrandProducts = async (brand) => {
  try {
    const res = await fetch(`/api/${brand}/products`);
    const data = await res.json();

    if (data.message === 'successful') {
      return data.products;
    }
    return data.message;
  } catch (err) {
    return err.message;
  }
};

export default getBrandProducts;