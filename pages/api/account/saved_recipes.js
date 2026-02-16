import db from "../config/db";

export default async function saved_recipes (req, res) {
    if (req.method === "GET") {        
        const email =  req.query.email;
        try {   
            const response = await db(`SELECT * FROM users WHERE email='${email}'`, []);
            return res.status(200).json(response); 
        }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
    if (req.method === "PUT") {        
        const email =  req.query.email;
        const json =  req.body;
        try {   
            //const response = await db(`SELECT * FROM kitchen'`, []);
            const response = await db(`UPDATE users SET saved_recipes='${json}' WHERE email = '${email}'`, []);
            return res.status(200).json(response); 
        }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
}