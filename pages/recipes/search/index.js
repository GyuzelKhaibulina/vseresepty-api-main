"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import StarRating from '../../services/star_rating';
import HeadMetaTags from '../../components/head';

const SearchRecipes = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('state');
    const [recipesAll, setRecipesAll] = useState([]);  
    const [searchMain, setSearchMain] = useState([]);
    const [searchSoup, setSearchSoup] = useState([]);
    const [searchSecond, setSearchSecond] = useState([]);
    const [searchSalad, setSearchSalad] = useState([]);
    const [searchPelmeni, setSearchPelmeni] = useState([]);
    const [searchSnacks, setSearchSnacks] = useState([]);
    const [searchDough, setSearchDough] = useState([]);
    const [searchDrink, setSearchDrink] = useState([]);
    const [searchMulti, setSearchMulti] = useState([]);
    
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
            async function getMulti() {
                const res = await fetch(`/api/cooking/search?type=multi&search=${search}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setSearchMulti(data); 
                }).catch((err) => {
                    return(err);
                });
              }
            getMulti();     
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
        const arrRecipesMulti = searchMulti.map(obj => ({ ...obj, section: 'multi' }));
        Array.prototype.push.apply(array, arrRecipesMain);
        Array.prototype.push.apply(array, arrRecipesSoup);
        Array.prototype.push.apply(array, arrRecipesSecond);
        Array.prototype.push.apply(array, arrRecipesSalad);
        Array.prototype.push.apply(array, arrRecipesPelmeni);
        Array.prototype.push.apply(array, arrRecipesDough);
        Array.prototype.push.apply(array, arrRecipesSnack);
        Array.prototype.push.apply(array, arrRecipesDrink);
        Array.prototype.push.apply(array, arrRecipesMulti);
        setRecipesAll (ShuffleArray(array));
    }
    , [searchMulti, searchMain, searchSoup, searchSecond, searchSalad, searchPelmeni, searchDough, searchSnacks, searchDrink]);

    function ShuffleArray(array) {
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }      
        return array;
    }

  return (
    <div>
        <HeadMetaTags
            content="noindex" 
        /> 
        <Navbar/>   
        <div className='wrapRecipes'>  
            <div className='headerRecipe'>  
                {recipesAll&&recipesAll.length>0 &&
                <>
                <h2 className='pd-b-40'>Найденные рецепты</h2>
                <div className="rowsRecipes">                 
                        <>
                            {recipesAll.map((recipe, index) => 
                                <div className='containerRecipes' key={recipe.id}>
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} alt={recipe.name}/>
                                    }
                                    {recipe.cook_arr!=="null" &&                                    
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} alt={recipe.name} loading="lazy"/>                                                                                      
                                    }
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>                                     
                                            <span className='title'><Link href={`/recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
                                            <span className='rating_stars_list'>      
                                                <span className='pd-r-10'>         
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
                                </div>
                            )}                
                        </>
                    
                </div></>}
                {recipesAll.length===0 && 
                    <div className='pd-t-40 text-center'><h4>По заданному запросу ничего не найдено</h4></div>                
                }
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default SearchRecipes