import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { Auth } from '../../../services/Auth';

const prisma = new PrismaClient();
export default Auth(async function getProduct(req: NextApiRequest, res: NextApiResponse){
  if (req.method == "GET") {
    try {
     await prisma.products.findUnique({include:{categories: true},where:{id: Number(req.query.id)}}).then(data => {
        res.status(200).json(data||{})
      }).catch(err => {
        res.status(400).json({})
      })
    } catch (error) {
      res.status(400).json(error)
    }
  } else if (req.method == "PUT") {
    try {
      await prisma.products.update({include:{categories: true},where: {id :Number(req.query.id)},data:{
        name: req.body.name,
        image: req.body.image,
        promo: req.body.promo,
        price: req.body.price,
        published: req.body.published,
        categories: {connect:req.body.categories}
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
     await prisma.products.delete({where:{id: Number(req.query.id)}}).then(data => {
        res.status(200).json(data)
      }).catch(err => {
        res.status(400).json(err)
      })
    } catch (error) {
      res.status(400).json(error)
    }
  }
})
