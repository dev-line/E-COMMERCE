import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import {serialize} from "cookie"
const prisma = new PrismaClient()
const { SECRET } = process.env
export default function Login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Page Not Found" })
  } else {
    prisma.users.findUnique({ where: { email: req.body.email } }).then(ThisUser => {
      compare(req.body.password, ThisUser!.password, (err, isTrue) => {
        if (!err && isTrue) {
          var User = ThisUser
          User!["password"] = "UKNOWN";
          const jwt = sign({
            data: User
          }, SECRET!, { expiresIn: '24h' });
          res.setHeader("Set-Cookie", serialize("auth", jwt, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development", maxAge: 3600 * 24, path: "/" }))
          res.status(200).json(User);
        } else {
          res.status(400).json({ message: "Incorrect Username / Password" })
        }
      })
    }).catch(err => {
      res.status(400).json({ message: "Please Login With Email" })
    })
  }
}