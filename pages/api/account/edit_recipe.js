import db from "../config/db";

export default async function edit_recipe (req, res) {
    if (req.method === "POST") {        
        const id =  req.query.id;
        const cat =  req.query.type;
        const params =  JSON.parse(req.body);           
        try {   
            const response = await db(`UPDATE ${cat} SET name='${params.name}', ingredients='${params.ingredients}', cooking='${params.cooking}', img_main='${params.img_main}', veg='${params.veg}', note='${params.note}', cook='${params.cook}', lent='${params.lent}', calorie='${params.calorie}', festive='${params.festive}', unusual='${params.unusual}', spicy='${params.spicy}', exotic='${params.exotic}', cheap='${params.cheap}', marinade='${params.marinade}', bbq='${params.bbq}', kitchen='${params.typeKitchen}', cook_arr='${params.cook_arr}', ingredients_arr='${params.ingredients_arr}', proteins='${params.proteins}', fats='${params.fats}', carbohydrates='${params.carbohydrates}', calories='${params.calories}', links='${params.links}', gluten='${params.gluten}', lactose='${params.lactose}', complexity='${params.complexity}', hour='${params.hours}', minutes='${params.minutes}', price='${params.price}' WHERE id =${id}`, []);
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