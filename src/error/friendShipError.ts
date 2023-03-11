import { CustomError } from "./CustomError";

export class UserNotFound1 extends CustomError{
    constructor(){
        super(406, "User is required.")
    }
}

export class UserNotFound2 extends CustomError{
    constructor(){
        super(406, "User to be added is required.")
    }
}

export class DuplicatedId extends CustomError {
    constructor() {
        super(400, "You can't add yourself.")
    }
}

export class NoExistingFriendship extends CustomError {
    constructor() {
        super(400, "The users selected are not friends.")
    }
}

export class ExistingFriendship extends CustomError {
    constructor() {
        super(400, "Existing friendship.")
    }
}

