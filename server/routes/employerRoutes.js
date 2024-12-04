import express from "express";
import session from "express-session";
import { 
    addEmployer, 
    confirmDeleteEmployer, 
    deleteEmployer, 
    editEmployer, 
    getEmployer, 
    getEmployerById, 
    getEmployerList, 
    postEmployer, 
    searchEmployer, 
    updateEmployer, 
    upload } from "../controllers/Employer.js";


employerRouter = express.Router();

employerRouter.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

employerRouter.get('*', getEmployer)
    .get('/', getEmployerList)
    .get('/:id', getEmployerById)
    .get('/add_employer', addEmployer)
    .post('/save_employer', upload.single("image"), postEmployer)
    .get('/edit_employer/:id', editEmployer)
    .post('/update_employer/:id', updateEmployer)
    .get('/delete_employer/:id', confirmDeleteEmployer)
    .post('/delete_employer/:id', deleteEmployer)
    .get('/search_employer', searchEmployer)

export default employerRouter;