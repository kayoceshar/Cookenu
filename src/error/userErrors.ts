import { CustomError } from "./CustomError";

export class NameNotFound extends CustomError{
    constructor(){
        super(406, "Name is required.")
    }
}

export class EmailNotFound extends CustomError{
    constructor(){
        super(406, "E-mail is required.")
    }
}

export class PasswordNotFound extends CustomError{
    constructor(){
        super(406, "Password is required.")
    }
}

export class RoleNotFound extends CustomError{
    constructor(){
        super(406, "Role is required. ADMIN OR NORMAL.")
    }
}

export class InvalidRole extends CustomError{
    constructor(){
        super(406, "Role is required. ADMIN OR NORMAL.")
    }
}

export class UserNotFound extends CustomError{
    constructor(){
        super(404, "User does not exist.")
    }
}

export class InvalidPassword extends CustomError{
    constructor(){
        super(400, "Invalid password.")
    }
}

export class InvalidEmail extends CustomError{
    constructor(){
        super(400, "Wrong email format.")
    }
}

export class RepeatedEmail extends CustomError{
    constructor(){
        super(400, "This email account already exists")
    }
}
export class ShortPassword extends CustomError{
    constructor(){
        super(400, "Password too short, it needs to be at least 6 characters long.")
    }
}

export class IdNotFound extends CustomError{
    constructor(){
        super(406, "ID is required.")
    }
}

export class UserIdNotFound extends CustomError{
    constructor(){
        super(406, "User is required.")
    }
}

export class TokenNotFound extends CustomError{
    constructor(){
        super(406, "Token is required.")
    }
}

export class Unauthorized extends CustomError{
    constructor(){
        super(404, "User not Authorized")
    }
}