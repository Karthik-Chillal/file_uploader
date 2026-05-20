import { pool } from '../db/pool.js';

export const createFolder = async (req, res) => {
  try {
    const parentFolderId = req.body.parent_folder_id || null;
    await pool.query(
      'INSERT INTO folders (folder_name, user_id, parent_folder_id) VALUES ($1, $2, $3)',
      [req.body.folder_name, req.user.id, parentFolderId]
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

export const displayFolder = async (req, res) => {
  try {
    const folderId = req.params.id || null;
    const currentUser = req.user.id;

    let folderQueryText = '';
    let folderQueryParams = [];

    if (folderId === null) {
      folderQueryText =
        'SELECT * FROM folders WHERE parent_folder_id IS NULL AND user_id = $1';
      folderQueryParams = [currentUser];
    } else {
      folderQueryText =
        'SELECT * FROM folders WHERE parent_folder_id = $1 AND user_id = $2';
      folderQueryParams = [folderId, currentUser];
    }

    const { rows: folders } = await pool.query(
      folderQueryText,
      folderQueryParams
    );

    let fileQueryText = '';
    let fileQueryParams = [];

    if (folderId === null) {
      fileQueryText =
        'SELECT * FROM files WHERE folder_contained_id IS NULL AND user_id = $1';
      fileQueryParams = [currentUser];
    } else {
      fileQueryText =
        'SELECT * FROM files WHERE folder_contained_id = $1 AND user_id = $2';
      fileQueryParams = [folderId, currentUser];
    }

    const { rows: files } = await pool.query(fileQueryText, fileQueryParams);
    const { rows: backFolder } = await pool.query(
      'SELECT * FROM folders WHERE id=$1',
      [folderId]
    );

    res.render('index.ejs', {
      folders: folders,
      files: files,
      currentFolderId: folderId,
      backFolderId: backFolder[0] ? backFolder[0].parent_folder_id : null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};
export const deleteFolder = async (req, res) => {
  const folderId = req.params.folderId || null;

  try {
    const { rows: folder } = await pool.query(
      'SELECT * FROM folders WHERE id=$1',
      [folderId]
    );

    if (folder.length === 0) {
      return res.redirect('/home');
    }

    const parentFolderId = folder[0].parent_folder_id;
    await pool.query('DELETE FROM folders WHERE id=$1', [folderId]);

    if (parentFolderId) {
      res.redirect(`/folders/${parentFolderId}`);
    } else {
      res.redirect('/home');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
