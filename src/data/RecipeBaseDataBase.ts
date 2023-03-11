import { CustomError } from "../error/CustomError";
import {EditRecipeInput, recipe, recipeDTO, RecipeDTO, RecipeFeed, RecipeOutputDTO } from "../model/recipe";
import { BaseDatabase } from "./BaseDataBase";

export class RecipeBaseDataBase extends BaseDatabase {
    private recipeTable = 'Cookenu_recipe'
    

    public createRecipe = async (recipe: recipe): Promise<void>  => {
        try {
            await RecipeBaseDataBase.connection(this.recipeTable)
            .insert({
                id: recipe.id,
                title:recipe.title,
                description: recipe.description,
                author_id: recipe.authorId
            })            
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public friendsFeed = async (id:string): Promise<RecipeFeed[]> => {
        try {
             const result = await RecipeBaseDataBase.connection(this.recipeTable)
            .select('Cookenu_recipe.title','Cookenu_recipe.description','Cookenu_recipe.created_at','Cookenu_users.name')
            .from(this.recipeTable)
            .join('Cookenu_users', 'Cookenu_recipe.author_id','=', 'Cookenu_users.id')
            .join('Cookenu_friends', function(){
                this.on("Cookenu_recipe.author_id", "=", "Cookenu_friends.user_2_id")
                .orOn("Cookenu_recipe.author_id", "=", "Cookenu_friends.user_1_id")})
            .where(function(){
                    this.where("Cookenu_friends.user_1_id", "=", id)
                    .orWhere("Cookenu_friends.user_2_id", "=",id)
                })
            .andWhere("Cookenu_recipe.author_id", "<>", id)
            .orderBy("Cookenu_recipe.created_at", "desc")   
            
                return result
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
   }

    public editRecipe = async (recipe:EditRecipeInput): Promise<void>  => {
        try {
            await RecipeBaseDataBase.connection
            .update({title: recipe.title, description: recipe.description})
            .where({id: recipe.id})
            .into(this.recipeTable)            
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    } 

    
    public getRecipeById = async (id:string): Promise<RecipeDTO[]> => {
        try {
            const result = await RecipeBaseDataBase.connection(this.recipeTable)
            .select()
            .where({id}) 
            return result          
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    } 


    public filterRecipeById = async (id:string): Promise<RecipeDTO> => {
        try {
            const result = await RecipeBaseDataBase.connection(this.recipeTable)
            .select()
            .where({id}) 
            return result[0]          
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    } 

    public deleteRecipe = async(id:string) => {
        try {
            await RecipeBaseDataBase.connection(this.recipeTable)
            .where({id})
            .delete()            
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }

    public deleteRecipeByAuthor = async(id:string) => {
        try {
            await RecipeBaseDataBase.connection(this.recipeTable)
            .where({author_id:id})
            .delete()            
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }

    public getAllRecipes = async ():Promise<RecipeDTO[]>  => {
        try {
            const result = await RecipeBaseDataBase.connection(this.recipeTable)
            return result            
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }







}