import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import {hash} from 'bcrypt'
const prisma = new PrismaClient()

export default function CreateUser(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== "POST") {
    res.status(404).json({message: "Page Not Found"})
  }else{
    hash(req.body.password, 10, async(err,Password)=>{
      if (!err) {
        await prisma.users.create({data:{
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          ville: req.body.ville,
          address: req.body.address,
          codePostal: req.body.codePostal,
          role: req.body.role,
          password: Password          
        }}).then(data=>{
          res.json({data, message: "seccess"})
        }).catch(err=>{
          res.status(500).json({err, message: "error"})
        })
      }else{
        res.status(500).json({message: "Internal Server Error"})
      }
    })
    
  }
}