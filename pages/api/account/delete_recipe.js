import db from "../config/db";

export default async function delete_recipe (req, res) {
    if (req.method === "DELETE") {        
        const type =  req.query.cat;
        const id =  req.query.id;
        try {   
            const response = await db(`DELETE FROM ${type} WHERE id = ${id}`, []);
            return res.status(200).json(response); 
        }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
}