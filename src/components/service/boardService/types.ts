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

export type DecodedTokenType = {
    id: string,
    login: string,
    iat: number,
    exp: number,
};
