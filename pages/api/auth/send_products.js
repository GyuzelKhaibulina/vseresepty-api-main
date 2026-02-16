import db from "../config/db";

export default async function add_products (req, res) {
    if (req.method === "POST") {        
        const params =  JSON.parse(req.body);
            try {  
            const response = db(`INSERT INTO products (name,proteins,fats,carbohydrates,calories) VALUES ("${params.name}", "${params.data1}", "${params.data2}", "${params.data3}", "${params.data4}")`, []);
            return res.status(200).json(response); 
            }    
        catch (error) {          
            return res.status(500).json({message: error})
        }  
        
     }
     if (req.method === "GET") {        
            try {               
            const response = await db(`SELECT * FROM products`, []);
            return res.status(200).json(response); 
            }    
        catch (error) {          
            return res.status(500).json({message: error})
        }  
    }
}