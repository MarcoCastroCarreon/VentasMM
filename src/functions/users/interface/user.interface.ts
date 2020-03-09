export interface CreateUserRequest{
    email: string,
    password: string,
    userType: string,
    status: string,
    creationDate: Date,
}

export interface CreateUserResponse{
    id: number,
    email: string,
    userType: string
}