import db from "../config/db";

export default async function add_article_comment (req, res) {
    if (req.method === "POST") {           
        const params =  JSON.parse(req.body);            
        try {   
            const response = await db(`UPDATE articles SET comments='${params.comments}', likes='${params.likes}', dislikes='${params.dislikes}' WHERE id='${params.id}'`, []);                         
            res.status(200).json({message: "OK!", status: 200 }); 
            if (response.affectedRows>0)
            {
                 res.status(200).json({message: "OK!", status: 200 }); 
            }
            else res.status(403).json({ message: "ERROR!", status: 403 });             
        }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
}