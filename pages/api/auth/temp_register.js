
import db from "../config/db";

export default async function tempRegister (req, res) {   
    if (req.method === "DELETE") {
        const email = req.query.email;
        try {   
             const response = await db(`DELETE FROM temporary_users WHERE email = "${email}"`, []);
             return res.status(200).json({ message: 'Ok', status: 200 });            
        }    
         catch (error) {          
             return res.status(500).json({message: error})
        }  
    }
     
    if (req.method === "PUT") {
        const param =  JSON.parse(req.body);        
        try {   
             const response = await db(`INSERT INTO temporary_users(username,email, code) VALUES ("", "${param.email}", "${param.code}")`, []);
             return res.status(200).json({ message: 'Ok', status: 200 });            
        }    
         catch (error) {          
             return res.status(500).json({message: error})
        }  
    }
    if (req.method === "POST") {
        const param =  JSON.parse(req.body); 
        try {   
             const response = await db(`SELECT * FROM temporary_users WHERE email = "${param.email}" AND code = "${param.code}"`, []);
             if (response.length>0) 
             {
                return res.status(200).json({ message: 'Ok', status: 200 });  
             }
             else return res.status(403).json({ message: 'Wrong code', status: 403 });            
        }    
         catch (error) {          
             return res.status(500).json({message: error, status: 500})
        }  
    }
    if (req.method === "GET") {
        const key = req.query.key;
        const email = req.query.email;
        try {  
            const response = await db(`SELECT email FROM users WHERE email="${email}" AND key_link="${key}"`, []); 
             if (response.length>0) 
             {
                return res.status(200).json({ message: 'Ok.', status: 200 });  
             }
             else return res.status(403).json({ error: 'The data does not match!', status: 403 });            
        }    
         catch (error) {          
             return res.status(500).json({message: error, status: 500})
        }  
    }
    if (req.method === "PATCH") {
        const email = req.query.email;
        const key = req.query.key;
        try {   
             const response = await db(`UPDATE users SET key_link="" WHERE email="${email}" AND key_link="${key}"`, []);
             return res.status(200).json({ message: 'Ok', status: 200 });            
        }    
         catch (error) {          
             return res.status(500).json({message: error})
        }  
    }
}