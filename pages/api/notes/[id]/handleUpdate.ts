

import { NextApiRequest, NextApiResponse } from "next";
import APIUtils from "../../../../util/APIUtils";
import prisma from "../../../../util/prisma";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        const body = req.body
        if (!req.query.id) return APIUtils.throwError(res, 'ID is missing.')
        if (req.query.title === '') return APIUtils.throwError(res, 'Title cannot be empty.')
        
        const note = await prisma.note.update({
            where: {
                id: Number(req.query.id)
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        res.status(200).json({ note })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}