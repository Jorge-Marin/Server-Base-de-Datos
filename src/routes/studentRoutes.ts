import { Router } from 'express';
import StudentController from '../controlles/studentController'

class StudentRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', StudentController.list);
        this.router.get('/:id', StudentController.getOne);
        this.router.post('/', StudentController.create);
        this.router.put('/:id', StudentController.update);
        this.router.delete('/:id', StudentController.delete);
    }
}

const studentRoutes = new StudentRoutes();
export default studentRoutes.router;