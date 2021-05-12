import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const { SECRET } = process.env
export const Auth = (event: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    await verify(req.cookies.auth!, SECRET!, async (err, decoded: any) => {
      if (!err && decoded) {
        if (decoded?.data?.role=="ADMIN") {
          return event(req, res)
        }
        return res.status(403).json({ message: "You don't have authorisation" })
      } else {
        return res.status(403).json({ message: "You don't have authorisation" })
      }
    })
  } else {
    return await event(req, res)
  }
}
