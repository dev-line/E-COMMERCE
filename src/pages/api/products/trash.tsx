import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { Auth } from '../../../services/Auth';

const prisma = new PrismaClient();
export default Auth(async function getDraft(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    await prisma.products.findMany({include:{categories: true},where:{published: false}}).then(data => {
      res.json(data)
    }).catch(err => {
      res.json([])
    })
  }else{
    res.status(404)
  }
})