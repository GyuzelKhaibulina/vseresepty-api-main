import db from '../config/db';

export default async function recipe (req, res) {    
        if (req.method === "GET") {
            try {    
                const response = await db(`SELECT * FROM ${req.query.type} WHERE id = ${req.query.id}`, []); 
                return res.status(200).json(response);                     
            } 
            catch (error) {          
                return res.status(500).json({message: error})
            }  
        }
}