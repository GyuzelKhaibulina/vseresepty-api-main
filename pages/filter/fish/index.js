"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StarRating from '../../services/star_rating';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import { useRecipesArray } from '../../context/all_recipes_array';
import { useRouter } from 'next/router';
import HeadMetaTags from '../../components/head';

const AllFish = () => {
    const [recipesAll, setRecipesAll] = useState([]);  
    const [isLoading, setIsLoading] = useState([]);  
    const allRecipesArr = useRecipesArray();
    const [recipesAllFest, setRecipesAllFest] = useState([]); 

    useEffect (() =>    
    {    
        allRecipesArr;
    }, [allRecipesArr]); 

    useEffect (() =>    
    {    
         if (allRecipesArr.allRecipesArray.length>0) {
            setRecipesAll (allRecipesArr.allRecipesArray);
            setIsLoading (allRecipesArr.isLoading);
        }   
    }, [allRecipesArr]); 

    useEffect (() =>    
    {   
    let newArray = [];              
    recipesAll.filter(function(item) {                
            if (item.type==="fish")
            {
                newArray.push(item)
            }
        })    
    let uniqueRecipes = newArray.filter(function(item, pos) {
        return newArray.indexOf(item) == pos;
    })
    setRecipesAllFest(uniqueRecipes);  
}, [recipesAll]); 

  return (
    <>
        <HeadMetaTags
            title="рецепты блюд с рыбой и морепродуктами"
            description="блюда с рыбой, морепродукты, рецепты, креветки, мидии, форель, dishes, recipe fish seafood" 
            keywords="блюда с рыбой, морепродукты, рецепты, креветки, мидии, форель, dishes, recipe fish seafood"
            content="all" 
            ogTitle="рецепты блюд с рыбой и морепродуктами"
            ogDescription="блюда с рыбой, морепродукты, рецепты, креветки, мидии, форель, dishes, recipe fish seafood"
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle="рецепты блюд с рыбой и морепродуктами"
            twitterDescription="блюда с рыбой, морепродукты, рецепты, креветки, мидии, форель, dishes, recipe fish seafood"
            twitterImage="/public/img/openGrafPreview_1.jpg"
        /> 
        <Navbar/>             
        <div className='width-100-percent'>     
            <div className='headerRecipe'>  
                <h2>Рыба и морепродукты</h2>                        
                <div className="main-wrap pd-t-40">
                    {recipesAllFest && 
                        <>                            
                            {recipesAllFest.map((recipe, index) => 
                                <div className='all-recipes-item' key={index}>
                                <div>
                                    <ul className="hover-effect-cover">
                                        <li>
                                            {recipe.cook_arr==="null" &&
                                                <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                            }
                                            {recipe.cook_arr!=="null" && 
                                                <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                            }
                                            <div className="effect-to-left"> 
                                                    {recipe.gluten===1 && 
                                                        <p>БЕЗГЛЮТЕНОВОЕ</p>                                               
                                                    }
                                                    {recipe.lactose===1 && 
                                                        <p>БЕЗЛАКТОЗНОЕ</p>                                               
                                                    }
                                                    {recipe.lent===1 && 
                                                        <p>ПОСТНОЕ</p>                                               
                                                    }                                                
                                                    {recipe.veg===1 && 
                                                        <p>ВЕГЕТАРИАНСКОЕ</p>                                               
                                                    } 
                                                    {recipe.calorie===1 && 
                                                        <p>НИЗКОКАЛОРИЙНОЕ</p>                                               
                                                    }
                                                    {recipe.festive===1 && 
                                                        <p>ПРАЗДНИЧНОЕ</p>                                               
                                                    }                                            
                                            </div>
                                        </li>
                                    </ul>
                                </div>                                  
                                <span className='recipe_title'>
                                    <span className='title pd-l-15 pd-r-10 pd-t-15'>
                                        <Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> 
                                    </span>                        
                                    <span className='rating_stars'>      
                                        <span>         
                                            <StarRating                    
                                                count={5}
                                                size = {24}
                                                rating = {recipe.rating}
                                            ></StarRating>  
                                        </span>   
                                        <span className='ratingList'>Рейтинг</span>                                            
                                    </span> 
                                </span>                                                                   
                                </div>                              
                            )}                
                        </>
                    }
                </div>
                {!isLoading && <div className='text-center'><Loading size="l"/></div>} 
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default AllFish