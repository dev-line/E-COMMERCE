import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Mail from "@sendgrid/mail";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();
Mail.setApiKey(
  "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"
);
const { SECRET } = process.env;

export default async function fpassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const jwt = sign({ data: req.body.email }, SECRET!, { expiresIn: "1h" });
    await prisma.users
      .update({
        where: { email: req.body.email },
        data: { reset_password_token: req.body.email },
      })
      .then((data) => {
        if (data) {
          var msg =
            data.role == "ADMIN"
              ? `<h1>Hi ${data?.name}</h1><br/> To Reset Your Password Go to Link Bellow <br/> <a href="http://localhost:3000/dashboard/admin/rpassword/${jwt}">Reset Password</a>`
              : `<h1>Hi ${data?.name}</h1><br/> To Reset Your Password Go to Link Bellow <br/> <a href="http://localhost:3000/rpassword/${jwt}">Reset Password</a>`;
          var email = {
            from: "admin@hax.codes",
            to: data?.email,
            subject: "Reset Password",
            html: msg,
          };
          Mail.send(email)
            .then((send) => {
              res.json(send);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          res.status(403);
        }
      })
      .catch((err) => {
        res.status(403).json(err);
      });
  } else {
    res.status(404);
  }
}
