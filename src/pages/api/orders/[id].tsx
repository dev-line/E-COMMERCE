import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { Auth } from '../../../services/Auth';

const prisma = new PrismaClient();
export default Auth(async function getCategory(req: NextApiRequest, res: NextApiResponse){
  if (req.method == "GET") {
    try {
     await prisma.commands.findUnique({where:{id: Number(req.query.id)}}).then(data => {
        res.status(200).json(data||{})
      }).catch(err => {
        res.status(400).json({})
      })
    } catch (error) {
      res.status(400).json(error)
    }
  } else if (req.method == "PUT") {
    try {
      await prisma.commands.update({where: {id :Number(req.query.id)},data:{
        delivered:  req.body.delivered,
      }}).then(data => {
        res.status(200).json(data)
      }).catch(err => {
        res.status(400).json(err)
      })
    } catch (error) {
      res.status(400).json(error)
    }
  }else if (req.method == "DELETE") {
    try {
     await prisma.commands.delete({where:{id: Number(req.query.id)}}).then(data => {
        res.status(200).json(data)
      }).catch(err => {
        res.status(400).json(err)
      })
    } catch (error) {
      res.status(400).json(error)
    }
  }
})