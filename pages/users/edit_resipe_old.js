"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react';
import DOMPurify from "dompurify";
import { useAuth } from '../context/context';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HeadMetaTags from '../components/head';

const EditRecipe = () => {
    const auth = useAuth();
    const router = useRouter();
    const [recipe, setRecipe] = useState([]);
    const type = useSearchParams().get('cat');
    const id = useSearchParams().get('id');
    const [title, setTitle] = useState("");   // название рецепта
    const [ingredients, setIngredients] = useState ("");    // список ингредиентов
    const [veg, setVeg] = useState(false);  // флаг вегетарианского блюда
    const [lent, setLent] = useState(0);  // флаг постного блюда
    const [calorie, setCalorie] = useState(0);  // флаг низкокалорийного блюда
    const [festive, setFestive] = useState(0);  // флаг праздничного блюда
    const [unusual, setUnusual] = useState(0);  // флаг необычного блюда
    const [spicy, setSpicy] = useState(0);  // флаг пикантного блюда
    const [exotic, setExotic] = useState(0);  // флаг экзотического блюда
    const [cheap, setCheap] = useState(0);  // флаг недорогого блюда
    const [marinade, setMarinade] = useState(0);  // флаг соленья или маринада 
    const [bbq, setBbq] = useState(0);  // флаг блюда на костре
    const [typeKitchen, setTypeKitchen] = useState("");  // тип кухни    
    const [typeKitchenRus, setTypeKitchenRus] = useState("");  // подтип кухни
    const [subTypeKitchen, setSubTypeKitchen] = useState("");  
    const [cooking, setCooking] = useState ();    // описание рецепта
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const [additionalImg, setAdditionalImg] = useState ("");    // доп фото в раздел приготовление
    const [note, setNote] = useState ("");    // основное фото
    const [cook, setCook] = useState();      // описание рецепта в виде массива
    const [changeIngredients, setChangeIngredients] = useState (false);   
    const [changeCooking, setChangeCooking] = useState (false);  
    const [valueIngredient, setValueIngredient] = useState('');
    const [valueTitleIngredient, setValueTitleIngredient] = useState('');
    const [valueCooking, setValueCooking] = useState('');   
    const [valueTitleCooking, setValueTitleCooking] = useState(''); 
    const [arrI, setArrI] = useState([]);
    const [arrC, setArrC] = useState([]);
    const [arrC1, setArrC1] = useState([]);
    const [user, setUser] = useState(null);
    const inputFileRef = useRef(null);
    const inputFileAddRef = useRef(null);
             
    useEffect (() =>    
        {   
            auth.authorization();   
            setUser(auth.currentUser);
            auth.auth; 
    }, [auth]); 
        
    useEffect(() => {
        setIngredients (arrI.join(""));
    }, [arrI]);

    useEffect(() => {
        setCooking (arrC.join(""));
        setCook(JSON.stringify(arrC1));
    }, [arrC1]);
       
    const addIngredients = arrI.map((element, index) => {     
        return <div key={index}>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}}  onDoubleClick={() => removeIngredient(index)}></span>        
        </div>
    });
    
    const addCooking = arrC.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeCooking(index)}></span>        
        </>
    });
         
    const removeIngredient = ((index) => {
        setArrI([...arrI.slice(0, index), ...arrI.slice(index + 1)]);
    });
        
    const removeCooking = ((index) => {
        setArrC([...arrC.slice(0, index), ...arrC.slice(index + 1)]);
        setArrC1([...arrC1.slice(0, index), ...arrC1.slice(index + 1)])
    });

    let editRecipe = {
        id: "",
        name: "",
        ingredients: "",
        cooking: "",
        img_main: "",
        veg: "",
        note: "",
        type: "",  
        cook: "",     
        typeKitchen: ""          
    }
    const handleClick = async (e) => {
       editRecipe = {
            id: id,
            name: title,
            ingredients: ingredients,
            cooking: cooking,
            img_main: mainImg,
            veg: veg,
            note: note,
            type: type,  
            cook: cook,   
            lent:  lent,
            calorie: calorie,
            festive: festive,
            unusual: unusual,
            spicy: spicy,
            exotic: exotic,
            cheap: cheap, 
            marinade: marinade,
            bbq: bbq,    
            typeKitchen: subTypeKitchen       
        }         
        try {
            await fetch (`/api/account/edit_recipe?type=${type}&id=${id}` , 
            {
                method: "POST",
                body: JSON.stringify(editRecipe)
            }); 
        } 
        catch (err) {
            return (err);
        }
        router.push(`/recipes/sort?type=${type}`);
    };

    useEffect (() => {
        async function getRecipe() {
            const res = await fetch(`/api/cooking/recipe?type=${type}&id=${id}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {
                setRecipe(data[0]);
                setTitle(data[0].name);
                setIngredients(data[0].ingredients);
                setCooking(data[0].cooking);
                setMainImg(data[0].img_main);
                setVeg(data[0].veg);
                setNote(data[0].note);
                setCook(data[0].cook);    
                setLent(data[0].lent); 
                setCalorie(data[0].calorie);
                setFestive(data[0].festive); 
                setUnusual(data[0].unusual);
                setSpicy(data[0].spicy);  
                setExotic(data[0].exotic); 
                setCheap(data[0].cheap);  
                setMarinade(data[0].marinade);      
                setBbq(data[0].bbq);  
                setSubTypeKitchen(data[0].kitchen);         
                editRecipe = {
                    id: id,
                    name: data[0].name,
                    ingredients: data[0].ingredients,
                    cooking: data[0].cooking,
                    img_main: data[0].img_main,
                    veg: data[0].veg,
                    lent:  data[0].lent,
                    calorie:  data[0].calorie,
                    festive:  data[0].festive,
                    unusual:  data[0].unusual,
                    spicy:  data[0].spicy,
                    exotic:  data[0].exotic,
                    cheap:  data[0].cheap,
                    marinade:  data[0].marinade,
                    bbq:  data[0].bbq,
                    note: data[0].note,
                    type: type,  
                    cook: cook,     
                    kitchen: data[0].kitchen          
                } 
            }).catch((err) => {
                return(err);
            });
          }
          getRecipe();          
    }, [id]);


    const addImg = async (e) => {
        e.preventDefault();
        const formData = new FormData();        
        Object.values(inputFileRef.current.files).forEach(file => {
            formData.append('file', file);
        });		
		document.getElementById('mainImg').addEventListener('change', function() {
            const fileImg = this.files[0];
            if (fileImg && !fileImg.type.match('image.*')) {
            }
        });    
        async function loading() {
            await fetch(`/api/upload?folder=recipe_main_img`, {
                method: 'POST',
                body: formData
            }) 
            .then (response => {               
                if (response.status===200)
                {            
                };  
                response.json().then((data) => {
                    setMainImg(data[0]);
                })             
            })            
            .catch((err) => {        
                return (err);
            });
        }
        loading();   
    }

    useEffect (( ) => {
        if (typeKitchen==="kitchenType")
        {
            setTypeKitchenRus("");
             if (subTypeKitchen==="rus") setTypeKitchenRus("Русская"); 
             if (subTypeKitchen==="eur") setTypeKitchenRus("Европейская");   
             if (subTypeKitchen==="kavk") setTypeKitchenRus("Кавказская"); 
             if (subTypeKitchen==="turk") setTypeKitchenRus("Тюркская"); 
             if (subTypeKitchen==="asia") setTypeKitchenRus("Азиатcкая"); 
             if (subTypeKitchen==="pan") setTypeKitchenRus("Паназиатcкая"); 
             if (subTypeKitchen==="ind") setTypeKitchenRus("Индийская"); 
             if (subTypeKitchen==="amer") setTypeKitchenRus("Амерканская"); 
             if (subTypeKitchen==="mex") setTypeKitchenRus("Мексиканская"); 
        }

}, [typeKitchen, subTypeKitchen]) 

    const addImgs = async (e) => {        
        e.preventDefault();
        const formData = new FormData();        
        Object.values(inputFileAddRef.current.files).forEach(file => {
            formData.append('file', file);
        });		
		document.getElementById('fileAdd').addEventListener('change', function() {
            const fileImg = this.files[0];
            if (fileImg && !fileImg.type.match('image.*')) {
            }
        });  
        async function loading() {
            await fetch(`/api/upload?folder=recipe_add_imgs`, {
                method: 'POST',
                body: formData
            }) 
            .then (response => {               
                if (response.status===200)
                {
                    // setModal(true);               
                };  
                    response.json().then((data) => {
                        setAdditionalImg(data[0]);  
                                              
                        setArrC([...arrC, `<img loading="lazy" alt="${title}" src="/upload/recipe_add_imgs/${data[0]}"/>`])
                        setArrC1([...arrC1, {img: data[0]}])
                    })             
                })            
                .catch((err) => {
                    //setLoadError((prev) => ({ ...prev, loaded: false }));             
                    return (err);
                });
            }
            loading();  
    }
  return (
    <div>  
        <HeadMetaTags
            content="noindex" 
        />    
        <Navbar/>  
        <div>
            {(!auth.auth)  && 
                <div className='text-center pd-t-20'>
                    <h1>Доступ запрещен</h1>
                    <div className='registrationLink'>
                        <p>Для добавления рецепта требуется <a href="/auth/login" alt="авторизация Vseresepty.ru">авторизация</a></p>
                    </div>
                </div>
            }
            {auth.auth&&recipe &&   
            <div>  
                <div className='contentRecipe'>  
                    <div className='addRecipes'>                
                        <div>
                            <img className='mainImgAva' src='/icons/icon_change.png' /><h1 className='pd-l-20'>Редактировать рецепт</h1>
                            <p>Измените или дополните рецепт, сохраните когда внесете необходимые изменения.</p>  
                            <div className='addRecipeHeader'>
                                <h2>Название блюда</h2>
                                <input type="text" name="title" placeholder={recipe?.name} onChange={(e) => setTitle(e.target.value)} />                                
                            </div>
                            <div className='addRecipeNote'>
                                <h2>Краткое описание или особенности</h2>     
                                <textarea type="text" name="title" placeholder={recipe.note} onChange={(e) => setNote(e.target.value)} />                      
                            </div>
                                <div className='addMainImg'>                                
                                    <h2>Фото рецепта</h2>   
                                    {(!recipe.img_main && !mainImg) && <img className='mainImgAva' src="/icons/icon_image.png" alt={recipe.name}/>}
                                    {(recipe.img_main && !mainImg) && <img src={`/upload/recipe_main_img/${recipe.img_main}`} alt={recipe.name}/>}
                                    {mainImg && <><img src={`/upload/recipe_main_img/${mainImg}`} alt={recipe?.name}/></>}                                                         
                                    <label htmlFor="mainImg">
                                        <div className='mainImg'>
                                            <div>  
                                                <form className='uploadImage pd-b-10'>
                                                    <input type="file" name="mainImg" id="mainImg" ref={inputFileRef} accept="image/png, image/jpeg" multiple/>
                                                    <button className='buttonWhite'type="submit" onClick={addImg}>ДОБАВИТЬ ФОТО БЛЮДА</button>
                                                </form>                                             
                                            </div>
                                        </div> 
                                    </label>                    
                                </div>                     
                                <div className='addIngredients'>                    
                                    <h2>Ингредиенты</h2>
                                    {!changeIngredients && <>
                                        <div className='ingredientsList'>
                                            {recipe.ingredients && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.ingredients)}}></div>}
                                        </div>
                                        <div className='buttonWhite' >
                                            <button className='mr-t-20 mr-b-15' onClick={() => setChangeIngredients(true)}>
                                                ИЗМЕНИТЬ ИНГРЕДИЕНТЫ
                                            </button>
                                        </div>
                                    </>
                                    }
                                    {changeIngredients && 
                                    <>
                                        <p>Введите по одному ингредиенту в строке, указывая количество. Для удаления или редактирования ингредиента дважды кликните на нем.</p>                                             
                                        <div className='recipeText' >
                                            {addIngredients}                    
                                        </div> 
                                        <div className='addRecipeIngredients'>  
                                            <div className='ingredientsGroup'>
                                                <div className='buttonWhite ingredientsGroupP'>    
                                                    <p className='mr-b-5 mr-t-30'>ГРУППА:</p>
                                                    <input className='mr-b-15' value={valueTitleIngredient} onChange={event => setValueTitleIngredient(event.target.value)} placeholder="Например: Тесто"/>
                                                    <button onClick={event => {setArrI([...arrI, `<h3>${valueTitleIngredient}</h3>`])}}>ДОБАВИТЬ ГРУППУ</button>
                                                </div> 
                                            </div>
                                            <div className='ingredientsGroup ingredientsGroupP'>
                                                <div className='buttonWhite mr-b-20'> 
                                                    <p className='mr-b-5 mr-t-30'>ИНГРЕДИЕНТ:</p>
                                                    <input className='mr-b-15' value={valueIngredient} onChange={event => setValueIngredient(event.target.value)} placeholder="Например: 200 мл воды"/>
                                                    <button className='mr-b-15' onClick={event => {setArrI([...arrI, `<li>${valueIngredient}</li>`]); setArrC1([...arrC1, {cook: valueCooking}])}}>ДОБАВИТЬ ИНГРЕДИЕНТ</button>
                                                </div> 
                                            </div>
                                        </div> 
                                    </>
                                    }
                            </div>
                            <div className='addIngredients pd-b-15'>                     
                                <h2 >Приготовление</h2>
                                {!changeCooking && 
                                <div id="recipe" className='buttonWhite ingredientsList'>
                                    {recipe.cooking && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.cooking)}}></div>}
                                    <button className='mr-t-20' onClick={() => setChangeCooking(true)}>ИЗМЕНИТЬ ПРИГОТОВЛЕНИЕ</button>
                                </div> 
                                }
                                {changeCooking && <>
                                    <p>Опишите как готовить ваше блюдо по шагам, добавляя имеющиеся фото к каждому шагу. Для удаления контента дважды кликните на нем в шаблоне. В шаблоне будет примерно отображено как ваш рецепт будет отображаться на сайте.</p>                 
                                    <div className='recipeText'>
                                        <div>
                                            {addCooking}  
                                        </div>                                            
                                    </div> 
                                    <div className='addRecipeCooking'>  
                                        <div className='ingredientsGroup'>
                                            <div>  
                                                <p className='mr-b-5'>НОМЕР ШАГА:</p>  
                                                <input className='mr-b-15' value={valueTitleCooking} onChange={event => setValueTitleCooking(event.target.value)} placeholder="Например: 1"/>
                                                <div className='buttonWhite'>
                                                    <button onClick={event => {setArrC([...arrC, `<h3>Шаг ${valueTitleCooking}</h3>`]); setArrC1([...arrC1, {step: valueTitleCooking}])}}>ДОБАВИТЬ НОМЕР ШАГА</button>
                                                </div>
                                            </div> 
                                        </div>
                                        <div> 
                                            <div className='ingredientsGroup'>
                                                <p className='mr-t-50 mr-b-5'>ПРИГОТОВЛЕНИЕ:</p>  
                                                <input className='mr-b-15' value={valueCooking} onChange={event => setValueCooking(event.target.value)} placeholder="Например: Овощи почистить и мелко нарезать."/>
                                                <div className='buttonWhite'>
                                                    <button onClick={event => {setArrC([...arrC, `<p>${valueCooking}</p>`]); setArrC1([...arrC1, {cook: valueCooking}])}}>ДОБАВИТЬ ПРИГОТОВЛЕНИЕ</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </div> 
                                    <div>
                                        <p className='mr-t-50'>ФОТО БЛЮДА НА ДАННОМ ШАГЕ:</p>                                                                                           
                                            <label htmlFor="fileAdd"> 
                                                <div className='mainImg'>
                                                    {!additionalImg && <div className='addImg'><img src="/icons/icon_image.png" alt="food"/></div>}
                                                    {additionalImg && <img src={`/upload/recipe_add_imgs/${additionalImg}`} alt={recipe?.name}/>}
                                                    <label htmlFor="fileAdd">
                                                        <div>  
                                                            <form className='uploadImage'>
                                                                <input type="file" name="fileAdd" id="fileAdd" ref={inputFileAddRef} accept="image/png, image/jpeg" multiple/>
                                                                <button className='buttonWhite'type="submit" onClick={addImgs}>ЗАГРУЗИТЬ ФОТО БЛЮДА</button>
                                                            </form>                                             
                                                        </div>
                                                    </label>                                                  
                                                </div> 
                                            </label>   
                                        </div>
                                    </>
                                    }
                                </div>

                                <div className='addCathegory'> 
                                    <h2>Дополнительные параметры</h2>
                                    <div className='addCathegoryBlock'> 
                                        <div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                <label className="switch">
                                                    {veg===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setVeg(1); else setVeg(0)}} />}
                                                    {veg!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setVeg(1); else setVeg(0)}} />}
                                                    <span className="slider round"></span>
                                                </label>
                                                </div>
                                                <p>Вегетарианское</p>
                                            </div>                                    
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {lent===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setLent(1); else setLent(0)}} />}
                                                        {lent!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setLent(1); else setLent(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Постное</p>
                                            </div>                                     
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {calorie===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setCalorie(1); else setCalorie(0)}} />}
                                                        {calorie!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setCalorie(1); else setCalorie(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Низкокалорийное</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {cheap===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setCheap(1); else setCheap(0)}} />}
                                                        {cheap!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setCheap(1); else setCheap(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Не дорогое</p>
                                            </div> 
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {marinade===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setMarinade(1); else setMarinade(0)}} />}
                                                        {marinade!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setMarinade(1); else setMarinade(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Соленье, маринад</p>
                                            </div> 
                                        </div>

                                        <div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {festive===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setFestive(1); else setFestive(0)}} />}
                                                        {festive!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setFestive(1); else setFestive(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Праздничное</p>
                                            </div>                              
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {unusual===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setUnusual(1); else setUnusual(0)}} />}
                                                        {unusual!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setUnusual(1); else setUnusual(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Необычное</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {spicy===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setSpicy(1); else setSpicy(0)}} />}
                                                        {spicy!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setSpicy(1); else setSpicy(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Пикантное</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {exotic===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setExotic(1); else setExotic(0)}} />}
                                                        {exotic!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setExotic(1); else setExotic(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Экзотическое</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {bbq===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setBbq(1); else setBbq(0)}} />}
                                                        {bbq!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setBbq(1); else setBbq(0)}} />}
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>На мангале</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> 

                                <div className="pd-t-40">
                                        <input type="radio" checked={typeKitchen === "kitchenType"} name="kitchenType" value="kitchenType" id="kitchenType" className="custom-checkbox" onChange={(e) => {setTypeKitchen(e.target.value)}}/>
                                        <label htmlFor="kitchenType">Тип Кухни</label>                        
                                    </div>  
                                    {typeKitchen==="kitchenType" && 
                                        <div className='selectRecipe'>
                                            <select id="select" defaultValue="" onChange={(e) => setSubTypeKitchen(e.target.value)}> 
                                                <option value="">Любая</option>
                                                <option value="rus">Русская</option> 
                                                <option value="eur">Европейская</option> 
                                                <option value="kavk">Кавказская</option> 
                                                <option value="turk">Тюркская</option> 
                                                <option value="asia">Азиатская</option> 
                                                <option value="pan">Паназиатcкая</option> 
                                                <option value="ind">Индийская</option> 
                                                <option value="amer">Американская</option> 
                                                <option value="mex">Мексиканская</option> 
                                            </select>
                                        </div>
                                        }
                                <div className='buttonRightWrap'>
                                    <button className='buttonTransparent'><span><a href={`/recipes/sort?type=${type}`}>ОТМЕНИТЬ</a></span></button>
                                    <button className='buttonOrange' onClick={handleClick}>Сохранить Рецепт</button>
                                </div>                            
                        </div>              
                    </div>
                </div>
            </div>
            }
        </div>
        <Footer/>
    </div>
  )
}

export default EditRecipe