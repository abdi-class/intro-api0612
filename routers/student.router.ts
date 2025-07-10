import { Router } from "express";
import { getData } from "../controllers/student.controller";

const route = Router();

// define route api ==> route.METHODE(PATH_URL, CONTROLLER)
route.get("/", getData);

export default route;
