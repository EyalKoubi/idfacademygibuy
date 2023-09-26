import { NextApiRequest } from "next";
import multer from "multer";
import { NextFunction } from "express";

declare module "next" {
  interface NextApiRequest {
    file: Express.Multer.File; // Define the 'file' property type
  }
}

declare global {
  namespace Express {
    interface Multer {
      (options?: multer.Options): (
        req: NextApiRequest,
        res: Response,
        next: NextFunction
      ) => void;
    }
  }
}
