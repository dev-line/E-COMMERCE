import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { AuthClient } from '../../../services/AuthClient';

const prisma = new PrismaClient();
export default AuthClient(async function getAllCommands(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    await prisma.commands.findMany({ include: { User: true } }).then(data => {
      data.map(itm => {
        itm.products = JSON.parse(itm.products)
      })
      res.status(200).json(data)
    }).catch(err => {
      res.json([])
    })
  } else if (req.method == "POST") {

    await prisma.commands.create({
      data: {
      products: String(req.body.Products),
      User:{connect:{id:req.body.User}}
    } }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(400).json(err)
    })
  }
})
