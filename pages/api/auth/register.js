
import db from "../config/db";
import SendGmail from '../services/send_gmail/SendGmail';
import bcrypt from "bcryptjs";

export default async function register (req, res) {      
    if (req.method === "GET") {
        const email =  req.query.email;  
        try {   
            const response = await db(`SELECT email FROM users WHERE email = '${email}'`, []);
            if (response.length>0) {
                 return res.status(401).json({ message: 'The user already exists!', status: 401 });            
            }
            else return res.status(200).json({ message: 'Ok', status: 200 });            
            }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    }
    if (req.method === "POST") {
        const param =  JSON.parse(req.body); 
        try {    
            return res.status(200).json({result: SendGmail.send(param.email, param.message, param.subject, param.html)});                     
        }       
        catch (error) {          
            return res.status(500).json({message: error})
        }
    }
    if (req.method === "PUT") {
         const param =  JSON.parse(req.body); 
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(param.password, salt);
         try {   
            const response = await db(`UPDATE users SET password="${hash}", saved_recipes='{"saved":[]}', visited_pages='{"visited":[]}' WHERE email="${param.email}"`)
            return res.status(200).json({ message: 'Ok', status: 200 });            
         }    
          catch (error) {          
              return res.status(500).json({message: error})
         }  
    }
    if (req.method === "PATCH") {
        const param =  JSON.parse(req.body); 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(param.password, salt);
        try {   
           const response = await db(`UPDATE users SET password="${hash}", saved_recipes='{"saved":[]}' WHERE email="${param.email}"`)
           return res.status(200).json({ message: 'Ok', status: 200 });            
        }    
         catch (error) {          
             return res.status(500).json({message: error})
        }  
   }
}