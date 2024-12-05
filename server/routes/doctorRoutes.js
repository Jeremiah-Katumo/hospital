import express from 'express';
import session from 'express-session';
import { getDoctor, getDoctorList, 
    addDoctor, 
    upload, 
    postDoctor, 
    editDoctor,
    updateDoctor,
    deleteDoctor,
    confirmDeleteDoctor,
    getDoctorById,
    searchDoctor, } from '../controllers/Doctor.js';


var doctorRouter = express.Router();

doctorRouter.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

doctorRouter.get('*', getDoctor)
    .get('/doctors', getDoctorList)
    .get('/doctors/:id', getDoctorById)
    .get('/doctors/add', addDoctor)
    .post('/doctors/save', postDoctor)
    .get('/doctors/edit/:id', editDoctor)
    .post('/doctors/update/:id', updateDoctor)
    .get('/doctors/delete/:id', confirmDeleteDoctor)
    .post('/doctors/delete/:id', deleteDoctor)
    .get('/doctors/search', searchDoctor);

export default doctorRouter;