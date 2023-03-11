import { CustomError } from "../error/CustomError";
import { InputForgotPassword, user} from "../model/user";
import { BaseDatabase } from "./BaseDataBase";

export class UserDataBase extends BaseDatabase{
    private userTable = 'Cookenu_users'

    public signup = async(user: user): Promise<void> => {
        try{
            await UserDataBase.connection(this.userTable)
            .insert(user)
        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }

    public findUser = async(email: string): Promise<user>  => {        
    try {        
    const result = await UserDataBase.connection(this.userTable).select("*")
    .where({email})
    return result[0]
    } catch (error: any) {
        throw new CustomError(400, error.mesage)
    } 
}

    public userProfile = async (id: string) => {
        try {
         const result = await UserDataBase.connection(this.userTable).select("id", "name", "email")
         .where({id})
            return result        
        } catch (error: any) {
            throw new CustomError(400, error.message);
            
        }
    }


    public getUserById = async (id: string) => {
        try {
         const result = await UserDataBase.connection(this.userTable).select("id", "name", "email")
         .where({id})
            return result        
        } catch (error: any) {
            throw new CustomError(400, error.message);
            
        }
    }

    public getAllUsers = async (): Promise<user[]> => {
        try {

            const result = await UserDataBase.connection(this.userTable)
            return result            
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public deleteUser = async (id:string):Promise<void> => {
        try {
            await UserDataBase.connection(this.userTable)
            .where({id})
            .delete()
        } catch (error:any) {
            throw new CustomError(400, error.message);  
        }
    }

    public forgotPassword = async (user: InputForgotPassword):Promise<void> => {
        try {
            await UserDataBase.connection(this.userTable)
            .where({id:user.id})
            .update({password:user.password})            
        } catch (error:any) {
            throw new CustomError(400, error.message)
        }
    }
}