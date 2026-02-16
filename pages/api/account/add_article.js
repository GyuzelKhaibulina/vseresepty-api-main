import db from "../config/db";

export default async function add_article (req, res) {
    if (req.method === "POST") {           
        const params =  JSON.parse(req.body);   
        try {   
            const response = await db(`INSERT INTO articles (name, img_main, date, text, username, note, useremail, links, review, sections, comments) VALUES ('${params.name}', '${params.img_main}', '${params.date}', '${params.text}', '${params.publicUserName}', '${params.note}', '${params.username}', '${params.links}', '${params.review}', '${params.sections}', '${params.comments}')`, []);               
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