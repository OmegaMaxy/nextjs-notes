

import { NextApiRequest, NextApiResponse } from "next";
import APIUtils from "../../../util/APIUtils";
import prisma from "../../../util/prisma";



export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    try {

        const body = req.body
        if (!body.title) return APIUtils.throwError(res, 'Title missing.')
        if (!body.content) return APIUtils.throwError(res, 'Content missing.')
        if (!body.user_id) return APIUtils.throwError(res, 'User ID missing.')

        const note = await prisma.note.create({
            data: {
                title: body.title,
                content: body.content,
                user_id: body.user_id,
            }
        })
        
        res.status(200).json({ note })
    } catch (error) {
        res.status(500).json({ error, errorMessage: 'Something went badly wrong.' })
    }
}