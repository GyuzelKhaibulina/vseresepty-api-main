import db from "../config/db";

export default async function add_recipe (req, res) {
    if (req.method === "POST") {           
        const params =  JSON.parse(req.body);           
        try {   
            const response = await db(`INSERT INTO ${params.typeRecipe} (name, img_main, type, veg, note, review, username, date, add_section, add_subsection, section, lent, calorie, festive, unusual, spicy, exotic, cheap, marinade, bbq, kitchen, useremail, ingredients_arr, cook_arr, proteins, fats, carbohydrates, calories, links, gluten, lactose, complexity, hour, minutes, price) VALUES ('${params.name}', '${params.img_main}', '${params.type}', '${params.veg}', '${params.note}', '${params.review}', '${params.publicUserName}', '${params.date}', '${params.add_section}', '${params.add_subsection}', '${params.typeRecipe}', '${params.lent}', '${params.calorie}', '${params.festive}', '${params.unusual}', '${params.spicy}', '${params.exotic}', '${params.cheap}', '${params.marinade}', '${params.bbq}', '${params.typeKitchen}', '${params.username}', '${params.ingredients_arr}', '${params.cook_arr}', '${params.proteins}', '${params.fats}', '${params.carbohydrates}', '${params.calories}', '${params.links}', '${params.gluten}', '${params.lactose}', '${params.complexity}', '${params.hours}', '${params.minutes}', '${params.price}')`, []);               
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