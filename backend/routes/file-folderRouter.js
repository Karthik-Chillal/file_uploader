import { Router } from 'express';
import { createFolder } from '../controllers/mainController.js';
const ffRouter = Router();

// ffRouter.get('/folders/:id', displayFolder);
ffRouter.post('/', createFolder);
// ffRouter.post('/files/upload', uploadFiles);

export default ffRouter;
