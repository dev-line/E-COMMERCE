import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
const { SECRET } = process.env
export default function getAdminData(req: NextApiRequest, res: NextApiResponse) {
  verify(req.cookies.auth!, SECRET!, async (err, decoded:any) => {
    if (!err && decoded) {
      if (decoded?.data?.role=="ADMIN") {
        return res.json(decoded)
      }
      return res.status(403).json({ message: "You don't have authorisation" })
    } else {
      return res.status(403).json({ message: "You don't have authorisation" })
    }
  })
}  