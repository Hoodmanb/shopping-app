import chart from '../model/chart.js';

const ChartHandler = chart;

// Ensure MongoDB client connects before processing requests

const chartCreator = async (req, res, next) => {
  // goes to the next route if the logged in user is trying to access thier own chart, returns a 401 if not
  const userId = req.userId
  const id = req.body.id
  try {
    // Assuming the user ID or relevant data is passed in the request
    const isChartCreator = await ChartHandler.isCreator(id, userId);

    if (isChartCreator) {
      return next();
    }

    return res.status(401).json({ message: "You don't have permission for this action" });
  } catch (error) {
    console.error('Error in chart Creator middleware:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default chartCreator;