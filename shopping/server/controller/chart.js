// controller fumctions for chart activities, a user must be logged in to user any of this fumctions
import chart from '../model/chart.js'

const chartHandler = chart

export const getCharts = async (req, res) => {
  //this fumction returns all chart items associated with the user with the authenticated userId
  const userId = req.userId
  try {
    // return the chart
    const charts = await chartHandler.getChart(userId)
    return res.json({ charts })
  } catch (err) {
    return res.json({
      err
    });
  }
}

export const addToChart = async (req, res) => {
  // function to modify a chart item
  const data = req.body;
  data.chartItemId = req.params.id
  const id = req.userId
  try {
    // Update the product
    const updatedChart = await chartHandler.addToChart(id, { ...data });
    console.log(updatedChart)
    return res.json(updatedChart);

  } catch (err) {
    console.log(err);
    return res.json({ message: 'Error adding chart', err });
  }
}

export const modifyChartItem = async (req, res) => {
  // function to modify a chart item
  const data = req.body;
  console.log(data)
  data.chartItemId = req.params.id
  const id = req.userId
  try {
    // Update the product
    const updatedChart = await chartHandler.modifyChartItem(id, { ...data });
    // console.log(updatedChart)
    return res.json(updatedChart);

  } catch (err) {
    console.log(err);
    return res.json({ message: 'Error updating chart', err });
  }
}

export const deleteChartItem = async (req, res) => {
  // function to delete a chart item with the id passed to the request body
  const id = req.body.id
  const userId = req.userId

  try {
    //delete chart item
    const deletedData = await chartHandler.deleteChartItem(userId, id);
    return res.json(deletedData)
  } catch (err) {
    return res.json({ message: "error deleting data", err })
  }
}

// export const createChart = async (req, res) => {
//   // function to create a chart
//   const data = req.body
//   const userId = req.userId
//   data['createdBy'] = userId;

//   try {
//     // chart created and item added
//     const newChart = await chartHandler.createChart({ ...data });
//     console.log(newChart);
//     return res.json({ message: 'Chart created!', newChart });
//   } catch (err) {
//     console.log(err);
//     return res.json({ message: 'Error creating product', err });
//   }
// }

export const deleteAllCharts = async (req, res) => {
  const userId = req.userId
  // function to delete a chart (and all items in it)
  try {
    //chart deleted
    const deletedCharts = await chartHandler.deleteAll(userId)
    return res.json({ message: 'deleted all chart successfully' })
  } catch (err) {
    return res.json({ message: 'Error deleting all charts', error })
  }
}