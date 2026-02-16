"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StarRating from '../../services/star_rating';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import HeadMetaTags from '../../components/head';

const AllRecipes = () => {
    const search = "блин";
    const [recipesAll, setRecipesAll] = useState([]);  
    const [searchMain, setSearchMain] = useState([]);
    const [searchSoup, setSearchSoup] = useState([]);
    const [searchSecond, setSearchSecond] = useState([]);
    const [searchSalad, setSearchSalad] = useState([]);
    const [searchPelmeni, setSearchPelmeni] = useState([]);
    const [searchSnacks, setSearchSnacks] = useState([]);
    const [searchDough, setSearchDough] = useState([]);
    const [searchDrink, setSearchDrink] = useState([]);
    
    useEffect (() =>
        {  
            async function getMain() {
                const res = await fetch(`/api/cooking/search?type=main&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchMain(data);
                }).catch((err) => {
                    return(err);
                });
              }
            getMain();
            async function getSoup() {
                const res = await fetch(`/api/cooking/search?type=soup&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSoup(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getSoup();

            async function getSalad() {
                const res = await fetch(`/api/cooking/search?type=salad&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSalad(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getSalad();

            async function getSecond() {
                const res = await fetch(`/api/cooking/search?type=second&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSecond(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getSecond();
            async function getPelmeni() {
                const res = await fetch(`/api/cooking/search?type=pelmeni&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchPelmeni(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getPelmeni();
            async function getSnacks() {
                const res = await fetch(`/api/cooking/search?type=snacks&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchSnacks(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getSnacks();
            async function getDough() {
                const res = await fetch(`/api/cooking/search?type=dough&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchDough(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getDough();
            async function getDrink() {
                const res = await fetch(`/api/cooking/search?type=drink&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchDrink(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getDrink();       
    }, [search]);
    
    useEffect(() => {        
        const array = [];
        const arrRecipesMain = searchMain.map(obj => ({ ...obj, section: 'main' }));
        const arrRecipesSoup = searchSoup.map(obj => ({ ...obj, section: 'soup' }));
        const arrRecipesSecond = searchSecond.map(obj => ({ ...obj, section: 'second' }));
        const arrRecipesSalad = searchSalad.map(obj => ({ ...obj, section: 'salad' }));
        const arrRecipesPelmeni = searchPelmeni.map(obj => ({ ...obj, section: 'pelmeni' }));
        const arrRecipesDough = searchDough.map(obj => ({ ...obj, section: 'dough' }));
        const arrRecipesSnack = searchSnacks.map(obj => ({ ...obj, section: 'snacks' }));
        const arrRecipesDrink = searchDrink.map(obj => ({ ...obj, section: 'drink' }));
        Array.prototype.push.apply(array, arrRecipesMain);
        Array.prototype.push.apply(array, arrRecipesSoup);
        Array.prototype.push.apply(array, arrRecipesSecond);
        Array.prototype.push.apply(array, arrRecipesSalad);
        Array.prototype.push.apply(array, arrRecipesPelmeni);
        Array.prototype.push.apply(array, arrRecipesDough);
        Array.prototype.push.apply(array, arrRecipesSnack);
        Array.prototype.push.apply(array, arrRecipesDrink);
        setRecipesAll (array);
    }
    , [searchMain, searchSoup, searchSecond, searchSalad, searchPelmeni, searchDough, searchSnacks, searchDrink]);

  return (
    <>
        <HeadMetaTags
            title="масленица блины"
            description="масленица, блины, блинчики, рецепты, блюда, готовка, кулинария, кухня, вкусные рецепты, тесто, жарить, выпекать, pancakes, recipe, cook, taste dishes" 
            keywords="масленица, блины, блинчики, рецепты, блюда, готовка, кулинария, кухня, вкусные рецепты, тесто, жарить, выпекать, pancakes, recipe, cook, taste dishes"
            content="all" 

            ogTitle="масленица блины"
            ogDescription="масленица, блины, блинчики, рецепты, блюда, готовка, кулинария, кухня, вкусные рецепты, тесто, жарить, выпекать, pancakes, recipe, cook, taste dishes"
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle="масленица блины"
            twitterDescription="масленица, блины, блинчики, рецепты, блюда, готовка, кулинария, кухня, вкусные рецепты, тесто, жарить, выпекать, pancakes, recipe, cook, taste dishes"
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />     
        <Navbar/>             
        <div className='width-100-percent'>     
            <div className='headerRecipe'>  
                <h2>Масленица</h2>                        
                <div className="main-wrap pd-t-40">
                    {recipesAll && 
                        <>                            
                            {recipesAll.map((recipe, index) => 
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

            </div>
        </div>
        <Footer/>
    </>
  )
}

export default AllRecipes