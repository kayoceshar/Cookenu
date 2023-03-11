import express from "express";
import { FriendShipController } from "../controller/FriendShipController";


const friendShipController = new FriendShipController()

export const friendShipRouter = express.Router();


friendShipRouter.get('/follow/:id', friendShipController.addFriend)
friendShipRouter.get('/allfriendship', friendShipController.getAllFriends)
friendShipRouter.delete('/friendship/:id', friendShipController.unfollow)
