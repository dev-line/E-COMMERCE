import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { Auth } from '../../../services/Auth';

const prisma = new PrismaClient();
export default Auth(async function getCategory(req: NextApiRequest, res: NextApiResponse){
  if (req.method == "GET") {
    try {
     await prisma.categories.findUnique({where:{id: Number(req.query.id)}}).then(data => {
        res.status(200).json(data)
      }).catch(err => {
        res.json({})
      })
    } catch (error) {
      res.status(400).json(error)
    }
  } else if (req.method == "PUT") {
    try {
      await prisma.categories.update({include:{products: true},where: {id :Number(req.query.id)},data:{
        name: req.body.name,
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
     await prisma.categories.delete({where:{id: Number(req.query.id)}}).then(data => {
        res.status(200).json(data)
      }).catch(err => {
        res.status(400).json(err)
      })
    } catch (error) {
      res.status(400).json(error)
    }
  }
})