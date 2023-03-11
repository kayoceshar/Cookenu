export type friends = {
    id: string,
    user_1_id: string,
    user_2_id: string
}

export interface FriendsDTO {
    id: string,
    user: string,
    followedUser: string
}

export interface FriendsInputDTO {
    followedUser: string,
    token: string
}



export interface FriendsFeedInput {
     token: string
}