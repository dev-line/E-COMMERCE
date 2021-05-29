import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next'
import { AuthClient } from '../../../services/AuthClient';

export default AuthClient(async function Logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    await res.setHeader("Set-Cookie", serialize("auth", "", {maxAge: -1, path: '/' }))
    res.json({msg:"ok"})
  }else{
    res.status(404)
  }
})