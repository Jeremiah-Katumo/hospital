import { promiseConn } from '../database/dbConnection.js';
import { DoctorService } from '../services/doctorServices.js';
import { EmployerService } from '../services/employerServices.js';


const injector = {
    services: {
        DoctorService: new DoctorService(promiseConn),
        EmployerService: new EmployerService(promiseConn),
    },
    get(serviceName) {
        return this.services[serviceName];
    },
};

export default injector;
