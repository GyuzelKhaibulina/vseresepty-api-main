"use client";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useRef, useState} from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Head from 'next/head';
import { useAuth } from '../context/context';
import EmptyText from '../services/empty-text';
import { useRouter } from 'next/router';
import AddImage from '../services/cropper/add-image';
import BackButton from '../components/button_back';
import HeadMetaTags from '../components/head';


const AddRecipe = () => {
    const auth = useAuth();
    const router = useRouter();  
    const [title, setTitle] = useState();   // название рецепта
    const [ingredients, setIngredients] = useState ();    // список ингредиентов
    const [proteins, setProteins] = useState(0);  // белки
    const [fats, setFats] = useState(0);  // жиры
    const [carbohydrates, setCarbohydrates] = useState(0);  // углеводы
    const [calories, setCalories] = useState(0);  // калории
    const [hours, setHours] = useState(0);  // приготовление в часах
    const [minutes, setMinutes] = useState(0);  // приготовление в минутах
    const [veg, setVeg] = useState(0);  // флаг вегетарианского блюда
    const [lent, setLent] = useState(0);  // флаг постного блюда
    const [calorie, setCalorie] = useState(0);  // флаг низкокалорийного блюда
    const [festive, setFestive] = useState(0);  // флаг праздничного блюда
    const [unusual, setUnusual] = useState(0);  // флаг необычного блюда
    const [spicy, setSpicy] = useState(0);  // флаг пикантного блюда
    const [exotic, setExotic] = useState(0);  // флаг экзотического блюда
    const [cheap, setCheap] = useState(0);  // флаг недорогого блюда    
    const [marinade, setMarinade] = useState(0);  // флаг соленья или маринада 
    const [gluten, setGluten] = useState(0);  // флаг безглютенового 
    const [bbq, setBbq] = useState(0);  // флаг блюда на костре
    const [lactose, setLactose] = useState(0);  // флаг безлактозного
    const [cooking, setCooking] = useState ("");    // описание рецепта
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const [note, setNote] = useState ("");    // краткое описание  
    const [type, setType] = useState("");  // тип рецепта
    const [subType, setSubType] = useState("");  // подтип рецепта 
    const [typeRus, setTypeRus] = useState("");  // тип рецепта на русском 
    const [subTypeRus, setSubTypeRus] = useState("");  // подтип рецепта на русском 
    const [typeKitchen, setTypeKitchen] = useState("");  // тип кухни    
    const [typeKitchenRus, setTypeKitchenRus] = useState("");  // подтип кухни
    const [typeComplexity, setTypeComplexity] = useState(-1);  // тип сложности
    const [subTypeComplexity, setSubTypeComplexity] = useState(0);  // подтип сложности
    const [typePrice, setTypePrice] = useState(-1);  // цена блюда
    const [subTypePrice, setSubTypePrice] = useState(0);  // подтип цены
    const [subTypeKitchen, setSubTypeKitchen] = useState("");  
    const [userPublicName,setUserPublicName] = useState("");  
    const [errorArr, setErrorArr] = useState (false);    
    const [errorMainImg, setErrorMainImg] = useState (false); 
    const [errorCookImg, setErrorCookImg] = useState (false); 
    const [errorIngredients, setErrorIngredients] = useState (false); 
    const [errorCook, setErrorCook] = useState (true); 
    const [errorCookBlock, setErrorCookBlock] = useState (true); 
    const [errorGroupIngredient, setErrorGroupIngredient] = useState (false); 
    const [errorСooking, setErrorСooking] = useState (false); 
    const [errorType, setErrorType] = useState (false); 
    const [errorIngredientValue, setErrorIngredientValue] = useState (false); 
    const [errorIngredient, setErrorIngredient] = useState (false); 
    const [errorGroup, setErrorGroup] = useState (false); 
    const [errorStep, setErrorStep] = useState (false); 
    const [errorCooking, setErrorCooking] = useState (false); 
    const [errorCookValue, setErrorCookValue] = useState (false); 
    const [errorStepValue, setErrorStepValue] = useState (false); 
    const [arrI, setArrI] = useState([]);
    const [arrC, setArrC] = useState([]);
    const [arrC1, setArrC1] = useState([]);
    const [valueIngredient, setValueIngredient] = useState();
    const [valueTitleIngredient, setValueTitleIngredient] = useState();
    const [valueCooking, setValueCooking] = useState();   
    const [valueTitleCooking, setValueTitleCooking] = useState(); 
    const [currentUser, setCurrentUser] = useState();
    const [groupIngredDivCollection, setGroupIngredDivCollection] = useState();
    const [groupIngredHCollection, setGroupIngredHCollection] = useState();
    const [groupIngredInputCollection, setGroupIngredInputCollection] = useState();
    const [groupIngredBtnCollection, setGroupIngredBtnCollection] = useState();
    const [ingredGroupAddCollection, setIngredGroupAddCollection] = useState();
    const [ingredientsCollection, setIngredientsCollection] = useState();
    const [mainImage, setMainImage] = useState([]);   
    const [ingredDivCollection, setIngredDivCollection] = useState();
    const [ingredHCollection, setIngredHCollection] = useState();
    const [ingredAddCollection, setIngredAddCollection] = useState();
    const [ingredInputCollection, setIngredInputCollection] = useState();
    const [ingredientsWrap, setIngredientsWrap] = useState();
    const [ingredientValues, setIngredientValues] = useState();
    const [cookStepDivCollection, setCookStepDivCollection] = useState();
    const [cookStepHCollection, setCookStepHCollection] = useState();
    const [cookStepInputCollection, setCookStepInputCollection] = useState();
    const [cookCollection, setCookCollection] = useState();        
    const [cookHCollection, setCookHCollection] = useState();
    const [cookInputCollection, setCookInputCollection] = useState();
    const [linkText, setLinkText] = useState("");
    const [linkCollection, setLinkCollection] = useState([]);
    const [linkLiCollection, setLinkLiCollection] = useState([]);
    const [links, setLinks] = useState([]);
    const [linkACollection, setLinkACollection] = useState([]);
    const [linkBtnCollection, setLinkBtnCollection] = useState([]);
    const [linkAdd, setLinkAdd] = useState(false);
    const [link, setLink] = useState("");
    const [cookWrap, setCookWrap] = useState();
    const [cookValues, setCookValues] = useState();
    const [errorMainTitle, setErrorMainTitle] = useState (true); 
    const [errorTitle, setErrorTitle] = useState (true); 
    const [errorTitleLength, setErrorTitleLength] = useState(false);   // длина названия
    const [errorRequest, setErrorRequest ] = useState(false);
    const titleRef = useRef();
    const pictureRef = useRef();
    const ingredientsRef = useRef();
    const cookRef = useRef();
    const typeRef = useRef();
    const [errorTime, setErrorTime] = useState({
        hourNumber : true,
        minuteNumber : true,
        hourLength : true,
        minuteLength : true,
    });


    const refTitle = () => {
        titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const refPicture = () => {
        pictureRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const refIngredients = () => {
        ingredientsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const refCook = () => {
        cookRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const refType = () => {
        typeRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
   
    useEffect (() =>    
    {   
        auth.authorization();   
        setCurrentUser(auth.currentUser);    
        auth.auth; 
    }, [auth]); 

    // запрос для получения публичного имени автора рецепта
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
    }, [currentUser, mainImage]); 

    const clickMainImg = () => {  
        setErrorMainImg (true);
        setMainImg (document.getElementById("mainImage").src);
    }

    const clickCookImg = () => {  
        //не удалять! обязательный атрибут для cropper
    }

    const saveCookImg = () => {    
        setErrorCookImg (false);
        const cookImage = document.getElementById ("cookImage");
        if (cookImage&&cookImage.src)
        {
        if (cookImage.src==='/icons/icon_image.png'||cookImage.src===`${process.env.URL}/icons/icon_image.png`)
        {
            setErrorCookImg (false);
        }
        else {
            setErrorCookImg (true);
            setArrC([...arrC, `<img src=${cookImage.src} class="cookCollection" />`])
        }
    }
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

    // отслеживание отсутствия ингредиентов
    useEffect (( ) => {         
        if (ingredients?.length > 0) {            
            setErrorIngredients(true);            
         }
        else { 
            setErrorIngredients(false);    
        }      
    }, [ingredients]);

    // отслеживание отсутствия приготовления
    useEffect (( ) => { 
        if (arrC.length>0) {            
            setErrorСooking(true)
         }
        else setErrorСooking(false);     
    }, [arrC]);

    // отслеживание ошибки не выбран раздел и подраздел
    useEffect (( ) => {
        if (type.length > 0) {            
            setErrorType(true)
         }
        else setErrorType(false);    
    }, [type]);

    // отслеживание всех ошибок для показа основной кнопки отправить
    
    useEffect (( ) => {       
        if (errorMainTitle && errorMainImg && errorIngredients && errorСooking && errorType && errorTime.minuteLength && errorTime.hourLength) {        
            setErrorArr (true)
        }
        else setErrorArr (false);  
    }, [errorMainTitle, errorMainImg, errorIngredients, errorСooking, errorType, errorTime]);         
 
    // массив ингредиенты для динамического отображения с возможностью удаления
    const addIngredients = arrI.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={"addIngredients"+index} onDoubleClick={() => removeIngredient(index)}></span>        
        </>
    }); 

    // массив приготовления для динамического отображения с возможностью удаления
    const addCooking = arrC.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeCooking(index)}></span>        
        </>
    });

    // удаление ингредиента
    const removeIngredient = ((index) => {
        setArrI([...arrI.slice(0, index), ...arrI.slice(index + 1)])
    });

    // удаление приготовления
    const removeCooking = ((index) => {
        setArrC([...arrC.slice(0, index), ...arrC.slice(index + 1)]);
        setArrC1([...arrC1.slice(0, index), ...arrC1.slice(index + 1)]);
    });

    // динамическое извлечение html коллекций в блоке шагов и приготовлений
    useEffect(() => {
            setCookStepDivCollection(document.getElementsByClassName('stepAdd'));
            setCookStepHCollection(document.getElementsByClassName('changeStepH'));
            setCookStepInputCollection(document.getElementsByClassName('changeStepInput'));
            setCookCollection(document.getElementsByClassName('recipeTextCook'));            
            setCookHCollection(document.getElementsByClassName('cookAddLi'));
            setCookInputCollection(document.getElementsByClassName('changeCookInput'));
            setCookWrap(document.getElementById('cookRecipe'));
            setCookValues(document.getElementsByClassName('cookCollection'));
            setErrorStep(document.getElementsByClassName('errorStep'));
            setErrorCook(document.getElementsByClassName('errorCook'));
            setErrorCookBlock(document.getElementsByClassName('error-ingredients'));
    }, []);

    // динамическое извлечение html коллекций в блоке групп и ингредиентов
    useEffect(() => {
        if (ingredients)
        {
            setGroupIngredHCollection(document.getElementsByClassName('changeGroupH'));
            setGroupIngredInputCollection(document.getElementsByClassName('changeGroupInput'));
            setIngredientsCollection(document.getElementsByClassName('recipeAdd'));            
            setIngredDivCollection(document.getElementsByClassName('divIngredH'));
            setIngredHCollection(document.getElementsByClassName('ingredientAddLi'));
            setIngredInputCollection(document.getElementsByClassName('changeIngredInput'));
            setIngredientsWrap(document.getElementById('ingredients'));
            setIngredientValues(document.getElementsByClassName('ingredientCollection'));
            setIngredAddCollection(document.getElementsByClassName('ingredientAdd'));
            setIngredGroupAddCollection(document.getElementsByClassName('groupAdd'));
            setErrorIngredient(document.getElementsByClassName('errorIngredient'));
            setErrorGroup(document.getElementsByClassName('errorGroup'));
        }
    }, [ingredients]);

    // динамическое проставление id в блоке групп и ингредиентов
    useEffect(() => {   
            if (ingredients)
            {       
                if (errorGroup) 
                {
                    Array.from(errorGroup).forEach((e, i, arr) => {
                    e.id = `errorGroup-${i}`;
                    });
                }    
                if (errorIngredient) 
                {
                    Array.from(errorIngredient).forEach((e, i, arr) => {
                    e.id = `errorIngredient-${i}`;
                    });
                }                   

                if (groupIngredHCollection) 
                {
                    Array.from(groupIngredHCollection).forEach((e, i, arr) => {
                        e.id = `groupIngredient-${i}`;
                    });
                }   
                if (ingredInputCollection) 
                {
                    Array.from(ingredInputCollection).forEach((e, i, arr) => {
                    e.id = `ingredientDiv-${i}`;
                    });                          
                }
                if (ingredHCollection) 
                {
                    Array.from(ingredHCollection).forEach((e, i, arr) => {
                        e.id = `ingredient-${i}`;
                    });
                } 
            }  
            if (groupIngredInputCollection) 
            {                     
                Array.from(groupIngredInputCollection).forEach((el, i, arr) => {     
                    el.id=`inputGroupIngredient-${i}`;  

                    document.getElementById(`inputGroupIngredient-${i}`).addEventListener('input', function(e) {  
                        setErrorIngredient(true);                       
                        let emptyH = EmptyText(el.value);
                        // отслеживание пустых значений в поле группа
                        document.getElementById(`groupIngredient-${i}`).textContent=`${el.value}`;
                        if (emptyH!=="")
                        {
                            document.getElementById(`inputGroupIngredient-${i}`).setAttribute("data-empty", false);
                            document.getElementById(`errorGroup-${i}`).textContent="";                                                                               
                        }
                        else 
                        {
                            document.getElementById(`inputGroupIngredient-${i}`).setAttribute("data-empty", true);
                            document.getElementById(`errorGroup-${i}`).textContent="Поле не должно быть пустым, заполните или удалите двойным щелчком.";
                        } 
                    });
                });
            }  
            if (ingredInputCollection) 
            {           
                Array.from(ingredInputCollection).forEach((el, i, arr) => {     
                        el.id=`inputIngredient-${i}`;                
                        document.getElementById(`inputIngredient-${i}`).addEventListener('input', function(e) {
                        document.getElementById(`ingredient-${i}`).textContent=`${el.value}`;
                        setErrorIngredient(true); 
                    });
                });
           }           
    }, [ingredInputCollection, errorGroup, errorIngredient, ingredientValues, ingredientsCollection, ingredients, groupIngredDivCollection, groupIngredHCollection, groupIngredBtnCollection, groupIngredInputCollection]);      

    // динамическое проставление id в блоке шагов и приготовлений
    useEffect(() => {        
        if (errorStep) 
            {
                Array.from(errorStep).forEach((e, i, arr) => {
                e.id = `errorStep-${i}`;
                });
            }      
            if (errorCook) 
                {
                    Array.from(errorCook).forEach((e, i, arr) => {
                    e.id = `errorCook-${i}`;
                  });
                }               
            if (cookStepHCollection) 
                {
                    Array.from(cookStepHCollection).forEach((e, i, arr) => {
                    e.id = `stepCook-${i}`;
                  });
                }    
            if (cookInputCollection) 
                {
                    Array.from(cookInputCollection).forEach((e, i, arr) => {
                    e.id = `cookCook-${i}`;
                  });
                }   
            if (cookHCollection) 
                {
                    Array.from(cookHCollection).forEach((e, i, arr) => {
                    e.id = `cookHCook-${i}`;
                  });
                }          
            if (cookStepInputCollection) 
                {
                    Array.from(cookStepInputCollection).forEach((e, i, arr) => {                  
                        // отслеживание пустых значений в поле шаг                       
                        e.id=`inputStepCook-${i}`;                                                            
                        document.getElementById(`inputStepCook-${i}`).addEventListener('input', function(el) {
                            let emptyH = EmptyText(e.value);
                            setErrorCooking(true); 
                            document.getElementById(`stepCook-${i}`).textContent=emptyH;                             
                            if (emptyH!=="")
                            {
                                document.getElementById(`inputStepCook-${i}`).setAttribute("data-empty", false);
                                document.getElementById(`errorStep-${i}`).textContent="";                                                                               
                            }
                            else 
                            {
                                document.getElementById(`inputStepCook-${i}`).setAttribute("data-empty", true);
                                document.getElementById(`errorStep-${i}`).textContent="Поле не должно быть пустым, заполните или удалите двойным щелчком.";
                            } 
                        });
                    });                                           
                }  
                               
                if (cookInputCollection) 
                {
                    Array.from(cookInputCollection).forEach((e, i, arr) => {                  
                        // отслеживание пустых значений в поле приготовление                       
                        e.id=`cookCook-${i}`;                                                            
                        document.getElementById(`cookCook-${i}`).addEventListener('input', function(el) {     
                            setErrorCooking(true); 
                       
                            let emptyH = EmptyText(e.value);
                            document.getElementById(`cookHCook-${i}`).textContent=emptyH;   
                            if (emptyH!=="")
                            {
                                document.getElementById(`cookCook-${i}`).setAttribute("data-empty", false);
                                document.getElementById(`errorCook-${i}`).textContent="";                                                                               
                            }
                            else 
                            {
                                document.getElementById(`cookCook-${i}`).setAttribute("data-empty", true);
                                document.getElementById(`errorCook-${i}`).textContent="Поле не должно быть пустым, заполните или удалите двойным щелчком.";
                             } 
                        });
                    });                                           
                }  

                 
    }, [arrC, cookStepInputCollection, cookInputCollection, cookHCollection, errorCook]);   

    // отслеживание пустых значений в поле ингредиент
    useEffect(() => {   
        if (ingredHCollection) 
        {             
            Array.from(ingredHCollection).forEach((el, i, arr) => {   
                if (document.getElementById(`inputIngredient-${i}`))           
                {
                    document.getElementById(`inputIngredient-${i}`).addEventListener('input', function(e) {
                        setErrorIngredients(true); 
                        let emptyH = EmptyText(document.getElementById(`ingredient-${i}`).textContent);                                                            
                        if (emptyH!=="")
                        {
                            document.getElementById(`ingredient-${i}`).setAttribute("data-empty", false);
                            document.getElementById(`errorIngredient-${i}`).textContent="";                                                                               
                        }
                        else 
                        {
                            document.getElementById(`ingredient-${i}`).setAttribute("data-empty", true);
                            document.getElementById(`errorIngredient-${i}`).textContent="Поле не должно быть пустым, заполните или удалите двойным щелчком.";
                        }  
                    }) 
                }
            });             
       }   
    }, [ingredHCollection, addIngredients]);

    useEffect(() => {
        setIngredients (arrI.join("")); // парсинг динамическгого html в поле ингредиенты
    }, [arrI]);
    
    useEffect(() => {
        setCooking (arrC.join("")); // парсинг динамическгого html в поле приготовление
    }, [arrC1]);

    // отслеживание пустого значения поля группа ингредиентов при клике
    const GroupValueChange = (e) => 
    {         
        if (EmptyText(e)==="") 
        {
            setErrorGroupIngredient (false);            
        }
        else setErrorGroupIngredient (true);
        setValueTitleIngredient(e); 
    }

    // отслеживание пустого значения поля ингредиент при клике
    const IngredientValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorIngredientValue (false);
        }
        else setErrorIngredientValue (true);
        setValueIngredient(e); 
    }

    // отслеживание пустого значения поля приготовление при клике
    const CookValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorCookValue (false);
        }
        else setErrorCookValue (true);
        setValueCooking(e); 
    }

    // отслеживание пустого значения поля шаг при клике
    const StepValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorStepValue (false);
        }
        else setErrorStepValue (true);
        setValueTitleCooking(e); 
    }

    // белки
    const proteinsValue = (e) => {
         setProteins (e.target.value);
    }
     // жиры
    const fatsValue = (e) => {
        setFats (e.target.value);
    }
    // углеводы
    const carbohydratesValue = (e) => {
        setCarbohydrates (e.target.value);
    }
    // калории
    const caloriesValue = (e) => {
        setCalories (e.target.value);
    } 

    // время приготовления в часах
    const hoursValue = (e) => {
        if (Number.isInteger(+e.target.value))
        {
            setErrorTime((prev) => ({ ...prev, hourNumber: true }));    
            document.getElementById("hours").placeholder = Math.abs(e.target.value);
            setHours(Math.abs(e.target.value));
        }
        else {
            setErrorTime((prev) => ({ ...prev, hourNumber: false }));  
            document.getElementById("hours").placeholder = 0;  
        }
        if (e.target.value>150)
        {
            setErrorTime((prev) => ({ ...prev, hourLength: false })); 
        }
        else setErrorTime((prev) => ({ ...prev, hourLength: true })); 
    }

    // время приготовления в минутах
    const minutesValue = (e) => {        
        if (Number.isInteger(+e.target.value))
        {
            setErrorTime((prev) => ({ ...prev, minuteNumber: true }));    
            document.getElementById("minutes").placeholder = Math.abs(e.target.value);
            setMinutes(e.target.value);
        }
        else {
            setErrorTime((prev) => ({ ...prev, minuteNumber: false }));  
            document.getElementById("minutes").placeholder = 0;  
        }
        if (e.target.value>59)
        {
            setErrorTime((prev) => ({ ...prev, minuteLength: false })); 
        }
        else setErrorTime((prev) => ({ ...prev, minuteLength: true })); 
    }
 
    useEffect(() => {
        setIngredients (arrI.join("")); // парсинг динамическгого html в поле ингредиенты
    }, [arrI]);

    // добавление ссылок
    const addLink = ()  => {        
        const nodeLi = document.createElement("li");
        const nodeA = document.createElement("a");       
        const textnode = document.createTextNode(link); 
        const nodeBtn = document.createElement("button");
        nodeLi.appendChild(textnode);
        document.getElementById("links").appendChild(nodeLi);
        nodeLi.classList.add ("linksLi", "links")
        const textnodeA = document.createTextNode(linkText);
        nodeA.appendChild(textnodeA);
        document.getElementById("links").appendChild(nodeA);
        nodeA.classList.add ("linksA", "links")
        document.getElementById("links").appendChild(nodeBtn);
        //nodeBtn.textContent="удалить";
        nodeBtn.classList.add ("linksBtn")
        Array.from(linkLiCollection).forEach((e, i, arr) => {
            e.id = `linksLi-${i}`;
        });
        Array.from(linkACollection).forEach((e, i, arr) => {
            e.id = `linksA-${i}`;
        });
        Array.from(linkBtnCollection).forEach((e, i, arr) => {
            e.id = `linksBtn-${i}`;
        });
        setLinkAdd (true);        
    }    
    
    // динамическое извлечение html коллекций в блоке ссылок, удаление ссылок
        useEffect(() => {
                setLinkCollection(document.getElementsByClassName('linkWrap'));
                setLinkLiCollection(document.getElementsByClassName('linksLi'));
                setLinkACollection(document.getElementsByClassName('linksA'));                     
                setLinkBtnCollection(document.getElementsByClassName('linksBtn'));                  
            if (linkCollection)
            {          
                Array.from(linkBtnCollection).forEach((el, i, arr) => {                                   
                    el.addEventListener('click', function(e) {
                        el.remove();
                        if (document.getElementById(`linksA-${i}`)&&document.getElementById(`linksLi-${i}`)) {
                            document.getElementById(`linksA-${i}`).remove();
                            document.getElementById(`linksLi-${i}`).remove();
                        }
                });
            });
        }   
        setLinkAdd (false); 
    }, [linkAdd, link, linkCollection, linkLiCollection, linkText, linkACollection, linkBtnCollection]);    

    const linkName  = (e)  => {
        setLink(EmptyText(e.target.value));
    }

    const linkValue  = (e)  => {
        setLinkText(EmptyText(e.target.value));
    }

    function replaceValue (text) {
        const value = EmptyText(text.replace(/["']/g, "′"));
        return value.replace(/[*]/g, "⚹");
    }

   // отправка рецепта со всеми параметрами в базу
   const handleClick = (e) => {      
    const arrLinks = [];
    let arrLinksValue = "";
    if (linkLiCollection&&linkLiCollection.length>0)
    {
        Array.from(linkLiCollection).forEach((el, i, arr) => {   
            let a = document.getElementById(`linksA-${i}`);  
            const value = replaceValue (el.textContent);
            const link =  replaceValue (a.textContent); 
            arrLinksValue = `{*name*:*${value}*, *link*: *${link}*}`;       
            arrLinks.push (arrLinksValue);
       });
    }  
    const arrIngredients = [];
    let arrValue = "";
    const reg = /group/;        
    if (ingredientValues)
    {
        Array.from(ingredientValues).forEach((el, i, arr) => {     
            const value = replaceValue (el.textContent);        
            if (reg.test(el.id)&&EmptyText(el.textContent)!=="") {                
                arrValue = `{*type*:*группа*,*value*:*${value}*}`
            }   
            else {
                if (EmptyText(el.textContent)!=="")
                {
                    arrValue = `{*type*:*ингредиент*,*value*:*${value}*}`
                }
            }                    
            arrIngredients.push (arrValue);
       });
    }    
    const arrCook = [];
    let arrCookValue = "";
    let j = 1;
    if (cookValues)
    {
        Array.from(cookValues).forEach((el, i, arr) => {  
            const value = replaceValue (el.textContent); 
            if (el.tagName==="H3"&&EmptyText(el.textContent)!=="") {                    
                arrCookValue = `{*type*:*шаг*, *value*: *${value}*}`;
            }   
            if (el.tagName==="IMG") {
                let val=el.getAttribute('src');
                let addImg = val.substring(val.lastIndexOf('/')+1,val.length);                    
                arrCookValue = `{*type*:*рисунок*, *value*: *${addImg}*}`;
            }
            if (el.tagName==="LI"&&EmptyText(el.textContent)!=="") {                 
                arrCookValue = `{*type*:*приготовление*, *value*: *${value}*}` ;
            }                               
            arrCook.push (arrCookValue);            
      });   
    }
    const arrCookFilter= arrCook.filter((number) => number !== "");
    const arrIngredientsFilter= arrIngredients.filter((number) => number !== "");
    let val=document.getElementById('mainImage').src;
    let mainImg = val.substring(val.lastIndexOf('/')+1,val.length);
    let today = new Date().toISOString().slice(0, 10);
    const valueNote = replaceValue (note); 
    const valueTitle = replaceValue (title); 
    const recipe = {
        name: valueTitle,
        ingredients_arr: JSON.stringify(arrIngredientsFilter),
        cook_arr: JSON.stringify(arrCookFilter),
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
        gluten: gluten,
        lactose: lactose,
        complexity: subTypeComplexity,
        price: subTypePrice,
        bbq: bbq,
        typeRecipe: type,
        note: valueNote,
        review: JSON.stringify({"params": []}),
        username: auth.currentUser,
        publicUserName: userPublicName,
        date: today,
        add_section: typeRus, 
        add_subsection: subTypeRus,
        typeKitchen: subTypeKitchen,
        proteins: proteins,
        fats: fats,
        hours: hours,
        minutes: minutes,
        carbohydrates: carbohydrates,
        calories: calories,
        links: JSON.stringify(arrLinks),
    }
         async function addRecipes() {
         const res = await fetch (`/api/account/add_recipe` , 
         {
             method: "POST",
             body: JSON.stringify(recipe)                    
         })
         .catch((err) => {
             setErrorRequest (true);
             return(err);
         }); 
         if (res.status===200) {
             setErrorRequest (false);
             router.push(`/recipes/sort?type=${type}`);
         }
         else setErrorRequest (true);
     }
     addRecipes(); 
};

const changeTitle = (e) => {
    const title = EmptyText (e);
    setTitle(title);
    if (title==="")
    {
        setErrorTitle (true);
        setErrorMainTitle (false)
    }
    else {
        
        setErrorTitle (false);
        setErrorMainTitle (true)
    }
    if (title.length>80) 
    {
        setErrorTitleLength (true);
        setErrorMainTitle (false);
    }
    else setErrorTitleLength (false);
}

1
return (
    <div> 
        <HeadMetaTags
            content="noindex" 
        />     
        <Navbar/>  
        <div>
        {(!auth.auth)  && 
            <div className='text-center'>
                <h1 className='pd-t-40'>Доступ запрещен</h1>
                <div className='registrationLink pd-b-40'>
                    <p>Для добавления рецепта требуется <a href="/auth/login" alt="авторизация Vseresepty.ru">авторизация.</a></p>
                    <BackButton/>
                </div>
                <img src="/img/40.gif" className='h-100' />
            </div>
        }
        {(auth.auth) &&   
            <div className='addRecipes'>                
                <div ref={titleRef}>
                    <img className='mainImgAva' src='/icons/icon_notebook.png' /><h1>Добавить рецепт</h1>
                    <p>Загрузить рецепт на сайт просто! Поделитесь своим любимым блюдом с родными, друзьями и другими гурманами со всего мира.</p>
                    <div className='addRecipeContent'>   
                        <div className='addRecipeHeader'>
                            <h2>Название блюда</h2>
                            <div>
                                <input type="text" name="title" placeholder="Дайте название вашему блюду (до 150 символов)" onChange={(e) => {changeTitle(e.target.value)}}  />                                                                 
                            </div> 
                            <div className='error'>
                                {errorTitle===true && <div className='error'>Заполните название.</div>}
                                {errorTitleLength && <div className='error pd-t-5'>Название не должно быть больше 80 символов.</div>}
                            </div>

                        </div>                          
                        <div ref={pictureRef}  className='addRecipeNote'>
                            <h2>Краткое описание или особенности</h2>     
                            <div>
                                <textarea type="text" name="title" placeholder="Опишите кратко особенности вашего блюда" onChange={(e) => setNote(e.target.value)} />                      
                            </div>
                        </div>                        
                        <div className='mainImage addIngredients'>                                
                            <h2 ref={ingredientsRef}>Фото рецепта</h2>
                            <AddImage pathToSave="https://storage.yandexcloud.net/vseresepty" btnClass="buttonTransparentBorder mr-b-10" clickBtn={clickMainImg} btnCropId="btnCropMainImg" defaultImage="/icons/icon_avatar.png" canvasId="mainImageCanvas" imgId="mainImage"  imgClass=""/>
                            {!errorMainImg && <div className='error pd-t-5'>Загрузите основное фото рецепта</div>}                      
                            <div className='pd-b-20'></div>
                        </div>               
                        <div className='addIngredients'>                    
                            <h2>Ингредиенты</h2>
                            <p>Введите ингредиенты в поля под шаблоном, объединяя их в группы при необходимости. В шаблоне данные можно менять в полях, для удаления дважды кликните по элементу.</p>                 
                            {arrI.length>0 && <>
                            <p className='mr-b-5 mr-t-30'>ШАБЛОН:</p></>                           
                            }
                            <div className='recipeAdd' id="ingredients">
                            {addIngredients}                                                     
                            </div> 
                            {!errorIngredients && <div className='error'>Заполните ингредиенты</div>} 
                            <div className='ingredientsGroup pd-t-3 pd-b-7'>  
                                <div className='buttonWhite ingredientsGroupP'>
                                    <p className='mr-b-5 mr-t-30'>ГРУППА:</p>
                                    <input className='mr-b-15' value={valueTitleIngredient} onChange={(e => {GroupValueChange(e.target.value)})} placeholder="Например: Тесто"/>                             
                                    {errorGroupIngredient &&
                                    <button onClick={event => setArrI([...arrI, `<div class="groupAdd pd-t-20"><span class="groupName">Группа:</span><h3 class="changeGroupH ingredientCollection">${valueTitleIngredient}</h3><div class="divGroupH"></div><button class="changeGroupBtn">Изменить группу: </button><input class="changeGroupInput" type="text"></input><div class="errorGroup error pd-b-15 pd-l-25"></div></div>`])}>
                                        ДОБАВИТЬ ГРУППУ
                                    </button>}
                                </div>
                                <div className='buttonWhite ingredientsGroupP'> 
                                    <p className='mr-b-5 mr-t-30'>ИНГРЕДИЕНТ:</p>
                                    <input className='mr-b-15' type='text' value={valueIngredient} onChange={event => IngredientValueChange(event.target.value)} placeholder="Например: 200 мл воды"/>
                                    {errorIngredientValue &&
                                        <button className='mr-b-20' onClick={event => setArrI([...arrI, `<div class="ingredientAdd"><span>Ингредиент:</span><li class="ingredientAddLi ingredientCollection" data-empty="true">${valueIngredient}</li><div class="divGroupH"></div><button class="changeIngredBtn">Изменить ингредиент: </button><input class="changeIngredInput" type="text"></input><div class="errorIngredient error pd-b-15"></div></div>`])}>                                                
                                            ДОБАВИТЬ ИНГРЕДИЕНТ
                                        </button>
                                    }
                                </div>                                                                
                            </div> 
                        </div>
                        <h2 className='mr-b-5'>Ссылки</h2>
                        <div id='links' className='linkWrap'>                            
                        </div>
                        <div className='buttonWhite linkButtonWrap border-bottom-light-grey'> 
                            <p>Введите в верхнее поле название ссылки, в поле ниже значение ссылки.</p>
                            <input type='text' onChange={event => linkName(event)} placeholder="Например: крем"/>
                            <input type='text' onChange={event => linkValue(event)} placeholder="Например: /recipes/.../..."/>
                            {linkText!==""&&link!=="" &&
                                <button onClick={addLink}>                                                
                                    ДОБАВИТЬ ССЫЛКУ
                                </button>     
                            }                                                                 
                        </div>  
                        <div ref={cookRef} className='addIngredients'>                    
                            <h2>Приготовление</h2>
                            <p>Опишите как готовить ваше блюдо по шагам, добавляя имеющиеся фото к каждому шагу. В шаблоне будет примерно отображено как ваш рецепт будет отображаться на сайте. Для удаления контента дважды кликните на нем в шаблоне приготвовления.</p>                 
                            <div className='recipeTextCook' id='cookRecipe'>
                                <div>
                                    {addCooking}     
                                </div>               
                            </div>                            
                            {!errorСooking && <div className='error'>Опишите рецепт по шагам</div>}
                            <div className='addRecipeCook'>  
                                <div className='ingredientsGroup mr-t-30'>  
                                    <p className='mr-b-5'>ШАГ:</p> 
                                    <input value={valueTitleCooking} onChange={event => StepValueChange(event.target.value)} placeholder="Например: 1"/>                                 
                                    {errorStepValue &&<div className='buttonWhite'>                                                                      
                                        <button onClick={event => {setArrC([...arrC, `<div class="stepAdd"><span class="groupStepCook">Шаг:</span><h3 class="changeStepH cookCollection">${valueTitleCooking}</h3><button class="changeStepBtn">Изменить шаг: </button><input class="changeStepInput" type="text"></input><div class="errorStep error-ingredients error pd-b-15 pd-l-25"></div></div>`]); setArrC1([...arrC1, {step: valueTitleCooking}])}}>
                                            ДОБАВИТЬ ШАГ
                                        </button>                                        
                                    </div>}
                                </div>                                     
                                <div className='ingredientsGroup mr-t-30'> 
                                    <p className='mr-b-5'>ДЕЙСТВИЕ:</p> 
                                    <input value={valueCooking} onChange={event => {CookValueChange(event.target.value); }} placeholder="Например: Овощи почистить и мелко нарезать."/>
                                    <div className='buttonWhite'>                                    
                                        {errorCookValue &&
                                        <button onClick={event => {setArrC([...arrC, `<div class="cookAdd"><span class="groupNameCook">Приготовление:</span><li class="cookAddLi cookCollection">${valueCooking}</li><button class="changeCookBtn">Изменить приготовление: </button><input class="changeCookInput" data-empty="true" type="text"></input><div class="errorCook error-ingredients error pd-b-15 pd-l-25"></div>`]); setArrC1([...arrC1, {cook: valueCooking}])}}>
                                            ДОБАВИТЬ ДЕЙСТВИЕ
                                        </button>
                                        }
                                    </div>
                                </div> 
                            </div>
                            <div className='pd-b-25'>                                
                                <p ref={typeRef}  className='mr-t-30'>ФОТО БЛЮДА НА ДАННОМ ШАГЕ:</p>                                  
                                <AddImage pathToSave="https://storage.yandexcloud.net/vseresepty" btnClass="buttonTransparentBorder mr-b-10" clickBtn={clickCookImg} btnCropId="btnCropCookImg" defaultImage="/icons/icon_avatar.png" canvasId="CookImageCanvas" imgId="cookImage" imgClass=""/>
                                <div className='uploadImage'>
                                    <button className='buttonWhite' onClick={saveCookImg}>СОХРАНИТЬ ФОТО НА ЭТАПЕ ПРИГОТОВЛЕНИЯ</button>
                                </div>                                                                
                            </div>                                                                          
                            </div>
                            <div className='addCathegory'> 
                                <h2>Выбор раздела и подраздела</h2>
                                <div >
                                    {!errorType && <div className='error pd-b-3 mr-t-15'>Выберите раздел и подраздел</div>}
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
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setMarinade(1); else setMarinade(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Консервация</p>
                                            </div> 
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setGluten(1); else setGluten(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Безглютеновое</p>
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
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setBbq(1); else setBbq(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>На мангале</p>
                                            </div>  
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        <input type="checkbox" onChange={event => {if (event.target.checked) setLactose(1); else setLactose(0)}} />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Безлактозное</p>
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="pd-t-40 addCathegoryBorder">
                                        <input type="radio" checked={typeKitchen === "kitchenType"} name="kitchenType" value="kitchenType" id="kitchenType" className="custom-checkbox" onChange={(e) => {setTypeKitchen(e.target.value); setSubTypeKitchen('rus')}}/>
                                        <label htmlFor="kitchenType">Тип Кухни</label>                        
                                    </div>  
                                    {typeKitchen==="kitchenType" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubTypeKitchen(e.target.value)}> 
                                                <option value="">Не выбрано</option>
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
                                    <div className="pd-t-40 addCathegoryBorder">
                                        <input type="radio" checked={typeComplexity === "complexityType"} name="complexityType" value="complexityType" id="complexityType" className="custom-checkbox" onChange={(e) => {setTypeComplexity(e.target.value); setSubTypeComplexity('0')}}/>
                                        <label htmlFor="complexityType">Сложность приготовления</label>                        
                                    </div>  
                                    {typeComplexity==="complexityType" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubTypeComplexity(e.target.value)}> 
                                                <option value="0">Не выбрано</option>
                                                <option value="1">Простое</option>
                                                <option value="2">Среднее</option> 
                                                <option value="3">Сложное</option> 
                                            </select>
                                        </div>
                                    }
                                    </div> 
                                    
                                    <div className="pd-t-40 addCathegoryBorder">
                                        <input type="radio" checked={typePrice === "priceType"} name="priceType" value="priceType" id="priceType" className="custom-checkbox" onChange={(e) => {setTypePrice(e.target.value); setSubTypePrice('0')}}/>
                                        <label htmlFor="priceType">Стоимость</label>                        
                                    </div>  
                                    {typePrice==="priceType" && 
                                        <div className='selectRecipe'>
                                            <select onChange={(e) => setSubTypePrice(e.target.value)}> 
                                                <option value="0">Не выбрано</option>
                                                <option value="1">Дешевое</option>
                                                <option value="2">Среднее</option> 
                                                <option value="3">Дорогое</option> 
                                            </select>
                                        </div>
                                    }
                                    <div className='addCathegoryBorder pd-b-3'> 
                                        <h2>Время приготовления</h2>
                                        <div className='addCathegoryBlock pd-r-10'>  
                                            <div className='inputs-calories'>
                                                <div>
                                                    <label htmlFor="hours">Часы</label><br/>
                                                    <input min="0" max="150" onChange={hoursValue} id="hours" type='number'/>
                                                </div>
                                                <div>
                                                    <label htmlFor="minutes">Минуты</label><br/>
                                                    <input min="0" max="59" onChange={minutesValue} id="minutes" type='number'/>
                                                </div>
                                            </div>
                                        </div>
                                        {!errorTime.hourNumber||!errorTime.minuteNumber  &&
                                        <>
                                            <div className='error'>
                                                Введите целое число.
                                            </div>
                                        </>
                                        }
                                        {!errorTime.hourLength  &&
                                        <>
                                            <div className='error'>
                                                Введите менее 150 часов.
                                            </div>
                                        </>
                                        }
                                        {!errorTime.minuteLength  &&
                                        <>
                                            <div className='error'>
                                                Введите менее 60 минут.
                                            </div>
                                        </>
                                        }
                                    </div>  


                                    <div className='addCathegoryBorder pd-b-3'> 
                                        <h2>Энергетическая ценность на 100 грамм</h2>
                                        <div className='addCathegoryBlock pd-r-10'>  
                                            <div className='inputs-calories'>
                                                <div>
                                                    <label htmlFor="proteins">Белки</label><br/>
                                                    <input onChange={proteinsValue} id="proteins" type='number'/>
                                                </div>
                                                <div>
                                                    <label htmlFor="fats">Жиры</label><br/>
                                                    <input onChange={fatsValue} id="fats" type='number'/>
                                                </div>
                                                <div>
                                                    <label htmlFor="carbohydrates">Углеводы</label><br/>
                                                    <input onChange={carbohydratesValue} id="carbohydrates" type='number'/>
                                                </div>
                                                <div>
                                                    <label htmlFor="calories">Калории</label><br/>
                                                    <input onChange={caloriesValue} id="calories" type='number'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                                                                                   

                                    <div className='pd-t-30'>
                                        {errorTitle===true && 
                                            <div onClick={refTitle} className='error cursor-pointer f-s-16'>Заполните название блюда.</div>
                                        }
                                        {errorTitleLength===true && 
                                            <div onClick={refTitle} className='error cursor-pointer f-s-16 pd-t-5'>Название блюда не должно превышать 80 символов.</div>
                                        }
                                        {errorMainImg===false && 
                                            <div onClick={refPicture} className='error cursor-pointer f-s-16 pd-t-5'>Основное фото не выбрано.</div>
                                        }
                                        {errorIngredients===false && 
                                            <div onClick={refIngredients} className='error cursor-pointer f-s-16 pd-t-5'>Заполните ингредиенты.</div>
                                        }
                                        {errorСooking===false && 
                                            <div onClick={refCook} className='error cursor-pointer f-s-16 pd-t-5'>Заполните приготовление.</div>
                                        }
                                        {errorType===false && 
                                            <div onClick={refType} className='error cursor-pointer f-s-16 pd-t-5'>Выберите раздел и подраздел.</div>
                                        }
                                        {errorRequest===true && 
                                            <div onClick={refType} className='error cursor-pointer f-s-16 pd-t-5'>Ошибка запроса, рецепт не сохранен.</div>
                                        }                                
                                    </div>
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
