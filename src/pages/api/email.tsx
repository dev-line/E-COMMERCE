import { NextApiRequest, NextApiResponse } from 'next'
import Mail from '@sendgrid/mail'

Mail.setApiKey("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")
export default async function SendMail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    var email = {
      from: req.body.From,
      to: "Rayhamata2017@gmail.com",
      subject: req.body.Subject,
      html: `<h4>${req.body.Name}</h4><br/> ${req.body.Content}`
    };
    Mail.send(email).then(send=>{
      res.json(send)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }else{
    res.status(404)
  }
}