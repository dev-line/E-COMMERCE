import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Auth } from "../../services/Auth";

const prisma = new PrismaClient();
export default Auth(async function Info(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    await prisma.info
      .findFirst()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({});
      });
  } else if (req.method == "POST") {
    const Info = {
      Instagram: req.body.instagram,
      about: req.body.about,
      address: req.body.address,
      email: req.body.email,
      facebook: req.body.facebook,
      phone: req.body.phone,
    };
    await prisma.info
      .upsert({ create: Info, where: { id: 1 }, update: Info })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  }
});
