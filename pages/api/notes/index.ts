import { NextApiRequest, NextApiResponse } from "next";
import handleCreate from "./handleCreate";
import handleGet from "./handleGet";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {
        
        const method = req.method

        switch (method) {
            case 'POST':
                await handleCreate(req, res)
                break;
            case 'GET':
                await handleGet(req, res)
                break;
        
            default:
                res.status(405).json({ error: 'Method not allowed.', errorMessage: 'Method not allowed.' })
                break;
        }

    } catch (error) {
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}