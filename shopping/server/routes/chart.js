import express from 'express'
const chartRouter = express.Router()

import { addToChart, deleteChartItem, getCharts, deleteAllCharts, modifyChartItem } from '../controller/chart.js'
import chartCreator from "../middleware/isChartCreator.js"

chartRouter.get('/api/cart', getCharts);

chartRouter.delete('/api/cart/item', chartCreator, deleteChartItem);

chartRouter.post('/api/cart/:id', addToChart)

chartRouter.put('/api/cart/:id', modifyChartItem)

chartRouter.delete('/api/cart', deleteAllCharts)

export default chartRouter;