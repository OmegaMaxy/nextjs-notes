export type User = {
    id: number
    email_address: string
    created_at: Date
    updated_at: Date
    notes: Note[]
}
export type Note = {
    id: number
    title: string
    content: string
    created_at: Date
    updated_at: Date
}

export type SessionUser = {
    id: number
    name: string
    email_address: string
    created_at: Date
    updated_at: Date
}


export type ResponseError = {
    error: string,
    errorMessage: string,
}

export type DataResponse<T> = {
    res: T | ResponseError
}