import formidable from 'formidable';
import fs from 'fs';
import {NextApiRequest,NextApiResponse} from 'next';

import { Auth } from '../../../services/Auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default Auth(async function Upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const form: any = new formidable.IncomingForm()
    const filesys:any = fs
  form.uploadDir = "public/upload";
  form.keepExtensions = true;
  form.parse(req, (err:any, fields:any, files:any) => {
    const SupportedFile = ["png","jpg"]
    const Path: String = files?.file?.path!;
    if (Path) {
    const File = Path.split("\\");
    const FileName = File.pop();
    const FilePart = FileName!.split(".");
    const FileType = FilePart.pop();
    if (SupportedFile.indexOf(FileType!)==-1) {
      filesys.rmSync(files.file.path);
      res.status(400).json({ MSG: "Can`t Upload This File" });
    }else{
      res.json({ src: FileName });
    }
    } else {
      res.status(400).json({ MSG: "Can`t Upload This File" });
    }
  });
});
