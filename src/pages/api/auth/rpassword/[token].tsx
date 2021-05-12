import { verify } from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
const { SECRET } = process.env
const prisma = new PrismaClient()

export default async function rpassword(req:NextApiRequest, res:NextApiResponse) {
    if (req.method == "POST") {
        verify(req.body.token!,SECRET!, async(err:any ,decoded:any) => {
            if (!err&&decoded) {
                hash(req.body.password, 10, async(err,Password)=>{
                    if (!err && Password) {
                 await prisma.users.update({where:{email:decoded.data},data:{password:Password,reset_password_token:""}}).then(data=>{
                     res.json(data)
                 }).then(data=>{
                     res.json(data)
                 }).catch(err=>{
                     res.status(403).json(err)
                 })
                    }else{
                        res.status(500)
                    }
                })
            }else{
                res.status(400).json(err)
            }
        })
    }else{
        res.status(404)
    }
}