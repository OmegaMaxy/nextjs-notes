import { NextApiRequest, NextApiResponse } from "next";
import handleGet from "./handleGet";
import handleUpdate from "./handleUpdate";
import handleDelete from "./handleDelete";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        const method = req.method

        switch (method) {
            case 'GET':
                await handleGet(req, res)
                break;
            case 'PATCH':
                await handleUpdate(req, res)
                break;
            case 'DELETE':
                await handleDelete(req, res)
                break;

            default:
                res.status(405).json({ error: 'Method not allowed.', errorMessage: 'Method not allowed.' })
                break;
        }

    } catch (error) {
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}