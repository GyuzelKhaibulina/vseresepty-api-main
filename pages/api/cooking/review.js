import db from '../config/db';

export default async function review (req, res) {
    if (req.method === "PUT") {
        if (req.query.rating!=='undefined')
            {
            try {    
                const response = await db(`UPDATE ${req.query.type} SET rating='${req.query.rating}' WHERE id='${req.query.id}'`, []); 
                return res.status(200).json(response);                     
            } 
            catch (error) {          
                return res.status(500).json({message: error})
            }  
        }
    };
    if (req.method === "POST") {
        const type =  req.query.type;
        const id =  req.query.id;
        const json =  req.body;
        try {    
            const response = await db(`UPDATE ${type} SET review='${json}' WHERE id='${id}'`, []); 
            return res.status(200).json(response);                     
        } 
        catch (error) {          
            return res.status(500).json({message: error})
        }  
    };
}