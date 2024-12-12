import express from "express"
import deleteUser from "../controller/previlagedActions.js"
import { makeAdmin, suspendUser, unsuspend} from "../admin/adminOperations.js"

const previlagedroutes = express.Router

previlagedroutes.delete("/api/user/delete", deleteUser);

previlagedroutes.post("/api/admin/create", makeAdmin);

previlagedroutes.put("/api/admin/suspend", suspendUser);

previlagedroutes.post("/api/admin/unsuspend", unsuspend)

export default previlagedroutes