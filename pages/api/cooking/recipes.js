import db from '../config/db';


export default async function all_recipes (req, res) {

    if (req.method === "GET") {
        if (req.query.subtype===undefined) {
            try {    
                const response = await db(`SELECT * FROM ${req.query.type}`, []); 
                return res.status(200).json(response);                     
            } 
            catch (error) {          
                return res.status(500).json({message: error})
            }    
        }
        
        else {
            try {    
                const response = await db(`SELECT * FROM ${req.query.type} WHERE type = "${req.query.subtype}"`, []); 
                return res.status(200).json(response);                     
            } 
            catch (error) {          
                return res.status(500).json({message: error})
            }  
        }
    }
    if (req.method === "POST") {
        try {    
            const response = await db(`SELECT * FROM recipes_types WHERE type = "${req.query.type}"`, []); 
            return res.status(200).json(response);                     
        } 
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    }
}

