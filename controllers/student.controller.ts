import { Request, Response } from "express";
import fs from "fs";
export const getData = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync("./db.json").toString());
  res.send(data);
};
