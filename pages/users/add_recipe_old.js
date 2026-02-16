"use client";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { useAuth } from '../context/context';
import EmptyText from '../services/empty-text';
import HeadMetaTags from '../components/head';

const AddRecipe = () => {
    const auth = useAuth();
    const [title, setTitle] = useState("");   // название рецепта
    const [ingredients, setIngredients] = useState ("");    // список ингредиентов
    const [veg, setVeg] = useState(0);  // флаг вегетарианского блюда
    const [lent, setLent] = useState(0);  // флаг постного блюда
    const [calorie, setCalorie] = useState(0);  // флаг низкокалорийного блюда
    const [festive, setFestive] = useState(0);  // флаг праздничного блюда
    const [unusual, setUnusual] = useState(0);  // флаг необычного блюда
    const [spicy, setSpicy] = useState(0);  // флаг пикантного блюда
    const [exotic, setExotic] = useState(0);  // флаг экзотического блюда
    const [cheap, setCheap] = useState(0);  // флаг недорогого блюда    
    const [marinade, setMarinade] = useState(0);  // флаг соленья или маринада 
    const [bbq, setBbq] = useState(0);  // флаг блюда на костре
    const [cooking, setCooking] = useState ("");    // описание рецепта
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const [additionalImg, setAdditionalImg] = useState ("");    // доп фото в раздел приготовление
    const [note, setNote] = useState ("");    // краткое описание  
    const [cook, setCook] = useState([]);     // описание рецепта в виде массива  
    const [type, setType] = useState("");  // тип рецепта
    const [subType, setSubType] = useState("");  // подтип рецепта 
    const [typeRus, setTypeRus] = useState("");  // тип рецепта на русском 
    const [subTypeRus, setSubTypeRus] = useState("");  // подтип рецепта на русском 
    const [typeKitchen, setTypeKitchen] = useState("");  // тип кухни    
    const [typeKitchenRus, setTypeKitchenRus] = useState("");  // подтип кухни
    const [subTypeKitchen, setSubTypeKitchen] = useState("");  
    const [userPublicName,setUserPublicName] = useState("");  
    const [errorArr, setErrorArr] = useState (false);    
    const [errorTitle, setErrorTitle] = useState (false); 
    const [errorMainImg, setErrorMainImg] = useState (false); 
    const [errorIngredients, setErrorIngredients] = useState (false); 
    const [errorСooking, setErrorСooking] = useState (false); 
    const [errorType, setErrorType] = useState (false); 
    const [arrI, setArrI] = useState(['']);
    const [arrC, setArrC] = useState([]);
    const [arrC1, setArrC1] = useState([]);
    const [arrIngredients, setArrIngredients] = useState([]);
    const [valueTitleIngredient, setValueTitleIngredient] = useState('');
    const [addGroupButton, setAddGroupButton] = useState(false);
    const [valueCooking, setValueCooking] = useState('');   
    const [valueTitleCooking, setValueTitleCooking] = useState(''); 
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState();
    const inputFileRef = useRef(null);
    const inputFileAddRef = useRef(null);
    
    useEffect (() =>    
    {   
        auth.authorization();   
        setCurrentUser(auth.currentUser);    
        auth.auth; 
    }, [auth]); 


    useEffect (() =>    
    {   
        if (currentUser) 
        {
        async function getUserInfo() {
            const res = await fetch(`/api/account/user?email=${currentUser}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {
                setUserPublicName(data[0].public_name);
            }).catch((err) => {
                return(err);
            });
        }
        getUserInfo(); 
        }
    }, [currentUser]); 

    useEffect (( ) => {
        if (title.length>0) {            
            setTitle(EmptyText (title));
            setErrorTitle(true);
         }
        else setErrorTitle(false);
    }, [title]);


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

    useEffect (( ) => {
        if (type==="kitchen")
            {
                setTypeRus("Кухня");
                 if (subType==="rus") setSubTypeRus("Русская"); 
                 if (subType==="eur") setSubTypeRus("Европейская");   
                 if (subType==="kavk") setSubTypeRus("Кавказская"); 
                 if (subType==="turk") setSubTypeRus("Тюркская"); 
                 if (subType==="asia") setSubTypeRus("Азиатcкая"); 
                 if (subType==="pan") setSubTypeRus("Паназиатcкая"); 
                 if (subType==="ind") setSubTypeRus("Индийская"); 
                 if (subType==="amer") setSubTypeRus("Амерканская"); 
                 if (subType==="mex") setSubTypeRus("Мексиканская"); 
            }
            if (type==="main")
            {
                setTypeRus("Основные");
                 if (subType==="bouillon") setSubTypeRus("Бульоны");  
                 if (subType==="cereals") setSubTypeRus("Каши, крупы"); 
                 if (subType==="garnish") setSubTypeRus("Гарниры"); 
                 if (subType==="sauces") setSubTypeRus("Соусы"); 
                 if (subType==="base") setSubTypeRus("Основы и заготовки"); 
                 if (subType==="marinade") setSubTypeRus("Маринады и соления"); 
                 if (subType==="compote") setSubTypeRus("Компоты и варенья"); 
            }
            if (type==="soup")
            {
                setTypeRus("Супы");
                 if (subType==="meat") setSubTypeRus("Мясные"); 
                 if (subType==="fish") setSubTypeRus("Рыба, морепродукты"); 
                 if (subType==="pure") setSubTypeRus("Супы-Пюре");                       
                 if (subType==="veg") setSubTypeRus("Вегетарианские"); 
                 if (subType==="cold") setSubTypeRus("Холодные"); 
                 if (subType==="bbq") setSubTypeRus("На мангале"); 
            }
            if (type==="second")
            {
                setTypeRus("Вторые блюда");
                 if (subType==="meat") setSubTypeRus("Мясо");  
                 if (subType==="poultry") setSubTypeRus("Птица"); 
                 if (subType==="fish") setSubTypeRus("Рыба, морепродукты");                        
                 if (subType==="veg") setSubTypeRus("Вегетарианские"); 
                 if (subType==="bbq") setSubTypeRus("На мангале"); 
            }
            if (type==="salad")
            {
                setTypeRus("Салаты");
                 if (subType==="meat") setSubTypeRus("Мясные");
                 if (subType==="fish") setSubTypeRus("Рыба, морепродукты");
                 if (subType==="veg") setSubTypeRus("Вегетарианские");
                 if (subType==="warm") setSubTypeRus("Теплые");
                 if (subType==="fruit") setSubTypeRus("Фруктовые");
            }
            if (type==="pelmeni")
            {
                setTypeRus("Пельмени, манты");
                 if (subType==="meat") setSubTypeRus("С мясом");
                 if (subType==="fish") setSubTypeRus("Рыба, морепродукты");
                 if (subType==="veg") setSubTypeRus("Вегетарианские");
            }
            if (type==="snacks")
            {
                setTypeRus("Закуски");
                 if (subType==="roll") setSubTypeRus("Рулеты, роллы");
                 if (subType==="salad") setSubTypeRus("Салатные");
                 if (subType==="pickles") setSubTypeRus("Маринады, соленья");
                 if (subType==="cut") setSubTypeRus("Нарезка");
                 if (subType==="veg") setSubTypeRus("Вегетарианские");
                 if (subType==="can") setSubTypeRus("Канапе, тарталетки");
                 if (subType==="snack") setSubTypeRus("Снеки, сухарики");
            }
            if (type==="dough")
            {
                setTypeRus("Тесто и десерт");
                 if (subType==="dough") setSubTypeRus("Блюда из теста");
                 if (subType==="sweet") setSubTypeRus("Сладкие блюда из теста");
                 if (subType==="dessert") setSubTypeRus("Десертные блюда");
                 if (subType==="cream") setSubTypeRus("Крем, глазурь");
                 if (subType==="gateau") setSubTypeRus("Рецепты теста");
            }
            if (type==="drink")
            {
                setTypeRus("Напитки");
                 if (subType==="cold") setSubTypeRus("Прохладительные");
                 if (subType==="smooth") setSubTypeRus("Смузи");
                 if (subType==="cocktails") setSubTypeRus("Коктейли");
                 if (subType==="compote") setSubTypeRus("Морсы, компоты");
                 if (subType==="tea") setSubTypeRus("Чаи");
                 if (subType==="coffee") setSubTypeRus("Кофе");
                 if (subType==="alco") setSubTypeRus("Алкогольные");
            }
            if (type==="multi")
            {
                setTypeRus("Мультиварка");
                 if (subType==="soup") setSubTypeRus("Супы");
                 if (subType==="second") setSubTypeRus("Вторые блюда");
                 if (subType==="dough") setSubTypeRus("Тесто, десерт");
                 if (subType==="main") setSubTypeRus("Заготовки, основы");                                        
            } 
    }, [type, subType]) 

    useEffect (( ) => {
        if (mainImg) {            
            setErrorMainImg(true)
         }
        else setErrorMainImg(false);      
    }, [mainImg]);

    useEffect (( ) => {
        if (ingredients.length > 0) {            
            setErrorIngredients(true)
         }
        else setErrorIngredients(false);      
      }, [ingredients]);

    useEffect (( ) => {
        if (cook.length > 0) {            
            setErrorСooking(true)
         }
        else setErrorСooking(false);     
     }, [cook]);

    useEffect (( ) => {
        if (type.length > 0) {            
            setErrorType(true)
         }
        else setErrorType(false);    
    }, [type]);

    useEffect (( ) => {       
        if (errorTitle && errorMainImg && errorIngredients && errorСooking && errorType) {        
            setErrorArr (true)
         }
        else setErrorArr (false);  
    }, [errorTitle,errorMainImg, errorIngredients, errorСooking, errorType]);       
  
    const addIngredients = arrI.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={"addIngredients"+element} onDoubleClick={() => removeIngredient(index)}></span>        
        </>
    }); 

    const addCooking = arrC.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeCooking(index)}></span>        
        </>
    });

    const removeIngredient = ((index) => {
        setArrI([...arrI.slice(0, index), ...arrI.slice(index + 1)])
    });

    const removeCooking = ((index) => {
        setArrC([...arrC.slice(0, index), ...arrC.slice(index + 1)]);
        setArrC1([...arrC1.slice(0, index), ...arrC1.slice(index + 1)]);
    });

    const handleClick = (e) => {
        if (!errorTitle || !errorMainImg || !errorIngredients || !errorСooking || !errorType) {
            setErrorArr(false);
        }
        else {
            setErrorArr(true);    
            let cookingJson = JSON.stringify(cook);
            let today = new Date().toISOString().slice(0, 10)
            const recipe = {
                name: title,
                ingredients: ingredients,
                cooking: cooking,
                img_main: mainImg,
                type: subType,
                veg: veg,
                lent: lent,
                calorie: calorie,
                festive: festive,
                unusual: unusual,
                spicy: spicy,
                exotic: exotic,
                cheap: cheap,
                marinade: marinade,
                bbq: bbq,
                typeRecipe: type,
                note: note,
                review: JSON.stringify({"params": []}),
                cook: cookingJson,
                username: auth.currentUser,
                publicUserName: userPublicName,
                date: today,
                add_section: typeRus, 
                add_subsection: subTypeRus,
                typeKitchen: subTypeKitchen
            }
            try {
                fetch (`/api/account/add_recipe` , 
                {
                   method: "POST",
                   body: JSON.stringify(recipe)
                }); 
            } catch (err) {
                return(err);
            }
            router.push(`/recipes/sort?type=${type}`);
        }
    };

    useEffect(() => {
        setIngredients (arrI.join(""));
    }, [arrI]);

    useEffect(() => {
        setCooking (arrC.join(""));
        setCook(arrC1);
    }, [arrC1]);


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
                        setArrC([...arrC, `<img loading="lazy" alt="${title}" src="/upload/recipe_add_imgs/${data[0]}"/>`]);
                        setArrC1([...arrC1, {img: data[0]}]);
                    })             
                })            
                .catch((err) => {
                    //setLoadError((prev) => ({ ...prev, loaded: false }));             
                    return (err);
                });
            }
            loading();  
    }

    const addGroup = ((e) =>
    {
        setAddGroupButton(true);
        document.getElementsByClassName('mainImg')

    })
    const addGroupInput = ((e) =>
    {
        setAddGroupButton(false);        
    })
    const addIngredient = ((e) =>
    {
        //arrIngredients.push(e.target.value);    

    })

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
                    <img src="/img/41.gif" className='h-100' />
                </div>
            </div>
        }
        {(auth.auth) &&   
            <div className='addRecipes'>
                <div>
                    <img className='mainImgAva' src='/icons/icon_notebook.png' /><h1>Добавить рецепт</h1>
                    <p>Загрузить рецепт на сайт просто! Поделитесь своим любимым блюдом с родными, друзьями и другими гурманами со всего мира.</p>
                    <div className='addRecipeContent'>   
                        <div className='addRecipeHeader'>
                            <h2>Название блюда</h2>
                            <div>
                                <input type="text" name="title" placeholder="Дайте название вашему блюду" onChange={(e) => {setTitle(e.target.value)}} />                                                                 
                            </div> 
                            {(!errorTitle) && <div className='error pd-b-15'>Заполните название</div>}
                        </div>                          
                        <div className='addRecipeNote'>
                            <h2>Краткое описание или особенности</h2>     
                            <div>
                                <textarea type="text" name="title" placeholder="Опишите кратко особенности вашего блюда" onChange={(e) => setNote(e.target.value)} />                      
                            </div>
                        </div>
                        <div className='addMainImg'>                                
                            <h2>Фото рецепта</h2>
                            {!mainImg && <img className='mainImgAva pd-b-10' src="/icons/icon_avatar.png" loading="lazy" alt="food еда"/>}
                            {mainImg && <><img src={`/upload/recipe_main_img/${mainImg}`} alt={`"фото блюда ${title}"`} loading="lazy"/></>} 
                            <label htmlFor="mainImg">
                                <div className='mainImg'>
                                    <div>  
                                        <form className='uploadImage'>
                                            <input type="file" name="mainImg" id="mainImg" ref={inputFileRef} accept="image/png, image/jpeg" multiple/>
                                            <button className='buttonWhite mr-b-10'type="submit" onClick={addImg}>ДОБАВИТЬ ФОТО БЛЮДА</button>
                                        </form>                                             
                                    </div>
                                </div> 
                            </label>
                            {!errorMainImg && <div className='error mr-t-15 mr-b-15'>Загрузите основное фото рецепта</div>}
                        </div>                 
                        <div className='addIngredients'>                    
                            <h2>Ингредиенты</h2>
                            <p>Введите по одному ингредиенту в строке, указывая количество. В шаблоне будет примерно отображено как ингредиенты вашего рецепта будет отображаться на сайте. Для удаления ингредиента дважды кликните на нем в шаблоне ингредиентов.</p>                 
                            <div className='recipeText'>
                                {/* <input type="text" onChange={((e)=>addGroupInput(e))} placeholder='Например тесто' className="groupName"></input> */}
                                <button onClick={(e)=>{addGroup(e)}}>Добавить название группы</button>
                                <button onClick={(e)=>{addIngredient(e)}}>Добавить ингредиент</button>
                            </div> 
                            {!errorIngredients && <div className='error mr-t-15'>Заполните ингредиенты</div>} 

                        </div>
                        <div className='addIngredients'>                    
                            <h2>Приготовление</h2>
                            <p>Опишите как готовить ваше блюдо по шагам, добавляя имеющиеся фото к каждому шагу. В шаблоне будет примерно отображено как ваш рецепт будет отображаться на сайте. Для удаления контента дважды кликните на нем в шаблоне приготвовления.</p>                 
                            <div className='recipeText'>
                                <div id="ingredients">
                                        
                                </div>               
                            </div> 
                            {!errorСooking && <div className='error mr-t-15'>Опишите рецепт по шагам</div>}
                            <div className='addRecipeCook'>  
                                <div className='ingredientsGroup mr-t-50'>  
                                    <p className='mr-b-5'>:</p> 
                                    <input value={valueTitleCooking} onChange={event => setValueTitleCooking(event.target.value)} placeholder="Например: 1"/>
                                    <div className='buttonWhite'>
                                        <button onClick={event => {setArrC([...arrC, `<h3>Шаг ${valueTitleCooking}</h3>`]); setArrC1([...arrC1, {step: valueTitleCooking}])}}>
                                            ДОБАВИТЬ 
                                        </button>
                                    </div>
                                </div>                                     
                                <div className='ingredientsGroup mr-t-50'> 
                                    <p className='mr-b-5'>ПРИГОТОВЛЕНИЕ:</p> 
                                    <input value={valueCooking} onChange={event => {setValueCooking(event.target.value); }} placeholder="Например: Овощи почистить и мелко нарезать."/>
                                    <div className='buttonWhite'>
                                        <button onClick={event => {setArrC([...arrC, `<p>${valueCooking}</p>`]); setArrC1([...arrC1, {cook: valueCooking}])}}>
                                            ДОБАВИТЬ ПРИГОТОВЛЕНИЕ
                                        </button>
                                    </div>
                                </div> 
                            </div>
                            <div>                                
                                <p className='mr-t-50'>ФОТО БЛЮДА НА ДАННОМ ШАГЕ:</p>  
                                <div>
                                    {!additionalImg && <img className='mainImgAva pd-b-10' loading="lazy" src="/icons/icon_image.png" alt="food"/>}
                                    {additionalImg && <img src={`/upload/recipe_add_imgs/${additionalImg}`} loading="lazy" alt={`"фото блюда ${title}"`}/>}
                                </div>
                                <label htmlFor="fileAdd">
                                    <div>  
                                        <form className='uploadImage pd-b-10'>
                                            <input type="file" name="fileAdd" id="fileAdd" ref={inputFileAddRef} accept="image/png, image/jpeg" multiple/>
                                            <button className='buttonWhite'type="submit" onClick={addImgs}>ЗАГРУЗИТЬ ФОТО БЛЮДА</button>
                                        </form>                                             
                                    </div>
                                </label>                                    
                            </div>                                                                           
                            </div>
                            <div className='addCathegory'> 
                                <h2>Выбор раздела и подраздела</h2>
                                <div>
                                    {!errorType && <div className='error mr-t-15'>Выберите раздел и подраздел</div>}
                                    <div>
                                        <input type="radio" checked={type === "main"} name="cat" value="main" id="main" className="custom-checkbox" onChange={(e) =>  {setType(e.target.value); setSubType('bouillon')}}/>
                                        <label htmlFor="main">Основные блюда</label>
                                    </div>
                                    {type==="main" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="bouillon">Бульоны</option> 
                                                <option value="cereals">Крупы и каши</option> 
                                                <option value="garnish">Гарниры</option> 
                                                <option value="sauces">Соусы</option> 
                                                <option value="base">Основы и заготовки</option> 
                                                <option value="marinade">Маринады и соления</option> 
                                                <option value="compote">Компоты и варенья</option> 
                                            </select>
                                        </div>
                                        }
                                    <div>
                                        <input type="radio" checked={type === "soup"} name="cat" value="soup" id="soup" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                        <label htmlFor="soup">Супы</label>
                                    </div>
                                    {type==="soup" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="meat">Мясные</option> 
                                                <option value="fish">Рыба, морепродукты</option> 
                                                <option value="veg">Вегетарианские</option> 
                                                <option value="pure">Супы-Пюре</option> 
                                                <option value="cold">Холодные</option> 
                                                <option value="bbq">На мангале</option> 
                                            </select>
                                        </div>
                                        }
                                        <div>
                                            <input type="radio" checked={type === "second"} name="cat" value="second" id="second" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                            <label htmlFor="second">Вторые блюда</label>
                                        </div>
                                    {type==="second" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="meat">Мясо</option> 
                                                <option value="fish">Рыба, морепродукты</option> 
                                                <option value="poultry">Птица</option> 
                                                <option value="veg">Вегетарианские</option> 
                                                <option value="bbq">На мангале</option> 
                                            </select>
                                        </div>
                                        }
                                    <div>
                                        <input type="radio" checked={type === "salad"} name="cat" value="salad" id="salad" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                        <label htmlFor="salad">Салаты</label>
                                    </div>
                                    {type==="salad" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="meat">Мясные</option> 
                                                <option value="fish">Рыбные, с морепродуктами</option> 
                                                <option value="warm">Теплые</option> 
                                                <option value="fruit">Фруктовые</option> 
                                                <option value="veg">Вегетарианские</option> 
                                            </select>
                                        </div>
                                        }
                                    <div>
                                        <input type="radio" checked={type === "pelmeni"} name="cat" value="pelmeni" id="pelmeni" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('meat')}}/>
                                        <label htmlFor="pelmeni">Пельмени и манты</label>
                                    </div>
                                    {type==="pelmeni" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="meat">С мясом</option> 
                                                <option value="fish">Рыба, морепродукты</option> 
                                                <option value="veg">Вегетарианские</option> 
                                            </select>
                                        </div>
                                    }
                                    <div>
                                        <input type="radio" checked={type === "snacks"} name="cat" value="snacks" id="snacks" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('roll')}}/>
                                        <label htmlFor="snacks">Закуски</label>
                                    </div>
                                    {type==="snacks" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="roll">Рулеты, роллы, рулетики</option> 
                                                <option value="salad">Салатные</option> 
                                                <option value="pickles">Маринады, соленья</option> 
                                                <option value="veg">Вегетарианские</option> 
                                                <option value="cut">Нарезка</option> 
                                                <option value="snack">Снеки, сухарики</option> 
                                                <option value="can">Канапе, тарталетки</option> 
                                            </select>
                                        </div>
                                    }
                                    <div>
                                        <input type="radio" checked={type === "dough"} name="cat" value="dough" id="dough" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('dough')}}/>
                                        <label htmlFor="dough">Тесто, десерт</label>
                                    </div>
                                    {type==="dough" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="dough">Блюда из теста</option>  
                                                <option value="sweet">Сладкая выпечка</option>
                                                <option value="dessert">Десертные блюда</option>     
                                                <option value="cream">Крем, глазурь</option> 
                                                <option value="gateau">Рецепты теста</option>                                                                                    
                                            </select>
                                        </div>
                                    }
                                    <div>
                                        <input type="radio" checked={type === "drink"} name="cat" value="drink" id="drink" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('tea')}}/>
                                        <label htmlFor="drink">Напитки</label>
                                    </div>
                                    {type==="drink" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="tea">Чай</option> 
                                                <option value="cof">Кофе</option> 
                                                <option value="cold">Прохладительные</option> 
                                                <option value="compote">Морсы, компоты, кисели</option> 
                                                <option value="smooth">Смузи, коктейли</option> 
                                                <option value="alco">Алкогольные</option> 
                                            </select>
                                        </div>
                                    }
                                    <div>
                                        <input type="radio" checked={type === "multi"} name="cat" value="multi" id="multi" className="custom-checkbox" onChange={(e) => {setType(e.target.value); setSubType('soup')}}/>
                                        <label htmlFor="multi">Мультиварка</label>
                                    </div>
                                    {type==="multi" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubType(e.target.value)}> 
                                                <option value="soup">Супы</option> 
                                                <option value="second">Вторые</option> 
                                                <option value="dough">Тесто, десерт</option> 
                                                <option value="main">Основы, заготовки</option> 
                                            </select>
                                        </div>
                                    }
                                    <div className='addCathegoryBorder'> 
                                    <h2>Дополнительные параметры</h2>
                                    <div className='addCathegoryBlock'> 
                                        <div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setVeg(1); else setVeg(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Вегетарианское</p>
                                            </div>                                    
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setLent(1); else setLent(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Постное</p>
                                            </div>                                     
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setCalorie(1); else setCalorie(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Низкокалорийное</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setCheap(1); else setCheap(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Не дорогое</p>
                                            </div> 
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setMarinade(1); else setCheap(0)}} />
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
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setFestive(1); else setFestive(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Праздничное</p>
                                            </div>                              
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setUnusual(1); else setUnusual(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Необычное</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setSpicy(1); else setSpicy(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Пикантное</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setExotic(1); else setExotic(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Экзотическое</p>
                                            </div>
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setBbq(1); else setFestive(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>На мангале</p>
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="pd-t-40">
                                        <input type="radio" checked={typeKitchen === "kitchenType"} name="kitchenType" value="kitchenType" id="kitchenType" className="custom-checkbox" onChange={(e) => {setTypeKitchen(e.target.value); setSubTypeKitchen('rus')}}/>
                                        <label htmlFor="kitchenType">Тип Кухни</label>                        
                                    </div>  
                                    {typeKitchen==="kitchenType" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubTypeKitchen(e.target.value)}> 
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
                                    </div> 
                                    <div className='error pd-t-40'>{!errorArr && <>Заполните пожалуйста необходимые поля</>}</div>
                                    <div className='buttonRightWrap'>
                                        <button className='buttonTransparent'><span><a href="/">ОТМЕНИТЬ</a></span></button>
                                        {errorArr &&<button className='buttonOrange' onClick={handleClick}>Сохранить Рецепт</button>}
                                    </div>
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

export default AddRecipe
