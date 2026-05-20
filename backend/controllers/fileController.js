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
