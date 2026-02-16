import db from "../config/db";

export default async function addUser (req, res) {
       if (req.method === "POST") {        
        const params =  JSON.parse(req.body);
        try {   
            const response = await db(`INSERT INTO users(username,email,key_link,password,public_name) VALUES ("", "${params.userEmail}", "${params.keyLink}", "${params.keyLink}", "${params.autor}")`, []);
            res.status(200).json({ status: 200 }); 
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
                res.status(403).json({message: "The user already exist!", status: 403 }); 
            }
            else res.status(200).json({ message: "OK!", status: 200 }); 
            }    
        catch (error) {          
            return res.status(500).json({message: error})
        }    
    };
    if (req.method === "PATCH") {        
        const email =  req.query.email;
        const key =  req.query.key;
        try {   
            const response = await db(`UPDATE users SET key_link="${key}" WHERE email="${email}"`, []);
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

