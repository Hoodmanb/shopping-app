import mongoose from 'mongoose';

// Define the schema with correct syntax
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: { type: [String] },
  createdBy: {type:String, required: true}
});

// Check if the model already exists before creating it
const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

class Product {
  constructor() {}
  
  async isCreator(id, userId){
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        return false;
      }
      return product.createdBy.toString() === userId.toString();
    } catch (error) {
      console.error('Error in isCreator:', error);
      return false;
    }
  };

  // Method to create a new product
  async createProduct(object) {
    try {
      const newProduct = new ProductModel(object);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Method to delete a product by ID
  async deleteProduct(productId) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Method to modify a product by ID
  async modifyProduct(productId, updatedFields) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        updatedFields,
        { new: true } // Return the updated document
      );
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error
    }
  }
  
  //method to fetch all ProductSchema
  async getAllProducts(){
    try{
      const products = await ProductModel.find()
      return products
    }catch(err){
     console.error(error)
     throw error
    }
  }
  
  async getSingleProduct(id){
    try{
      const product = await ProductModel.findById(id)
      return product
    }catch(err){
      console.error(error)
      throw error
    }
  }
  
  async deleteAll(){
    ProductModel.deleteMany({})
    .then(() => console.log('All documents deleted'))
    .catch((err) => console.error('Error deleting documents:', err));
    }
}

// Correctly instantiate the Product class
const product = new Product();
export default product;