import { pool } from '../db/pool.js';

export const fileUpload = async (req, res) => {
  try {
    const parentFolderId = req.body.parent_folder_id || null;
    console.log(req.file);
    console.log(parentFolderId);
    await pool.query(
      'INSERT INTO files (file_name, original_name, folder_contained_id, user_id, file_size, mime_type) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        req.file.filename,
        req.file.originalname,
        parentFolderId,
        req.user.id,
        req.file.size,
        req.file.mimetype,
      ]
    );
    if (parentFolderId != null) {
      res.redirect(`/folders/${parentFolderId}`);
    } else {
      res.redirect('/home');
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (req, res) => {
  // console.log(req.params.fileName);
  try {
    await pool.query('DELETE FROM files WHERE user_id=$1 AND file_name=$2', [
      req.user.id,
      req.params.fileName,
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
export const renameFile = async (req, res) => {
  try {
    const originalName = req.body.fileName;
    const userId = req.user.id;
    const file_name = req.params.fileName;

    console.log(originalName, userId, file_name);
    const updatedFile = await pool.query(
      'UPDATE files SET original_name=$1 WHERE user_id=$2 AND file_name=$3',
      [originalName, userId, file_name]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};
