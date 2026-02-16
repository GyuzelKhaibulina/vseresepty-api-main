import db from "../config/db";

export default async function account (req, res) {

    if (req.method === "PATCH") {        
        const params =  JSON.parse(req.body);   
        try {   
            const response = await db(`UPDATE users SET first_name='${params.first_name}', last_name='${params.last_name}', birth_day='${params.birth_day}' WHERE email='${params.email}'`, []);
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
       if (req.method === "POST") {        
        const params =  JSON.parse(req.body);        
        try {   
            const response = await db(`UPDATE users SET first_name='${params.first_name}', last_name='${params.last_name}' WHERE email='${params.email}'`, []);
            if (response.affectedRows>0)
            {
                 res.status(200).json({message: "Information has been successfully changed.", status: 200 }); 
            }
            else res.status(403).json({ message: "Information has not been changed!", status: 403 }); 
            }                 
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
    if (req.method === "GET") {   
        const email =  req.query.email;
        try {   
            const response = await db(`SELECT * FROM users WHERE email = '${email}'`, []);
            if (response.length>0)
            {
                res.status(200).json(response); 
            }
            else res.status(401).json({ message: "User does not exist!", status: 401 }); 
            }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
    if (req.method === "PUT") {        
        const params =  JSON.parse(req.body);   
        const avatar =  req.query.avatar; 
        try {   
            if (avatar === "null") 
            {
                const response = await db(`UPDATE users SET public_img='${params.public_img}', public_name='${params.public_name}', site='${params.site}', instagram='${params.instagram}', facebook='${params.facebook}', twitter='${params.twitter}' WHERE email='${params.email}'`, []);                       
                if (response.affectedRows>0)
                {
                    res.status(200).json({message: "Information has been successfully changed.", status: 200 }); 
                }
                else res.status(403).json({ message: "Information has not been changed!", status: 403 }); 
            }
            else  
            {
                const response = await db(`UPDATE users SET public_img='${params.public_img}' WHERE email='${params.email}'`, []);  
                if (response.affectedRows>0)
                {
                    res.status(200).json({message: "Information has been successfully changed.", status: 200 }); 
                }
                else res.status(403).json({ message: "Information has not been changed!", status: 403 }); 
            }

            }                 
        catch (error) {          
            return res.status(500).json({message: error})
        }     
    };
}