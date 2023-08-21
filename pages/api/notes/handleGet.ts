import { NextApiRequest, NextApiResponse } from "next";
import APIUtils from "../../../util/APIUtils";
import prisma from "../../../util/prisma";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        if (!req.query.user_id) return APIUtils.throwError(res, 'User ID is missing.')

        const notes = await prisma.note.findMany({
            where: {
                user_id: Number(req.query.user_id)
            }
        })
        res.status(200).json({ notes })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}