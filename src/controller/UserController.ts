import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginDTO, UserForgotPasswordDTO, UserGetByIdDTO, UserInputDTO} from "../model/user";

const userBusiness = new UserBusiness()

export class UserController {
    public signup = async(req: Request, res:Response): Promise<void>  => {
        try{
            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
           
            const token = await userBusiness.signup(input)

            res.status(200).send({message: "User Created!", access_token:token})

        }catch(error:any){
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

   public login = async (req: Request, res: Response): Promise<void>  => {
        try {
            
            const input: LoginDTO= {
                email: req.body.email,
                password: req.body.password
            }

        const token = await userBusiness.login(input)
        res.status(200).send({message: "Logged in user!", access_token:token})

        } catch (error: any) {
        res.status(error.statusCode || 400).send(error.message || error.sqlMessage)        }
   }

   public userProfile = async (req: Request, res: Response): Promise<void> =>{
    try {

        const  token = req.headers.authorization as string
        
        const result = await userBusiness.userProfile(token)
        res.status(200).send(result[0])

    } catch (error: any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)  
        
    }
   }

   public getUserById = async (req: Request, res: Response): Promise<void> =>{
    try {

        const input: UserGetByIdDTO = {
            id: req.params.id,
            token: req.headers.authorization as string
        } 
        const result = await userBusiness.getUserById(input)
        res.status(200).send(result[0])

    } catch (error: any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)  
        
    }
   }

   public getAllUsers =async (req: Request, res: Response): Promise<void>  => {
    try {
        const  token = req.headers.authorization as string
        const result = await userBusiness.getAllUsers(token)
        res.status(200).send(result)
    } catch (error:any) {
        res.status(error.statusCode || 400).send(error.message || error.sqlMessage)    
    }
   }

   public deleteUser = async (req: Request, res: Response): Promise<void> =>{
    try {

        const input: UserGetByIdDTO = {
            id: req.params.id,
            token: req.headers.authorization as string
        }  
        
        await userBusiness.deleteUser(input)

        res.status(200).send({message: 'User deleted successfully'})

    } catch (error: any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)  
        
    }
   }

   public forgotPassword = async (req: Request, res: Response): Promise<void> =>{
    try {

        const input: UserForgotPasswordDTO = {
            email: req.body.email,
            password: req.body.password,
            token: req.headers.authorization as string
        }  
        
        await userBusiness.forgotPassword(input)

        res.status(200).send({message: 'Password changed successfully'})

    } catch (error: any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)  
        
    }
   }




}