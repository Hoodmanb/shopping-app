import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ChartItemSchema = new Schema({
  chartItemId: { type: String, required: true, unique: true }, // Unique item identifier
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

const ChartSchema = new Schema({
  createdBy: { type: String, required: true, unique: true }, // User-specific cart
  items: [ChartItemSchema], // Array of cart items
});

// Check if the model already exists before creating it
const ChartModel = mongoose.models.Chart || mongoose.model('Chart', ChartSchema);

class Chart {
  constructor() { }

  async isCreator(chartId, userId) {
    try {
      const chart = await ChartModel.findOne({ createdBy: userId });
      if (chart) {
        return true;
      } return false
    } catch (error) {
      console.error('Error in isCreator:', error);
      return false; // Return false in case of an error
    }
  }

  // async createChart(object) {
  //   try {
  //     const newChart = new ChartModel(object);
  //     const savedChart = await newChart.save();
  //     return savedChart;
  //   } catch (error) {
  //     console.error('Error creating chart:', error); // Fixed log message typo
  //     throw error;
  //   }
  // }

  async deleteChartItem(userId, chartId) {
    try {
      // Find the chart belonging to the user
      const chart = await ChartModel.findOne({ createdBy: userId });

      if (!chart) {
        throw new Error("Chart not found for the user");
      }

      // Filter out the item with the matching `chartId`
      chart.items = chart.items.filter(item => item.chartItemId !== chartId);

      // Save the updated chart
      await chart.save();

      return { status: "successful", message: "Item deleted successfully" };
    } catch (error) {
      console.error("Error deleting chart item:", error);
      throw error;
    }
  }


  async addToChart(userId, updatedFields) {
    try {
      // Find the cart for this user
      let chart = await ChartModel.findOne({ createdBy: userId });

      if (!chart) {
        // If the chart doesn't exist, create a new one
        chart = new ChartModel({
          createdBy: userId,
          items: [updatedFields]
        });
        await chart.save();
        return { status: "successful", message: 'item added successfully', data: chart };
      }

      // Ensure chartItemId is unique before adding
      const existingItemIndex = chart.items.findIndex(
        (item) => item.chartItemId === updatedFields.chartItemId
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update it
        chart.items[existingItemIndex] = { ...chart.items[existingItemIndex], ...updatedFields };
        await chart.save();
        return { status: "exist", message: 'item already in chart', data: chart };
      }

      // Otherwise, add the new item
      chart.items.push(updatedFields);
      await chart.save();

      return { status: "successful", message: 'item added successfully', data: chart };
    } catch (error) {
      console.error('Error modifying chart:', error);
      return { status: "error", message: error.message };
    }
  }

  async modifyChartItem(userId, updatedFields) {
    try {
      // Find the cart for this user
      let chart = await ChartModel.findOne({ createdBy: userId });

      if (!chart) {
        return { status: "unfound", message: "You don't have any item in your cart" };
      }

      // Find the index of the item to update
      const existingItemIndex = chart.items.findIndex(
        (item) => item.chartItemId === updatedFields.chartItemId
      );

      if (existingItemIndex !== -1) {
        // Update only the matching item
        chart.items[existingItemIndex] = {
          ...chart.items[existingItemIndex],
          ...updatedFields
        };

        await chart.save();

        return {
          status: "successful",
          message: "Item updated successfully",
          data: chart.items[existingItemIndex] // Return only the updated item
        };
      }

      return { status: "not_found", message: "item not found in your cart" };
    } catch (error) {
      console.error("Error modifying chart:", error);
      return { status: "error", message: error.message };
    }
  }



  async getChart(userId) {
    try {
      let charts = await ChartModel.findOne({ createdBy: userId });
      if (!charts) {

        return { status: "empty", message: 'nothing in your chart' };
      }
      return { status: "successful", message: 'successfully fetched cart', data: charts };
    } catch (err) {
      console.error('Error fetching charts:', err); // Added log message
      return { status: "error", message: err.message, error: err.message };; // Return null instead of undefined
    }
  }

  async deleteAll(userId) {
    ChartModel.deleteMany({})
      .then(() => console.log('All documents deleted'))
      .catch((err) => console.error('Error deleting documents:', err));
  }
}

const chart = new Chart();
export default chart;