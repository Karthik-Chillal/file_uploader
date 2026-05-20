import { Router } from 'express';
import {
  displayFolder,
  createFolder,
  deleteFolder,
} from '../controllers/folderController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const folderRouter = Router();

folderRouter.get('/:id', requireAuth, displayFolder);
folderRouter.post('/', requireAuth, createFolder);
folderRouter.post('/delete/:folderId', requireAuth, deleteFolder);

export default folderRouter;
