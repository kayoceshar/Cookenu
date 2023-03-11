import { FriendShipBaseDataBase } from "../data/FriendShipBaseDataBase";
import { RecipeBaseDataBase } from "../data/RecipeBaseDataBase";
import { UserDataBase } from "../data/UserBaseDataBase";
import { CustomError } from "../error/CustomError";
import { EmailNotFound, IdNotFound,InvalidEmail,InvalidPassword,InvalidRole, NameNotFound, PasswordNotFound, RepeatedEmail, RoleNotFound, TokenNotFound, Unauthorized, UserNotFound } from "../error/userErrors";
import { InputForgotPassword, LoginDTO, user, UserForgotPasswordDTO, UserGetByIdDTO, UserInputDTO, UserRole } from "../model/user";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import transporter from "../services/mailTransporter";
import { TokenGenerator } from "../services/TokenGenerator";





const idGenerator = new IdGenerator()
const userDataBase = new UserDataBase()
const recipeBaseDataBase = new RecipeBaseDataBase()
const friendshipBaseDataBase = new FriendShipBaseDataBase()
const tokenGenerator = new TokenGenerator()
const hashManager = new HashManager()

export class UserBusiness {
    
    public signup = async(input: UserInputDTO): Promise<string> => {
        try{
            
            const {name, email,password, role} = input

            if(!name){
                throw new NameNotFound()
            }
            if(!email){
                throw new EmailNotFound()
            }
            if(!password){
                throw new PasswordNotFound()
            }
            if(!role){
                throw new RoleNotFound()
            }

            if(password.length<6){
                throw new PasswordNotFound()
            }

            if (!email.includes("@")) {
                throw new InvalidEmail();
            }

            const allUsers = await userDataBase.getAllUsers();
            
            const repeatedEmail = allUsers.find((user) => { return user.email === email})

            if (repeatedEmail) {
                throw new RepeatedEmail();
            }

            const id: string = idGenerator.generateId();

            const hashPassword: string = await hashManager.hash(password);

            if(role.toUpperCase() != UserRole.ADMIN && role.toUpperCase() != UserRole.NORMAL){
                throw new InvalidRole()
            }

            const user: user = {
                id,
                name,
                email,
                password: hashPassword,
                role
            }

            await userDataBase.signup(user)
            const token = tokenGenerator.generateToken({id,role})
            return token

        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }

    public login = async(input: LoginDTO): Promise<string> =>{
        try {
            const {email, password} = input 
            
            if(!email){
                throw new EmailNotFound()
            }

            if(!password){
                throw new PasswordNotFound()
            }
            
            const user = await userDataBase.findUser(email)
            
            if(!user) {
                throw new UserNotFound();
            }
            
            const validPassword: boolean= await hashManager.compare(password, user.password)

            if(!validPassword){
                    throw new InvalidPassword();    
            }

            const token = tokenGenerator.generateToken({id: user.id, role:user.role})
            return token

        } catch (error:any) {
            throw new CustomError(400, error.message)
        }
    }

    public userProfile = async (token: string) =>{
        try {
                        
            if(!token){
                throw new TokenNotFound()
            }

            const data = tokenGenerator.tokenData(token)
                      
            
            if(!data.id){
                throw new Unauthorized()
            }
                      

            const id = data.id            

            const result = await userDataBase.userProfile(id)
           
           if(!result){
                throw new UserNotFound();                
           }

           return result

        } catch (error: any) {
            throw new CustomError(400, error.message)
            
        }
    }

    public getUserById = async (input:UserGetByIdDTO) =>{
        try {

            const {id, token} = input
                        
            if(!id){
                throw new IdNotFound()
            }
            
            if(!token){
                throw new TokenNotFound()
            }

            const data = tokenGenerator.tokenData(token)
            
            if(!data.id){
                throw new Unauthorized()
            }

            const allUsers = await userDataBase.getAllUsers()

            const checkUser = allUsers.find(user => user.id === input.id)

            if(!checkUser){
                throw new UserNotFound()
            }
            

           const result = await userDataBase.getUserById(id)
           
           if(!result){
                throw new UserNotFound();
                
           }

           return result

        } catch (error: any) {
            throw new CustomError(400, error.message)
            
        }
    }

    public getAllUsers = async(token:string):Promise<user[]> => {
        try {

            if(!token){
                throw new TokenNotFound()
            }

            const data = tokenGenerator.tokenData(token)
            
            if(!data.id){
                throw new Unauthorized()
            }

            const result = await userDataBase.getAllUsers()
            return result
        } catch (error:any) {
            throw new CustomError(400, error.message)
        }
    }


    public deleteUser = async(input: UserGetByIdDTO): Promise<void>  => {
        try {

            const {id,token} = input

            if(!id){
                throw new IdNotFound() 
            }

            const allUsers = await userDataBase.getAllUsers()

            const checkUser = allUsers.find(user => user.id === input.id)

            if(!checkUser){
                throw new UserNotFound()
            }
            

            if(!token){
                throw new TokenNotFound()
            }

            const data = tokenGenerator.tokenData(token)
            
            if(!data.id){
                throw new Unauthorized()
            }

            if(data.role.toUpperCase() !== UserRole.ADMIN){
                throw new Unauthorized()
            }

            

            await recipeBaseDataBase.deleteRecipeByAuthor(id) 
            await friendshipBaseDataBase.unfollowByAuthor(id)
            await userDataBase.deleteUser(id)
            
        } catch (error:any) {
            throw new CustomError(400, error.message)
        }
    }

        public forgotPassword = async (input: UserForgotPasswordDTO): Promise<void>  => {
            try {
                const {email, password, token} = input

                if(!email){
                    throw new EmailNotFound()
                }
    
                if(!password){
                    throw new PasswordNotFound()
                }

                if(password.length<6){
                    throw new PasswordNotFound()
                }

                if(!token){
                    throw new TokenNotFound()
                }
    
                const data = tokenGenerator.tokenData(token)
                
                if(!data.id){
                    throw new Unauthorized()
                }

                const hashPassword: string = await hashManager.hash(password);


                const user: InputForgotPassword = {
                    id:data.id,
                    password:hashPassword,
                }                         


                await userDataBase.forgotPassword(user)

                const send = await transporter.sendMail({
                    from: process.env.NODEMAILER_USER,
                    to: input.email,
                    subject: "Password changed",
                    text:   `new password: ${input.password}`
                })

                                
            } catch (error:any) {
                throw new CustomError(400, error.message)
            }
        }




}