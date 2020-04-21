import { Router } from 'express';
import HomeRegistroControlles from '../controlles/homeregistroController'

class HomeRegistroRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', HomeRegistroControlles.list);
        this.router.get('/:id', HomeRegistroControlles.getOne);
        this.router.get('/id/:id/codecarrera/:codecarrera', HomeRegistroControlles.getAcademicRecords);
        this.router.post('/', HomeRegistroControlles.create);
        this.router.put('/:id', HomeRegistroControlles.update);
        this.router.delete('/:id', HomeRegistroControlles.delete);
    }
}

const homregistroRoutes = new HomeRegistroRoutes();
export default homregistroRoutes.router;