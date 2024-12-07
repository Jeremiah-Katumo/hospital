import { promiseConn } from '../database/dbConnection.js';
import { DoctorService } from '../services/doctorServices.js';
import { EmployerService } from '../services/employerServices.js';
import { ComplainService } from '../services/complainServices.js';
import { AppointmentService } from '../services/appointmentServices.js';
import { DepartmentService } from '../services/departmentServices.js';
import { DiagnosisService } from '../services/diagnosisServices.js';
import { LeaveService } from '../services/leaveServices.js';
import { PatientService } from '../services/patientServices.js';


const injector = {
    services: {
        DoctorService: new DoctorService(promiseConn),
        EmployerService: new EmployerService(promiseConn),
        AppointMentService: new AppointmentService(promiseConn),
        ComplainService: new ComplainService(promiseConn),
        DepartmentService: new DepartmentService(promiseConn),
        DiagnosisService: new DiagnosisService(promiseConn),
        LeaveService: new LeaveService(promiseConn),
        PatientService: new PatientService(promiseConn),
    },
    get(serviceName) {
        return this.services[serviceName];
    },
};

export default injector;
