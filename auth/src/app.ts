import express from "express";
import "express-async-errors"
import morgan from "morgan";
import cookieSession from "cookie-session"

// import cookieSession from "cookie-session";

import { routes } from './frameworks/routes'
import dependencies from "./config/dependencies";
import { NotFoundError, currentUserAdmin, currentUserCandidate, currentUserRecruiter, errorHandler } from "@abijobportal/common";

const app = express();

const API_PREFIX = process.env.API_PREFIX || '/api/v1/auth'

app.set("trust proxy", true); // trust first proxy
app.use(
	cookieSession({
		signed: false,
		secure:true
	})
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// it extract current user from jwt, if user is present add it to req.currentUser
app.use(currentUserAdmin)
app.use(currentUserAdmin)
app.use(currentUserCandidate)
app.use(currentUserRecruiter)

// Routes
app.use(API_PREFIX, routes(dependencies))

app.all('*',async ()=>{
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };
