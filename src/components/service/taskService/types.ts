// export type ColumnsInBoardResponseType = {
//     _id: string,
//     title: string,
//     order: number,
//     boardId: string,
// }

export type NewTaskType = {
    title: string,
    order: number,
    description: string,
    userId: string,
    users: string[],
};

export type UpdateTaskType = {
    title: string,
    order: number,
    description: string,
    columnId: string,
    userId: string,
    users: string[],
}

export type NewParamsTaskType = {
    title: string,
    order: number,
    description: string,
    columnId: string,
}

export type TaskResponseType = {
    _id: string,
    title: string,
    order: number,
    boardId: string,
    columnId: string,
    description: string,
    userId: string,
    users: string[],
};

export type UpdateTaskResponseType = {
    _id: string,
    title: string,
    order: number,
    boardId: string,
    columnId: string,
    description: string,
    userId: string,
    users: string[],
}
