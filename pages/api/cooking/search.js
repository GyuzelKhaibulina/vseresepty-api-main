import db from '../config/db';

export default async function search_recipe (req, res) {
        if (req.method === "GET") {
            try {    
                const response = await db(`SELECT * FROM ${req.query.type} WHERE name LIKE '%${req.query.search}%'`); 
                return res.status(200).json(response);                     
            } 
            catch (error) {          
                return res.status(500).json({message: error})
            }  
        }
}




    


