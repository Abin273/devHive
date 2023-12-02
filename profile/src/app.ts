import express from "express";
import "express-async-errors"
import morgan from "morgan";

import { routes } from './frameworks/routes'
import dependencies from "./config/dependencies";
import { NotFoundError, errorHandler } from "@abijobportal/common";
import cookieSession from "cookie-session";

const app = express();

const API_PREFIX = process.env.API_PREFIX || '/api/v1/profile'

app.set("trust proxy", true); // trust first proxy
app.use(cookieSession({
    signed:false,
    secure:true
}))

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(API_PREFIX, routes(dependencies))

app.all('*',async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };
