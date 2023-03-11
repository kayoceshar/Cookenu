import { FriendShipBaseDataBase } from "../data/FriendShipBaseDataBase";
import { UserDataBase } from "../data/UserBaseDataBase";
import { CustomError } from "../error/CustomError";
import { DuplicatedId, ExistingFriendship, NoExistingFriendship, UserNotFound2 } from "../error/friendShipError";
import { IdNotFound, TokenNotFound, Unauthorized, UserNotFound } from "../error/userErrors";
import { FriendsDTO, FriendsInputDTO } from "../model/friendship";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const friendShipBaseDataBase = new FriendShipBaseDataBase()
const userDataBase = new UserDataBase()
const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()

export class FriendShipBusiness {
    
    public addFriend = async (input:FriendsInputDTO): Promise<void> =>{
        try {
        
        const {followedUser, token} = input

        

        if( !followedUser){
            throw new UserNotFound2();            
        }

        if(!token){
            throw new TokenNotFound()
        }

        const data = tokenGenerator.tokenData(token)
        
        if(!data.id){
            throw new Unauthorized()
        }

        const user = data.id

        const allUsers = await userDataBase.getAllUsers()                      

        const checkUser1 = allUsers.find(user => user.id === data.id);

               
            
        if(!checkUser1) {
            throw new UserNotFound()
        }

        const checkUser2 = allUsers.find(user => user.id === followedUser)

            if(!checkUser2) {
                throw new IdNotFound()
            }

        const allFriendsShips = await friendShipBaseDataBase.getAllFriends()

            

        const getFriendShips = allFriendsShips.find(friendship => friendship.user === checkUser1.id && friendship.followedUser === checkUser2.id || friendship.user === checkUser2.id && friendship.followedUser === checkUser1.id)

           
        if(getFriendShips){
            throw new ExistingFriendship()
        }

       
        const id = idGenerator.generateId()

        const friends: FriendsDTO = {
            id,
            user,
            followedUser
        }

        await friendShipBaseDataBase.addFriend(friends)
        
    } catch (error:any) {
            throw new CustomError(400, error.message);
        }


    }

    public getAllFriends = async (token:string): Promise<FriendsDTO[]> => {
        try {

            if(!token){
                throw new TokenNotFound()
            }
    
            const data = tokenGenerator.tokenData(token)
            
            if(!data.id){
                throw new Unauthorized()
            }

           const result = friendShipBaseDataBase.getAllFriends()
           return result 
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public unfollow = async (input:FriendsInputDTO): Promise<void> => {
        try {
            const {followedUser, token} = input

            if( !followedUser){
                throw new UserNotFound2();            
            }
    
            if(!token){
                throw new TokenNotFound()
            }

            const data = tokenGenerator.tokenData(token)
        
        if(!data.id){
            throw new Unauthorized()
        }

        const user = data.id

            if(followedUser === user){
                throw new DuplicatedId()
            }

            const allUsers = await userDataBase.getAllUsers()                      

            const checkUser1 = allUsers.find(u => u.id === user)

            
            if(!checkUser1) {
                throw new UserNotFound()
            }

            const checkUser2 = allUsers.find(user => user.id === followedUser)

            if(!checkUser2) {
                throw new UserNotFound()
            }
            
            
            const allFriendsShips = await friendShipBaseDataBase.getAllFriends()            

            const getFriendShips = allFriendsShips.find(friendship => friendship.user === checkUser1.id && friendship.followedUser === checkUser2.id || friendship.user === checkUser2.id && friendship.followedUser=== checkUser1.id)

            
            if(!getFriendShips){
                throw new NoExistingFriendship()
            }

            const id = getFriendShips.id

            await friendShipBaseDataBase.unfollow(id)            

                        
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }




}