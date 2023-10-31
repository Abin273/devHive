import express from "express"

export const adminRouter = (dependencies: any)=>{
    const router = express.Router();

    router.post("/signin");
    router.post("/signout");

    return router
}