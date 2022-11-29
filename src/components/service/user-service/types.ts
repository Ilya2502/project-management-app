export type UserType = {
    _id: string,
    name: string,
    login: string,
}

export type NewUserType = {
    name: string,
    login: string,
    password: string,
}

export type LoginUserType = {
    login: string,
    password: string,
}

export type TokenType = {
    token: string,
}

export type DecodedTokenType = {
    id: string,
    login: string,
    iat: number,
    exp: number,
} | null;
