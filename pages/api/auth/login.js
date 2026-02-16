import db from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function login (req, res) {    
    if (req.method === "POST") {
        const email =  JSON.parse(req.body).username;
        try {   
            const response = await db(`SELECT * FROM users WHERE email = '${email}'`, []);
            if (response.length>0) {
                const respArr = response;
                for (let resp of respArr) {
                    const password = resp.password;               
                    const isPasswordCorrect = bcrypt.compareSync(
                        JSON.parse(req.body).password.toString(),
                        password
                    );                                     
                    if (isPasswordCorrect)          
                    {                    
                        const apiToken = jwt.sign({ id: resp.id }, "jwtkey");   
                        res.setHeader('Set-Cookie', [`token=${apiToken}`, `email=${email}`]);         
                        return res.status(200).json({"token": apiToken, status: 200, "email": email});
                    }
                    else {                       
                        return res.status(403).json({ error: 'Incorrect password!', status: 403 });
                    }                    
                }   
                return res.status(200).json(response);            
            }
            else return res.status(401).json({ error: 'User is not registered!', status: 401 });            
            }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    }
}

