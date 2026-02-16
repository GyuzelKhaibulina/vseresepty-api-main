
import cookie, { CookieSerializeOptions } from 'cookie'

export default async function GET(req, res) {    
    const token = req.cookies['token'];
    const email = req.cookies['email'];
    try{
        if (token)
        {
            if (token!=='deleted') 
            {
                return res.status(200).json({message: "User authenticated!", status:200, token:token, email:email})
            }
            return res.status(401).json({message: "Not authenticated!", status: 401, token:token, email:email})
        }
        else return res.status(401).json({message: "Not authenticated!", status: 401, token:token, email:email})
    }
    catch (error) {
        return res.status(500);
    }
}

