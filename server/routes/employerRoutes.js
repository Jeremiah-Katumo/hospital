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
    upload,
} from "../controllers/Employer.js";


var employerRouter = express.Router();

employerRouter.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

employerRouter.get('*', getEmployer)
    .get('/employers', getEmployerList)
    .get('/employers/:id', getEmployerById)
    .get('/employers/add', addEmployer)
    .post('/employers/save', upload.single("image"), postEmployer)
    .get('/employers/edit/:id', editEmployer)
    .post('/employers/update/:id', updateEmployer)
    .get('/employers/delete/:id', confirmDeleteEmployer)
    .post('/employers/delete/:id', deleteEmployer)
    .get('/employers/search', searchEmployer);

export default employerRouter;