import { User, Note, DataResponse, ResponseError } from './types'
import PREDEFINED_API_URL from './api_url'

export default class NoteAPI {
    static API_URL = PREDEFINED_API_URL + '/notes'


    public static async get(note_id: number) {
        const res = await fetch(`${this.API_URL}/${note_id}`)
        const data = await res.json()
        return data
    }

    public static async getAll(user_id: number) {
        const res = await fetch(`${this.API_URL}?user_id=${user_id}`)
        const data = await res.json()
        return data.notes
    }

    public static async create({user_id, title, content}: {user_id: number, title: string, content: string}) {
        
        if (title === '') {
            return { error: 'Validation error', errorMessage: 'Title cannot be empty.'}
        }
        
        const res = await fetch(`${this.API_URL}`, {
            body: JSON.stringify({
                user_id,
                title,
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const data = await res.json()
        return data
    }

    public static async update({id, title, content}: {id: number, title?: string, content?: string}) {
        
        if (title === '') {
            return { error: 'Validation error', errorMessage: 'Title cannot be empty.' }
        }

        const res = await fetch(`${this.API_URL}/${id}`, {
            body: JSON.stringify({
                title,
                content,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH'
        })
        const data = await res.json()
        return data
    }

    public static async delete(note_id: number) {
        const res = await fetch(`${this.API_URL}`, {
            body: JSON.stringify({
                note_id,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        const data = await res.json()
        return data
    }

}