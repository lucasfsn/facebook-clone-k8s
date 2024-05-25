import { v2 as cloudinary } from 'cloudinary';
import { Request, RequestHandler, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import createHttpError from 'http-errors';
import env from '../utils/validateEnv';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME as string,
  api_key: env.CLOUDINARY_API_KEY as string,
  api_secret: env.CLOUDINARY_API_SECRET as string,
});

interface FilesRequest extends Request {
  files: {
    [name: string]: UploadedFile | UploadedFile[];
  };
}

function clearTmp(path: string) {
  fs.unlink(path.replace('/var/task', ''), err => {
    if (err) throw err;
  });
}

export const uploadImage: RequestHandler = async (
  req: FilesRequest,
  res: Response
) => {
  try {
    const { path } = req.body;

    const images = await Promise.all(
      Object.values(req.files)
        .flat()
        .map(async (img: UploadedFile) => {
          const url = await cloudinaryUpload(img, path);
          clearTmp(img.tempFilePath);
          return url;
        })
    );

    res.send({
      images,
    });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

async function cloudinaryUpload(
  image: UploadedFile,
  path: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image.tempFilePath.replace('/var/task', ''),
      { folder: path },
      (err, res) => {
        if (err) {
          clearTmp(image.tempFilePath);

          console.error(err);

          reject('Image could not be uploaded');
        }
        resolve(res.secure_url);
      }
    );
  });
}

interface GetImagesReq {
  body: {
    paths: string[];
    sort: 'asc' | 'desc';
    max: number;
  };
}

export const getImages: RequestHandler = async (
  req: GetImagesReq,
  res: Response
) => {
  try {
    const { paths, sort } = req.body;

    const expression = paths.join(' OR ');

    cloudinary.search
      .expression(expression)
      .sort_by('public_id', sort)
      .execute()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.error(err);
      });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

export const deleteImage: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await cloudinary.uploader.destroy(id);

    if (result.result !== 'ok')
      throw createHttpError(500, 'Failed to delete image');

    res.json({ status: result.result });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
