import db from "../config/db";

export default async function visited_pages (req, res) {
    if (req.method === "PUT") {        
        const email =  req.query.email;
        const json =  req.body;
        try {   
            //const response = await db(`SELECT * FROM kitchen'`, []);
            const response = await db(`UPDATE users SET visited_pages='${json}' WHERE email = '${email}'`, []);
            return res.status(200).json(response); 
        }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
}