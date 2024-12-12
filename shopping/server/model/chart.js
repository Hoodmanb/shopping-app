import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ChartSchema = new Schema({
  id: { type: String, required: true }, // Fixed typo: 'requried' to 'required'
  quantity: { type: Number, required: true }, // Fixed typo
  createdBy: { type: String, required: true }
});

// Check if the model already exists before creating it
const ChartModel = mongoose.models.Chart || mongoose.model('Chart', ChartSchema);

class Chart {
  constructor() {}

  async isCreator(chartId, userId) {
    try {
      const chart = await ChartModel.findById(chartId);
      if (!chart) {
        return false;
      }
      return chart.createdBy.toString() === userId.toString();
    } catch (error) {
      console.error('Error in isCreator:', error);
      return false; // Return false in case of an error
    }
  }

  async createChart(object) {
    try {
      const newChart = new ChartModel(object);
      const savedChart = await newChart.save();
      return savedChart;
    } catch (error) {
      console.error('Error creating chart:', error); // Fixed log message typo
      throw error;
    }
  }

  async deleteChartItem(chartId) {
    try {
      const deletedChart = await ChartModel.findByIdAndDelete(chartId);
      return deletedChart;
    } catch (error) {
      console.error('Error deleting chart:', error); // Fixed log message typo
      throw error;
    }
  }

  async modifyChart(chartId, updatedFields) {
    try {
      const updatedChart = await ChartModel.findByIdAndUpdate(
        chartId,
        updatedFields,
        { new: true } // Return the updated document
      );
      return updatedChart;
    } catch (error) {
      console.error('Error updating chart:', error); // Fixed log message typo
      throw error;
    }
  }

  async getChart(userId) {
    try {
      const charts = await ChartModel.find({ createdBy: userId });
      return charts;
    } catch (err) {
      console.error('Error fetching charts:', err); // Added log message
      return null; // Return null instead of undefined
    }
  }
  
  async deleteAll(userId){
    ChartModel.deleteMany({})
    .then(() => console.log('All documents deleted'))
    .catch((err) => console.error('Error deleting documents:', err));
  }
}

const chart = new Chart();
export default chart;