import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { Auth } from '../../../services/Auth';

const prisma = new PrismaClient();
export default Auth(async function getAllCategories(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    await prisma.categories.findMany().then(data => {
      res.json(data)
    }).catch(err => {
      res.json([])
    })
  } else if (req.method == "POST") {
    await prisma.categories.create({ data: {
      name: req.body.name,
    } }).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(400).json(err)
    })
  }
})