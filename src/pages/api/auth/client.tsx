import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
const { SECRET } = process.env
export default function getUserData(req: NextApiRequest, res: NextApiResponse) {
  verify(req.cookies.auth!, SECRET!, async (err, decoded) => {
    if (!err && decoded) {
      res.status(200).json(decoded)
    } else {
      res.status(401).json({ message: "You don't have authorisation" })
    }
  })
}
