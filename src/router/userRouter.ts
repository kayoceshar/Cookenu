import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/profile', userController.userProfile)
userRouter.get('/allusers', userController.getAllUsers)
userRouter.get('/user/:id', userController.getUserById)
userRouter.delete('/delete/:id', userController.deleteUser)
userRouter.post('/forgotpassword', userController.forgotPassword)