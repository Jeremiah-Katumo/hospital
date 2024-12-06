import { promiseConn } from '../database/dbConnection.js';
import { DoctorService } from '../services/doctorServices.js';

const injector = {
    services: {
        DoctorService: new DoctorService(promiseConn),
    },
    get(serviceName) {
        return this.services[serviceName];
    },
};

export default injector;
