import { Request, Response } from "express";
import { FriendShipBusiness } from "../business/FriendShipBusiness";
import { FriendsInputDTO } from "../model/friendship";

const friendShipBusiness = new FriendShipBusiness()
export class FriendShipController {
    
    public addFriend = async(req:Request, res: Response): Promise<void> => {
        try {
            const input:FriendsInputDTO = {
                token: req.headers.authorization as string,
                followedUser: req.params.id
            }
            
        await friendShipBusiness.addFriend(input)

        res.status(201).send({message: "Following friend!"})
            
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public getAllFriends = async(req:Request, res: Response): Promise<void> => {
        try {

            const  token = req.headers.authorization as string

           const result =  await friendShipBusiness.getAllFriends(token)
           res.status(201).send(result)           
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public unfollow = async(req:Request, res: Response): Promise<void> => {
        try {

            const input: FriendsInputDTO = {
                token: req.headers.authorization as string,
                followedUser: req.params.id
            }

                       

            await friendShipBusiness.unfollow(input)

            res.status(200).send({ message: "broken friendship! :(" }) 
                     
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


}