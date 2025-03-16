import mongoose from 'mongoose';

// Define the schema with correct syntax
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, require: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  createdBy: { type: String, required: true },

  size: { type: String },
  gender: { type: String, default: "unisex" },
  color: { type: String },
  discount: { type: String },
  discount_Type: { type: String },
  weight: { type: String },
  length: { type: String },
  width: { type: String },
  breadth: { type: String },
  images: { type: [String], required: true },
});

// Check if the model already exists before creating it
const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

class Product {
  constructor() { }

  // async isCreator(id, userId) {
  //   try {
  //     const product = await ProductModel.findById(id);
  //     if (!product) {
  //       return false;
  //     }
  //     return product.createdBy.toString() === userId.toString();
  //   } catch (error) {
  //     console.error('Error in isCreator:', error);
  //     return false;
  //   }
  // };

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

  async getProductsByIds(ids) {
    try {
      // Ensure all IDs are valid ObjectId instances
      const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));

      if (validIds.length === 0) {
        return []; // Return empty array if no valid IDs
      }

      const products = await ProductModel.find({ _id: { $in: validIds } });
      return products;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  //method to fetch all ProductSchema
  async getAllProducts() {
    try {
      const products = await ProductModel.find()
      return products
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async getSingleProduct(id) {
    try {
      const product = await ProductModel.findById(id)
      return product
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async deleteAll() {
    ProductModel.deleteMany({})
      .then(() => console.log('All documents deleted'))
      .catch((err) => console.error('Error deleting documents:', err));
  }
}

// Correctly instantiate the Product class
const product = new Product();
export default product;