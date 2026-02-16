"use client";
import { useRouter } from 'next/router';
import { createContext, useState, useContext, useEffect } from "react";

const AllRecipesContext = createContext();

const AllRecipesProvider = ({ children }) => {
    const router = useRouter();
    const [allRecipesArray, setAllRecipesArray] = useState([]);
    const [searchMain, setSearchMain] = useState([]);
    const [searchSoup, setSearchSoup] = useState([]);
    const [searchSecond, setSearchSecond] = useState([]);
    const [searchSalad, setSearchSalad] = useState([]);
    const [searchPelmeni, setSearchPelmeni] = useState([]);
    const [searchSnacks, setSearchSnacks] = useState([]);
    const [searchDough, setSearchDough] = useState([]);
    const [searchDrink, setSearchDrink] = useState([]);
    const [searchMulti, setSearchMulti] = useState([]);
    const [isMain, setIsMain] = useState(false);
    const [isSoup, setIsSoup] = useState(false);
    const [isSecond, setIsSecond] = useState(false);
    const [isSalad, setIsSalad] = useState(false);
    const [isPelmeni, setIsPelmeni] = useState(false);
    const [isSnacks, setIsSnacks] = useState(false);
    const [isDough, setIsDough] = useState(false);
    const [isDrink, setIsDrink] = useState(false); 
    const [isMulti, setIsMulti] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect (() =>
    {      
        setIsMain(false);
        setIsLoading (false); 
        setIsSoup (false);
        setIsSecond (false);
        setIsSalad (false);
        setIsPelmeni (false);
        setIsSnacks (false);
        setIsDough (false);
        setIsDrink (false);
        setIsMulti (false);
        setIsLoading (false);
                       
        async function getMain() {
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
            const res = await fetch(`/api/cooking/recipes?type=dough`, {
                method: "GET",
            })                 
            return res.json().then((data) => {
                if (res.status===200)                      
                {
                    setIsDough(true);
                    setSearchDough(data); 
                }  
                
            }
            ).catch((err) => {
                return(err);
            });
        };
        getDough();
        async function getDrink() {
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
    }, [router])
    
    useEffect(() => {  
        const array = [];
        if (isMain && isSoup && isSecond && isSalad && isPelmeni && isSnacks && isDough && isDrink && isMulti)
        {        
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
            const arr = ShuffleArray(array);
            setAllRecipesArray (arr);            
            setIsLoading (true); 
        }
    }
    , [isMain, isSoup, isSecond, isSalad, isPelmeni, isSnacks, isDough, isDrink, isMulti]);

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

    // allRecipesArray.map((recipe, index) => {
    //     console.log ("recipe", recipe.img_main)
    // }) 

             
  return (
    <AllRecipesContext.Provider value={{ allRecipesArray, isLoading }}>
      {children}
    </AllRecipesContext.Provider>
  );

};

export default AllRecipesProvider;

export const useRecipesArray = () => {
  return useContext(AllRecipesContext);
};

