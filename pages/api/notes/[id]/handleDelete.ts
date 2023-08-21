import { NextApiRequest, NextApiResponse } from "next";
import APIUtils from "../../../../util/APIUtils";
import prisma from "../../../../util/prisma";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        if (!req.query.id) APIUtils.throwError(res, 'Note ID missing.')
        
        const result = await prisma.note.delete({
            where: {
                id: Number(req.query.id)
            }
        })

        res.status(200).json({ message: 'success' })

    } catch (error) {
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}