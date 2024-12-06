import express from "express";
import session from "express-session";
import {
    addLeave, confirmDeleteLeave, deleteLeave, editLeave,
    getLeaveList, postLeave, searchLeave, updateLeave
} from "../controllers/Leave.js";
import { useLeaveValidator } from "../validations/validations.js";
import { validate } from '../validations/index.js';


var leaveRouter = express.Router();

leaveRouter.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

leaveRouter.get('/leaves', getLeaveList)
    .get('/leaves/add', addLeave)
    .post('/leaves/save', validate(useLeaveValidator), postLeave)
    .get('/leaves/edit/:id', editLeave)
    .post('/leaves/update/:id', validate(useLeaveValidator), updateLeave)
    .get('/leaves/delete/:id', confirmDeleteLeave)
    .post('/leaves/delete/:id', deleteLeave)
    .get('/leaves/search', searchLeave);

export default leaveRouter;