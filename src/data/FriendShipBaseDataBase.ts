import { CustomError } from "../error/CustomError";
import { FriendsDTO} from "../model/friendship";
import { BaseDatabase } from "./BaseDataBase";

export class FriendShipBaseDataBase extends BaseDatabase{
    private friendShipTable = 'Cookenu_friends'

    public addFriend = async (friends: FriendsDTO): Promise<void> => {
        try {
            await FriendShipBaseDataBase.connection(this.friendShipTable)
            .insert({
                id: friends.id,
                user_1_id: friends.user,
                user_2_id: friends.followedUser
            })            
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public getAllFriends = async (): Promise<FriendsDTO[]> => {
        try {
           const result = await FriendShipBaseDataBase.connection(this.friendShipTable)

           const resultOutput:FriendsDTO[] = result.map((p) => {
            return {
                id: p.id,
                user: p.user_1_id,
                followedUser: p.user_2_id,                
            }
        })

           return resultOutput
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public unfollow = async (id:string): Promise<void> => {
        try {
            await FriendShipBaseDataBase.connection(this.friendShipTable)
            .where({id})
            .delete()            
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }

    public unfollowByAuthor = async(id:string): Promise<void> => {
        try {
            await FriendShipBaseDataBase.connection(this.friendShipTable)
            .where(function(){
                this.where("Cookenu_friends.user_1_id", "=", id)
                .orWhere("Cookenu_friends.user_2_id", "=",id)
            })
            .delete()            
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }

    


}