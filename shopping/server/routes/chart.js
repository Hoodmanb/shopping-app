import express from 'express'
const chartRouter = express.Router()

import {createChart, deleteChartItem, modifyChart, getCharts, deleteAllCharts} from '../controller/chart.js'
import chartCreator from "../middleware/isChartCreator.js"

chartRouter.get('/api/chart', getCharts);

chartRouter.put('/api/chart/:id', chartCreator,  modifyChart);

chartRouter.delete('/api/chart/item/:id', chartCreator, deleteChartItem);

chartRouter.post('/api/chart', createChart)

chartRouter.delete('/api/charts', deleteAllCharts)

export default chartRouter;