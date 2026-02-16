
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import StarRating from '../../services/star_rating';
import Link from 'next/link';
import { useRecipesArray } from '../../context/all_recipes_array';
import HeadMetaTags from '../../components/head';

const Filter = ({props}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();        
    //const [searchKitchen, setSearchKitchen] = useState([]);
    const [searchMain, setSearchMain] = useState([]);
    const [searchSoup, setSearchSoup] = useState([]);
    const [searchSecond, setSearchSecond] = useState([]);
    const [searchSalad, setSearchSalad] = useState([]);
    const [searchPelmeni, setSearchPelmeni] = useState([]);
    const [searchSnacks, setSearchSnacks] = useState([]);
    const [searchDough, setSearchDough] = useState([]);
    const [searchDrink, setSearchDrink] = useState([]);
    const [searchMulti, setSearchMulti] = useState([]);
    //const [isKitchen, setIsKitchen] = useState(false);
    const [isMain, setIsMain] = useState(false);
    const [isSoup, setIsSoup] = useState(false);
    const [isSecond, setIsSecond] = useState(false);
    const [isSalad, setIsSalad] = useState(false);
    const [isPelmeni, setIsPelmeni] = useState(false);
    const [isSnacks, setIsSnacks] = useState(false);
    const [isDough, setIsDough] = useState(false);
    const [isDrink, setIsDrink] = useState(false); 
    const [isMulti, setIsMulti] = useState(false);
    const [isAllRecipes, setIsAllRecipes] = useState(false);  // выбраны все разделы
    const [isSingleRecipes, setIsSingleRecipes] = useState(false);   // выбран раздел
    const [isAllComposition, setIsAllComposition] = useState(false);  // выбран состав
    const [isAllKind, setIsAllKind] = useState(false);  // выбран тип
    const [isAllProperty, setIsAllProperty] = useState(false);  // выбрано свойство
    const [isAllKindComposition, setIsAllKindComposition] = useState(false);  // выбран состав и тип
    const [isAllKindProperty, setIsAllKindProperty] = useState(false);  // выбран тип и свойство
    const [isAllCompositionProperty, setIsAllCompositionProperty] = useState(false);  // выбраны состав и свойство
    const [isAllCompositionKindProperty, setIsAllCompositionKindProperty] = useState(false);  // состав, тип и свойство    
    const [isSingleComposition, setIsSingleComposition] = useState(false);  // выбран раздел и состав
    const [isSingleKind, setIsSingleKind] = useState(false);  // выбран раздел и тип
    const [isSingleProperty, setIsSingleProperty] = useState(false);  // выбран раздел и свойство
    const [isSingleCompositionKind, setIsSingleCompositionKind] = useState(false);  // выбран раздел, состав и тип
    const [isSingleCompositionProperty, setIsSingleCompositionProperty] = useState(false);  // выбран раздел, состав и свойство
    const [isSingleKindProperty, setIsSingleKindProperty] = useState(false);  // выбран раздел, тип и свойство
    const [isSingleKindCompositionProperty, setIsSingleKindCompositionProperty] = useState(false);  // выбран раздел, состав, тип и свойство 
    const [allRecipes, setAllRecipes] = useState([]);  // выбраны все разделы
    const [singleRecipes, setSingleRecipes] = useState([]);   // выбран раздел
    const [allComposition, setAllComposition] = useState([]);  // выбран состав
    const [allKind, setAllKind] = useState([]);  // выбран тип
    const [allProperty, setAllProperty] = useState([]);  // выбрано свойство
    const [allKindComposition, setAllKindComposition] = useState([]);  // выбран состав и тип
    const [allKindProperty, setAllKindProperty] = useState([]);  // выбран тип и свойство
    const [allCompositionProperty, setAllCompositionProperty] = useState([]);  // выбраны состав и свойство
    const [allCompositionKindProperty, setAllCompositionKindProperty] = useState([]);  // состав, тип и свойство    
    const [singleComposition, setSingleComposition] = useState([]);  // выбран раздел и состав
    const [singleKind, setSingleKind] = useState([]);  // выбран раздел и тип
    const [singleProperty, setSingleProperty] = useState([]);  // выбран раздел и свойство
    const [singleCompositionKind, setSingleCompositionKind] = useState([]);  // выбран раздел, состав и тип
    const [singleCompositionProperty, setSingleCompositionProperty] = useState([]);  // выбран раздел, состав и свойство
    const [singleKindProperty, setSingleKindProperty] = useState([]);  // выбран раздел, тип и свойство
    const [singleKindCompositionProperty, setSingleKindCompositionProperty] = useState([]);  // выбран раздел, состав, тип и свойство        
    let type = useSearchParams().get('type');  // раздел
    let composition = useSearchParams().get('composition');  // состав
    let kind = useSearchParams().get('kind');  // тип
    let property = useSearchParams().get('property');  // свойство
    const allRecipesArr = useRecipesArray();

    // рецепты по разделам
    useEffect (() =>
    {    
        setIsLoading (false);    
        // получаем массивы всех рецептов по разделам         
        if (type==="all")
        {         
            setIsLoading (true);         
                         
            async function getMain() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=main`, {
                    method: "GET",
                })
                if (res.status===200)                      
                {
                    setIsMain(true);
                }                    
                return res.json().then((data) => {
                    setSearchMain(data);
                }).catch((err) => {
                    return(err);
                });
            };
            getMain();            
            async function getSoup() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=soup`, {
                    method: "GET",
                }) 
                if (res.status===200)                      
                {
                    setIsSoup(true);
                }                   
                return res.json().then((data) => {
                    setSearchSoup(data); 
                }).catch((err) => {
                        return(err);
                });
            };
            getSoup();            
            async function getSalad() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=salad`, {
                    method: "GET",
                })  
                if (res.status===200)                      
                {
                    setIsSalad(true);
                }                  
                return res.json().then((data) => {
                    setSearchSalad(data); 
                }).catch((err) => {
                    return(err);
                });
            };
            getSalad();            
            async function getSecond() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=second`, {
                    method: "GET",
                }) 
                if (res.status===200)                      
                {
                    setIsSecond(true);
                }                   
                return res.json().then((data) => {
                    setSearchSecond(data); 
                }).catch((err) => {
                return(err);
                });
            };
            getSecond();            
            async function getPelmeni() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=pelmeni`, {
                    method: "GET",
                })   
                if (res.status===200)                      
                {
                    setIsPelmeni(true);
                }                 
                return res.json().then((data) => {
                    setSearchPelmeni(data); 
                }).catch((err) => {
                return(err);
                });
            };
            getPelmeni();
            async function getSnacks() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=snacks`, {
                    method: "GET",
                })  
                if (res.status===200)                      
                {
                    setIsSnacks(true);
                }                  
                return res.json().then((data) => {
                    setSearchSnacks(data); 
                }).catch((err) => {
                    return(err);
                });
            };
            getSnacks();
            async function getDough() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=dough`, {
                    method: "GET",
                })
                if (res.status===200)                      
                {
                    setIsDough(true);
                }                    
                return res.json().then((data) => {
                    setSearchDough(data); 
                }).catch((err) => {
                    return(err);
                });
            };
            getDough();
            async function getDrink() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=drink`, {
                    method: "GET",
                })    
                if (res.status===200)                      
                {
                    setIsDrink(true);
                }                
                return res.json().then((data) => {
                    setSearchDrink(data); 
                }).catch((err) => {
                    return(err);
                });
            };
            getDrink(); 
            async function getMulti() {
                setIsLoading (true);  
                const res = await fetch(`/api/cooking/recipes?type=multi`, {
                    method: "GET",
                })    
                if (res.status===200)                      
                {
                    setIsMulti(true);
                }                
                return res.json().then((data) => {
                    setSearchMulti(data); 
                }).catch((err) => {
                    return(err);
                });
            };
            getMulti(); 
            setSingleRecipes ([]); 
            if (isMain&&isSoup&&isSecond&&isSalad&&isPelmeni&&isSnacks&&isDough&&isDrink&&isMulti)       
            {
                 setIsLoading (false);
            }
        } 
        // получаем массив рецептов по разделам 
        if (type!=="all") {    
     
             async function getRecipe() {   
                setIsLoading (true);           
                 const res = await fetch(`/api/cooking/recipes?type=${type}`, {
                     method: "GET",
                 })            
                 return res.json().then((data) => {
                     setSingleRecipes(data);                      
                     setAllRecipes ([]);                   
                     setIsLoading (false);
                 }).catch((err) => {
                     return(err);                    
                 });                                
             };        
             getRecipe(); 
        }   
               
    }, [router, type, kind, composition, property]);

    //массив всех рецептов
    useEffect (() =>    
    {    
        allRecipesArr;
    }, [allRecipesArr, router]); 

    useEffect (() =>    
    {    
         if (allRecipesArr.allRecipesArray.length>0) {
            setAllRecipes (allRecipesArr.allRecipesArray);
        }   
    }, [allRecipesArr, router, isAllComposition, type, kind, composition, property]);  

    useEffect(() => {
        setIsAllRecipes (false);
        setIsSingleRecipes (false);
        setIsAllComposition (false);
        setIsAllKind (true);
        setIsSingleKind (false);
        setIsAllKindComposition (false);
        setIsAllProperty (false);
        setIsSingleProperty (false);
        setIsSingleCompositionProperty (false);
        setIsAllCompositionProperty (false);
        setIsSingleKindProperty (false);
        setIsAllKindProperty (false);
        setIsAllCompositionKindProperty (false);
        setIsSingleKindCompositionProperty (false);
        if (type==="all"&&composition==="all"&&kind==="all"&&property==="all") // выбраны все разделы
        {        
            setIsAllRecipes (true);
        }
        else setIsAllRecipes (false);
        if (type!=="all"&&composition==="all"&&kind==="all"&&property==="all") {  // выбран раздел
            setIsSingleRecipes(true);
        }  
        else setIsSingleRecipes (false);
        if (type==="all"&&composition!=="all"&&kind==="all"&&property==="all") // состав
        {        
            setIsAllComposition (true);
        }
        else setIsAllComposition (false);
        if (type!=="all"&&composition!=="all"&&kind==="all"&&property==="all") {  // выбран раздел и состав
            setIsSingleComposition(true);
        }  
        else setIsSingleComposition(false);
        if (type==="all"&&composition==="all"&&kind!=="all"&&property==="all") // выбран тип
        {        
            setIsAllKind (true);
        }
        else setIsAllKind (false);
        if (type!=="all"&&composition==="all"&&kind!=="all"&&property==="all") // выбран раздел и тип
        {        
            setIsSingleKind (true);
        }
        else setIsSingleKind (false);
        if (type==="all"&&composition!=="all"&&kind!=="all"&&property==="all") // выбран состав и тип
        {        
            setIsAllKindComposition (true);
        }
        else setIsAllKindComposition (false);
        if (type!=="all"&&composition!=="all"&&kind!=="all"&&property==="all") {  // выбран раздел, состав и тип
            setIsSingleCompositionKind(true);            
        }  
        else setIsSingleCompositionKind(false);
        if (type==="all"&&composition==="all"&&kind==="all"&&property!=="all") // свойство
        {        
            setIsAllProperty (true);
        }
        else setIsAllProperty (false);
        if (type!=="all"&&composition==="all"&&kind==="all"&&property!=="all") // выбран раздел и свойство
        {        
            setIsSingleProperty (true);
        }
        else setIsSingleProperty (false);
        if (type!=="all"&&composition!=="all"&&kind==="all"&&property!=="all") // выбран раздел, состав и свойство
        {        
            setIsSingleCompositionProperty (true);
        }
        else setIsSingleCompositionProperty (false);
        if (type==="all"&&composition!=="all"&&kind==="all"&&property!=="all") // выбран состав и свойство
        {        
            setIsAllCompositionProperty (true);
        }
        else setIsAllCompositionProperty (false);
        if (type!=="all"&&composition==="all"&&kind!=="all"&&property!=="all") // выбран раздел, тип и свойство
        {        
            setIsSingleKindProperty (true);
        }
        else setIsSingleKindProperty (false);
        if (type==="all"&&composition==="all"&&kind!=="all"&&property!=="all") // выбран тип и свойство
        {        
            setIsAllKindProperty (true);
        }
        else setIsAllKindProperty (false);
        if (type==="all"&&composition!=="all"&&kind!=="all"&&property!=="all") // выбран состав, тип и свойство
        {        
            setIsAllCompositionKindProperty (true);
        }
        else setIsAllCompositionKindProperty (false);
        if (type!=="all"&&composition!=="all"&&kind!=="all"&&property!=="all") // выбран раздел, состав, тип и свойство
        {        
            setIsSingleKindCompositionProperty (true);
        }
        else setIsSingleKindCompositionProperty (false);
   
    }, [router, type, kind, composition, property]);


    //массивы с составом
    useEffect (() =>    
    {            
        setIsLoading (false);               
        if (isAllComposition&&allRecipes.length>0)  // выбран состав
            { 
                let str = `${composition}`;
                let arrStr = [];                
                arrStr = str.split(',');
                let newArray = [];   
                setIsLoading (true); 
                if (isAllComposition&&allRecipes.length>0)
                for(const arr of allRecipes) {                                 
                    if (arr.ingredients_arr&&(arr.ingredients_arr==="null"))                    {

                        arrStr.map((x) => {
                        let y = x.replace(/['"]/g, '');  
                                    
                        if (arr.ingredients&&arr.ingredients.length>0&&arr.ingredients_arr)
                        {
                            let indexOfFirst = arr.ingredients.toLowerCase().indexOf(y);   
                            if (indexOfFirst!==-1) {
                                newArray.push(arr);                     
                            }                         
                        }                 
                        });               
                    }  
                    if (arr.ingredients_arr&&(arr.ingredients_arr!=="null"))
                    {
                        arrStr.map((x) => {
                        let y = x.replace(/['"]/g, '');  
                                    
                        if (arr.ingredients_arr&&arr.ingredients_arr.length>0&&arr.ingredients_arr)
                        {
                            let indexOfFirst = arr.ingredients_arr.toLowerCase().indexOf(y);   
                            if (indexOfFirst!==-1) {
                                newArray.push(arr);                     
                            }                         
                        }                 
                        });               
                    }  
                }
                
                let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
                })
                setAllComposition (uniqueRecipes); 
                setIsLoading (false);                                     
            }   
    }, [router, isAllComposition, type, kind, composition, property]) 
        
    useEffect (() =>
        {  
            if (isSingleComposition&&singleRecipes.length>0)   // выбран раздел и состав
            { 
            setIsLoading (true); 
            let str = `${composition}`;
            let arrStr = [];                
            arrStr = str.split(',');
            let newArray = [];   
           
            for(const arr of singleRecipes) {
                arrStr.map((x) => {
                    let y = x.replace(/['"]/g, '');    
               
                    if (arr.ingredients&&arr.ingredients.length>0&&(arr.ingredients_arr==="null"))
                    {
                        let indexOfFirst = arr.ingredients.toLowerCase().indexOf(y);   
                        if (indexOfFirst!==-1) {
                             newArray.push(arr);                     
                        }
                    }
                    if (arr.ingredients&&arr.ingredients.length>0&&(arr.ingredients_arr!=="null"))
                    {
                        let indexOfFirst = arr.ingredients.toLowerCase().indexOf(y);   
                        if (indexOfFirst!==-1) {
                             newArray.push(arr);                     
                        }
                    }
                    });                                   
              }  
              let uniqueRecipes = newArray.filter(function(item, pos) {
                  return newArray.indexOf(item) == pos;
              })           
             setSingleComposition(uniqueRecipes);  
             setIsLoading (false);                                                                           
         }             
    }, [router, isSingleComposition, type, kind, composition, property]) 
 
    
    // массивы с типом
     useEffect (() =>
     {    
        if (isAllKind&&allRecipes.length>0)   // выбран тип
        {     
            setIsLoading (true);                  
            let str = `${kind}`;
            let arrStr = [];                
            arrStr = str.split(',');
            let newArray = [];  
            // фильтруем массив всех рецептов через тип блюда 
                for(const arr of allRecipes) {
                    arrStr.map((x) => {
                        let y = x.replace(/['"]/g, '');                                          
                        if (arr.ingredients&&arr.ingredients.length>0&&(arr.ingredients_arr==="null"))
                        {
                            let indexOfFirst = arr.name.toLowerCase().indexOf(y);                                  
                            if (indexOfFirst!==-1) {
                                newArray.push(arr);                                                                               
                            }
                        }
                        
                        if (arr.ingredients_arr&&arr.ingredients_arr.length>0&&(arr.ingredients_arr!=="null"))
                        {                            
                            let indexOfFirst = arr.name.toLowerCase().indexOf(y);   
                            if (indexOfFirst!==-1) {
                                newArray.push(arr);                     
                            }
                        }
                        });                             
                }  
                let uniqueRecipes = newArray.filter(function(item, pos) {
                    return newArray.indexOf(item) == pos;
                })
                setAllKind (uniqueRecipes); 
                setIsLoading (false);                                                 
        }
    }, [isAllKind, router, type, kind, composition, property]) 
    useEffect (() => {
        if (isSingleKind&&singleRecipes.length>0)  // выбран раздел и тип
        {
            let str = `${kind}`;
            let arrStr = [];                
            arrStr = str.split(',');
            let newArray = [];  
            setIsLoading (true);               
            for(const arr of singleRecipes) {
                arrStr.map((x) => {
                    let y = x.replace(/['"]/g, '');                   
                    if (arr.ingredients&&arr.ingredients.length>0&&(arr.ingredients_arr==="null"))
                    {
                        let indexOfFirst = arr.name.toLowerCase().indexOf(y);                                  
                        if (indexOfFirst!==-1) {
                            newArray.push(arr);                                                   
                        }
                    }
                    if (arr.ingredients_arr&&(arr.ingredients_arr!=="null"))
                    {
                        let indexOfFirst = arr.name.toLowerCase().indexOf(y);   
                        if (indexOfFirst!==-1) {
                            newArray.push(arr);                     
                        }
                    }
                    });               
              
            }  
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setSingleKind (uniqueRecipes); 
            setIsLoading (false); 
        }
    }, [router, isSingleKind, type, kind, composition, property]) 
    useEffect (() => {
        if (isAllKindComposition&&allComposition.length>0)  // выбран состав и тип             
        {
            setIsLoading (true);
            let str = `${kind}`;
            let arrStr = [];                
            arrStr = str.split(',');
            let newArray = [];         
            for(const arr of allComposition) {
                arrStr.map((x) => {
                    let y = x.replace(/['"]/g, '');                  
                    if (arr.ingredients&&arr.ingredients.length>0&&(arr.ingredients_arr==="null"))
                    {
                        let indexOfFirst = arr.ingredients.toLowerCase().indexOf(y);                                  
                        if (indexOfFirst!==-1) {
                            newArray.push(arr);                                                   
                        }
                    }
                    if (arr.ingredients_arr&&(arr.ingredients_arr!=="null"))
                    {
                        let indexOfFirst = arr.ingredients_arr.toLowerCase().indexOf(y);   
                        if (indexOfFirst!==-1) {
                            newArray.push(arr);                     
                        }
                    }
                    });               
              
            } 
            let uniqueArray = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setAllKindComposition (uniqueArray); 
            setIsLoading (false);
        }
    }, [router, isAllKindComposition, type, kind, composition, property]) 
    useEffect (() => {
        if (isSingleCompositionKind&&singleComposition.length>0)  // выбран раздел состав и тип           
        {
            let str = `${kind}`;
            let arrStr = [];                
            arrStr = str.split(',');
            let newArray = [];  
            setIsLoading (true);  
                         
            for(const arr of singleComposition) {
                arrStr.map((x) => {
                    let y = x.replace(/['"]/g, '');                 
                    if (arr.ingredients&&arr.ingredients.length>0&&(arr.ingredients_arr==="null"))
                    {
                        let indexOfFirst = arr.ingredients.toLowerCase().indexOf(y);                                  
                        if (indexOfFirst!==-1) {
                            newArray.push(arr);                                                   
                        }
                    }
                    if (arr.ingredients_arr&&(arr.ingredients_arr!=="null"))
                    {
                        let indexOfFirst = arr.ingredients_arr.toLowerCase().indexOf(y);   
                        if (indexOfFirst!==-1) {
                            newArray.push(arr);                     
                        }
                    }
                    });               
              
            };
            let uniqueArray = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            });             
            setSingleCompositionKind (uniqueArray); 
            setIsLoading (false);
        }

 }, [router, isSingleCompositionKind, type, kind, composition, property]) 
 
  

    // массивы со свойствами
      useEffect (() =>
      {    
        if (isAllProperty&&allRecipes.length>0)  //выбрано свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            allRecipes.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setAllProperty(uniqueRecipes);                           
        }
    }, [router, isAllProperty, type, kind, composition, property]);
        useEffect (() =>
      {   
        if (isSingleProperty&&singleRecipes.length>0)  //выбран раздел и свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            singleRecipes.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setSingleProperty(uniqueRecipes);                           
        }
    }, [router, isSingleProperty, type, kind, composition, property]);
        useEffect (() =>
      {   
        if (isSingleCompositionProperty&&singleComposition.length>0)  //выбран раздел, состав и свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            singleComposition.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setSingleCompositionProperty(uniqueRecipes);                           
        }
    }, [router, isSingleCompositionProperty, type, kind, composition, property]);
        useEffect (() =>
      {   
        if (isAllCompositionProperty&&allComposition.length>0)  //выбран состав и свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            allComposition.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setAllCompositionProperty(uniqueRecipes);                           
        }
    }, [router, isAllCompositionProperty, type, kind, composition, property]);
        useEffect (() =>
      {   
        if (isSingleKindProperty&&singleKind.length>0)  //выбран раздел, тип и свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            singleKind.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setSingleKindProperty(uniqueRecipes);                           
        }
    }, [router, isSingleKindProperty, type, kind, composition, property]);
        useEffect (() =>
      {   
        if (isAllKindProperty&&allKind.length>0)  //выбран тип и свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            allKind.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setAllKindProperty(uniqueRecipes);                           
        } 
    }, [router, isAllKindProperty, type, kind, composition, property]);
        useEffect (() =>
      {                            
        if (isAllCompositionKindProperty&&allKindComposition.length>0)  //выбран состав, тип и свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            allKindComposition.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setAllCompositionKindProperty(uniqueRecipes);                           
        }
    }, [router, isAllCompositionKindProperty, type, kind, composition, property]); 
        useEffect (() =>
      {   
        if (isSingleKindCompositionProperty&&singleCompositionKind.length>0)  //выбран раздел, состав, тип и свойство
        {
            const str = `${property}`;
            let arrStr = [];                
            arrStr = str.split(',');  
            let newArray = [];              
            singleCompositionKind.filter(function(item) {                
                arrStr.map (x => {
                    if (item[x]===1)
                    {
                        newArray.push(item)
                    }
                })
            })
            let uniqueRecipes = newArray.filter(function(item, pos) {
                return newArray.indexOf(item) == pos;
            })
            setSingleKindCompositionProperty(uniqueRecipes);                           
        }   
    }, [router, isSingleKindCompositionProperty, type, kind, composition, property]);
 

return (
    <>
        <HeadMetaTags
            title="Поиск рецептов по параметрам"        
            content="noindex" 
        /> 
        <Navbar/>   
        <div className='wrapRecipes'>     
            <div className='headerRecipe'>  
                <h2>Рецепты по параметрам</h2>                        
                <div className="rowsRecipes pd-b-40">
                    <p>{router.query.typeName}/{router.query.compositionName}/{router.query.kindName}/{router.query.propertyName}</p>
                </div>
                {isLoading && <div className='text-center'><Loading size="l"/></div>} 
                <div className="rowsRecipes">                    
                    {isAllRecipes&&allRecipes.length>0 &&
                        <>                      
                            {allRecipes.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }
                    {isSingleRecipes&&singleRecipes.length>0 &&
                        <>                          
                            {singleRecipes.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }                    
                    
                    {isAllComposition&&allComposition.length>0 &&
                        <>                         
                            {allComposition.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }

                    {isSingleComposition&&singleComposition.length>0 &&
                        <>                          
                            {singleComposition.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }                     
                    
                    {isAllKind&&allRecipes.length>0&&allKind.length>0 &&
                        <>                           
                            {allKind.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }

                    {isSingleKind&&singleRecipes.length>0&&singleKind.length>0 &&
                        <>                           
                            {singleKind.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }

                    {isAllKindComposition&&allKindComposition.length>0 &&
                        <>                        
                            {allKindComposition.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }

                   {isSingleCompositionKind&&singleComposition&&singleCompositionKind.length>0 &&
                        <>                        
                            {singleCompositionKind.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }
 
                   {isAllProperty&&allProperty.length>0 &&
                        <>                           
                            {allProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }
                    {isSingleProperty&&singleProperty.length>0 &&
                        <>                           
                            {singleProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }


                    {isSingleCompositionProperty&&singleCompositionProperty.length>0 &&
                        <>                           
                            {singleCompositionProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }
                    {isAllCompositionProperty&&allCompositionProperty.length>0 &&
                        <>                           
                            {allCompositionProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }                    
                    {isSingleKindProperty&&singleKindProperty.length>0 &&
                        <>                           
                            {singleKindProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }

                    {isAllKindProperty&&allKindProperty.length>0 &&
                        <>                           
                            {allKindProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }


                    {isAllCompositionKindProperty&&allCompositionKindProperty.length>0 &&
                        <>                           
                            {allCompositionKindProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }
                    {isSingleKindCompositionProperty&&singleKindCompositionProperty.length>0 &&
                        <>                           
                            {singleKindCompositionProperty.map((recipe, index) => 
                                <div className='containerRecipes' key={index}>
                                    {recipe.cook_arr!=="null" &&
                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    }
                                    {recipe.cook_arr==="null" &&
                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                    } 
                                    <div className='recipe_wrap'>
                                        <span className='recipe_title'>
                                            <span className='title'><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </span>                        
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
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
export default Filter
