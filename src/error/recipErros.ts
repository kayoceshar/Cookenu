import { CustomError } from "./CustomError";

export class IdNotFound extends CustomError{
    constructor(){
        super(406, "Id is required.")
    }
}

export class TitleNotFound extends CustomError{
    constructor(){
        super(406, "Title is required.")
    }
}

export class DescriptionNotFound extends CustomError{
    constructor(){
        super(406, "Description is required.")
    }
}

export class AuthorIdNotFound extends CustomError{
    constructor(){
        super(406, "Author Id is required.")
    }
}

export class RecipeNotFound extends CustomError{
    constructor(){
        super(406, "Recipe is required.")
    }
}

export class RecipeNotAuthor extends CustomError{
    constructor(){
        super(404, "You must be the author of this recipe to edit it.")
    }
}