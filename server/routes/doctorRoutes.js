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
    .get('/', getDoctorList)
    .get('/:id', getDoctorById)
    .get('/add_doctor', addDoctor)
    .post('/save_doctor', upload.single("image"), postDoctor)
    .get('/edit_doctor/:id', editDoctor)
    .post('/update_doctor/:id', updateDoctor)
    .get('/delete_doctor/:id', confirmDeleteDoctor)
    .post('/delete_doctor/:id', deleteDoctor)
    .get('/search_doctor', searchDoctor)

export default doctorRouter;