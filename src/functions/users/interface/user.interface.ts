export interface CreateUserRequest{
    email: string,
    password: string,
    userType: string,
    status: string,
    creationDate: Date,
    name: string,
    lastName: string,
    country: number,
    phone: string,
    address: string,
    token: string
}

export interface CreateUserResponse{
    id: number,
    email: string,
    userType: string
}

export interface InfoAdminResponse{
    name: string,
    lastName: string,
    userType: string,
    status: string,
    creationDate: Date
}

export interface UserConfirmation{
    token: string
}

export interface ListUsersAdminResponse{
    id: number,
    name: string,
    email: string,
    phone: string,
    address: string
}