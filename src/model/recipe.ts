export type recipe = {
    id: string,
    title: string,
    description: string,
    authorId: string,
}

export type recipeDTO = {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    authorId: string
}

export interface RecipeInputDTO {
    title: string,
    description: string,
    authorId: string,
    token: string
}


export interface RecipeInputController {
    title: string,
    description: string,
    token: string
}

export interface EditRecipeInput{
    id: string,
    title: string,
    description: string
}

export interface EditRecipeInputDTO{
    id: string,
    title: string,
    description: string,
    token: string
}

export interface DeleteRecipeInputDTO{
    id: string,
    token: string
}

export interface RecipeDTO {
    id:string,
    title:string,
    description:string,
    created_at:string,
    author_id:string
}

export interface RecipeOutputDTO {
    id: string,
    title: string,
    description: string,
    createdAt: string,
    authorId: string
}

export interface RecipeFeed {
    title: string,
    description: string,
    created_at: string,
    name: string
}

export interface RecipeFeedDTO {
    title: string,
    description: string,
    createdAt: string,
    name: string
}

export interface RecipeInput {
    id:string,
    token: string
}


    
  

