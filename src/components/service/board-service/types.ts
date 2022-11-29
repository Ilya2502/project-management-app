export type BoardResponseType = {
    _id: string,
    title: string,
    owner: string,
    users: string[],
}

export type NewBoardType = {
    title: string,
    owner: string,
    users: string[],
}

// export type NewUserType = {
//     name: string,
//     login: string,
//     password: string,
// }

// export type LoginUserType = {
//     login: string,
//     password: string,
// }

// export type TokenType = {
//     token: string,
// }

export type DecodedTokenType = {
    id: string,
    login: string,
    iat: number,
    exp: number,
};
