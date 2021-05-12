import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { AuthClient } from "../../../services/AuthClient";
const prisma = new PrismaClient();

export default AuthClient(async function GetUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    await prisma.users
      .findUnique({ where: { id: req.body.id } })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else if (req.method == "PUT") {
    await prisma.users
      .findUnique({ where: { id: req.body.id } })
      .then((user) => {
        if (req.body.password) {
          compare(req.body.OldPass, user?.password!, async (err, isTrue) => {
            if (!err && isTrue) {
              hash(req.body.password, 10, async (err, Password) => {
                if (!err) {
                  await prisma.users
                    .update({
                      where: { id: req.body.id },
                      data: {
                        email: req.body.email,
                        name: req.body.name,
                        username: req.body.username,
                        password: Password,
                        phone: req.body.phone,
                        ville: req.body.ville,
                        address: req.body.address,
                        codePostal: req.body.codePostal
                      },
                    })
                    .then((user) => {
                      res.status(200).json(user);
                    })
                    .catch((err) => {
                      res.status(500).json(err);
                    });
                } else {
                  res.status(402);
                }
              });
            } else {
              res.status(403);
            }
          });
        } else {
          prisma.users
            .update({
              where: { id: req.body.id },
              data: {
                email: req.body.email,
                name: req.body.name,
                username: req.body.username,
                phone: req.body.phone,
                ville: req.body.ville,
                address: req.body.address,
                codePostal: req.body.codePostal
              },
            })
            .then((user) => {
              res.status(200).json(user);
            })
            .catch((err) => {
              res.status(500);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
})
