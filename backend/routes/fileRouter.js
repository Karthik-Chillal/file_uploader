import { Router } from 'express';
import path from 'node:path';
import { fileUpload } from '../controllers/fileController.js';
import multer from 'multer';

const upload = multer({ dest: './uploads' });
const fileRouter = Router();

fileRouter.post('/upload', upload.single('uploaded_file'), fileUpload);

fileRouter.get('/:fileId', (req, res) => {
  const filePath = path.resolve('./uploads', req.params.fileId);
  res.sendFile(filePath);
});

export default fileRouter;
