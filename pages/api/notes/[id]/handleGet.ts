import { NextApiRequest, NextApiResponse } from "next";
import APIUtils from "../../../../util/APIUtils";
import prisma from "../../../../util/prisma";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        if (!req.query.id) APIUtils.throwError(res, 'Note ID is missing.')

        const note = await prisma.note.findMany({
            where: {
                id: Number(req.query.id)
            }
        })
        res.status(200).json({ note })

    } catch (error) {
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}