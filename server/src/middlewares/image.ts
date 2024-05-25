import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

const VALID_MIMETYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;

export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.files || Object.values(req.files).length === 0)
      res.status(400).json({ message: 'No files were uploaded' });

    Object.values(req.files)
      .flat()
      .forEach(file => {
        if (!VALID_MIMETYPES.includes(file.mimetype)) {
          fs.unlink(file.tempFilePath, err => {
            if (err) throw err;
          });

          return res
            .status(400)
            .json({ message: 'Only images or gifs are allowed' });
        }

        if (file.size > MAX_FILE_SIZE) {
          fs.unlink(file.tempFilePath, err => {
            if (err) throw err;
          });

          return res
            .status(400)
            .json({ message: 'File size should be less than 5MB' });
        }
      });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
