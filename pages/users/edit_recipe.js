"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react';
import DOMPurify from "dompurify";
import { useAuth } from '../context/context';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import AddImage from '../services/cropper/add-image';
import EmptyText from '../services/empty-text';
import BackButton from '../components/button_back';
import HeadMetaTags from '../components/head';

const EditRecipe = () => {
    const auth = useAuth();
    const router = useRouter();
    const [recipe, setRecipe] = useState([]);
    const type = useSearchParams().get('cat');
    const id = useSearchParams().get('id');
    const [title, setTitle] = useState("");   // название рецепта
    const [errorTitle, setErrorTitle] = useState(false);   // пустое значение названия
    const [errorTitleLength, setErrorTitleLength] = useState(false);   // длина названия
    const [ingredientsArr, setIngredientsArr] = useState ([]);  // новые рецепты раздел ингредиенты
    const [cook, setCook] = useState ([]); // новые рецепты раздел приготовление
    const [cookArr, setCookArr] = useState ([]); // новые рецепты раздел приготовление    
    const [cookArrEdit, setCookArrEdit] = useState ([]); // правка приготовления
    const [ingredientArrEdit, setIngredientArrEdit] = useState ([]); // правка ингредиентов
    const [veg, setVeg] = useState(false);  // флаг вегетарианского блюда
    const [lent, setLent] = useState(0);  // флаг постного блюда
    const [calorie, setCalorie] = useState(0);  // флаг низкокалорийного блюда
    const [festive, setFestive] = useState(0);  // флаг праздничного блюда
    const [unusual, setUnusual] = useState(0);  // флаг необычного блюда
    const [spicy, setSpicy] = useState(0);  // флаг пикантного блюда
    const [exotic, setExotic] = useState(0);  // флаг экзотического блюда
    const [cheap, setCheap] = useState(0);  // флаг недорогого блюда
    const [marinade, setMarinade] = useState(0);  // флаг соленья или маринада 
    const [gluten, setGluten] = useState(0);  // флаг безглютенового 
    const [lactose, setLactose] = useState(0);  // флаг безлактозного
    const [bbq, setBbq] = useState(0);  // флаг блюда на костре
    const [typeKitchen, setTypeKitchen] = useState("");  // тип кухни    
    const [typeKitchenRus, setTypeKitchenRus] = useState("");  // подтип кухни
    const [subTypeKitchen, setSubTypeKitchen] = useState("");  
    const [cooking, setCooking] = useState ();    // описание рецепта
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const [note, setNote] = useState ("");    // основное фото
    const [cookArr1, setCookArr1] = useState();      // описание рецепта в виде массива
    const [changeIngredients, setChangeIngredients] = useState (false);   
    const [changeIngredients1, setChangeIngredients1] = useState (false);  
    const [changeLinks, setChangeLinks] = useState (false);  
    const [changeCooking, setChangeCooking] = useState (true);  
    const [changeCooking1, setChangeCooking1] = useState (true);
    const [addCookImgSrc, setAddCookImgSrc] = useState('');
    const [deleteCount, setDeleteCount] = useState(); 
    const [deleteCountIngredient, setDeleteCountIngredient] = useState();    
    const [valueIngredient, setValueIngredient] = useState('');
    const [valueGroup, setValueGroup] = useState(''); 
    const [valueCook, setValueCook] = useState(''); 
    const [valueStepCook, setValueStepCook] = useState(''); 
    const [valueInputCook, setValueInputCook] = useState(''); 
    const [valueTextareaCook, setValueTextareaCook] = useState(''); 
    const [valueTextareaGroup, setValueTextareaGroup] = useState(''); 
    const [groupInput, setGroupInput] = useState(''); 
    const [valueInputIngredients, setValueInputIngredients] = useState(''); 
    const [user, setUser] = useState(null);
    const [ingredBlock, setIngredBlock]= useState (true);  
    const [recipeBlock, setRecipeBlock]= useState (true); 
    const [proteins, setProteins] = useState(0);  // белки
    const [fats, setFats] = useState(0);  // жиры
    const [carbohydrates, setCarbohydrates] = useState(0);  // углеводы
    const [calories, setCalories] = useState(0);  // калории  
    const [errorMainImg, setErrorMainImg] = useState (false); 
    const [removeCookValue, setRemoveCookValue] = useState (false); 
    const [removeIngredientValue, setRemoveIngredientValue] = useState (false); 
    const [addStepCookValue, setAddStepCookValue] = useState (false); 
    const [addCookValue, setAddCookValue] = useState (false); 
    const [addGroupIngredientValue, setAddGroupIngredientValue] = useState (false); 
    const [addGroupValue, setAddGroupValue] = useState (false);   
    const [addIngredientValue, setAddIngredientValue] = useState (false);   
    const [groupEditStep, setGroupEditStep] = useState([]);
    const [groupErrorEditCook, setGroupErrorEditCook] = useState([]);
    const [errorEditCook, setErrorEditCook] = useState(false);
    const [errorEditStepCook, setErrorEditStepCook] = useState(false);
    const [errorEditIngredients, setErrorEditIngredients] = useState(false);
    const [errorEditGroupIngredients, setErrorEditGroupIngredients] = useState(false);
    const [groupErrorEditIngredients, setGroupErrorEditIngredients] = useState([]);
    const [groupEditCook, setGroupEditCook] = useState([]);
    const [groupEditImg, setGroupEditImg] = useState([]);
    const [groupEditBtn, setGroupEditBtn] = useState([]);
    const [groupEditDeleteBtn, setGroupEditDeleteBtn] = useState([]);
    const [groupEditDeleteImg, setGroupEditDeleteImg] = useState([]);
    const [groupEditIngredgroup, setGroupEditIngredgroup] = useState([]);
    const [groupEditIngredient, setGroupEditIngredient] = useState([]);
    const [groupIngredientEditDeleteBtn,  setGroupIngredientEditDeleteBtn] = useState([]);
    const [ingredientArr, setIngredientArr] = useState([]);
    const [btnAddIngredient, setBtnAddIngredient] = useState([]);
    const [groupCookEditDeleteImgingred, setGroupEditDeleteImgingred] = useState([]);
    const [groupCookArr, setGroupCookArr] = useState([]);
    const [btnAddCook, setBtnAddCook] = useState();
    const [btnAddGroup, setBtnAddGroup] = useState();
    const [imgAddCook, setImgAddCook] = useState();
    const [imgBtnAddCook, setImgBtnAddCook] = useState();
    const [errorStepValue, setErrorStepValue] = useState (false); 
    const [errorCookValue, setErrorCookValue] = useState (false); 
    const [errorCookImg, setErrorCookImg] = useState (false); 
    const [errorGroupValue, setErrorGroupValue] = useState (false); 
    const [errorIngredientValue, setErrorIngredientValue] = useState (false); 
    const [cookingOld, setCookingOld] = useState ([])
    const [cookOld, setCookOld] = useState ([])
    const [ingredientsOld, setIngredientsOld] = useState ([])
    const [arrI, setArrI] = useState([]);
    const [arrC, setArrC] = useState([]);
    const [arrC1, setArrC1] = useState([]);
    const [valueTitleIngredient, setValueTitleIngredient] = useState('');
    const [valueCooking, setValueCooking] = useState('');   
    const [valueTitleCooking, setValueTitleCooking] = useState(''); 
    const [additionalImg, setAdditionalImg] = useState ("");    // доп фото в раздел приготовление
    const inputFileAddRef = useRef(null);
    const [linksArr, setLinksArr] = useState ([]);  // массив ссылок для рецепта
    const [linkCollection, setLinkCollection] = useState([]);
    const [linkLiCollection, setLinkLiCollection] = useState([]);
    const [linkACollection, setLinkACollection] = useState([]);
    const [linkBtnCollection, setLinkBtnCollection] = useState([]);
    const [linkAdd, setLinkAdd] = useState(false);
    const [link, setLink] = useState("");
    const [linkText, setLinkText] = useState("");
    const [errorIngredients, setErrorIngredients] = useState("");
    const [errorCook, setErrorCook] = useState("");
    const [errorRequest, setErrorRequest] = useState("");
    const [typeComplexity, setTypeComplexity] = useState(0);  // тип сложности
    const [subTypeComplexity, setSubTypeComplexity] = useState(0);  // подтип сложности
    const [typePrice, setTypePrice] = useState(-1);  // цена блюда
    const [subTypePrice, setSubTypePrice] = useState(0);  // подтип цены
    const [hours, setHours] = useState();  // приготовление в часах
    const [minutes, setMinutes] = useState();  // приготовление в минутах
    const [errorTime, setErrorTime] = useState({
        hourNumber : true,
        minuteNumber : true,
        hourLength : true,
        minuteLength : true,
    });

    useEffect (() =>    
        {   
            auth.authorization();   
            setUser(auth.currentUser);
            auth.auth; 
    }, [auth]);


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
        if (document.getElementById("select")) 
        {                    
            const select = document.getElementById("select").getElementsByTagName('option');    
            for (let i = 0; i < select.length; i++) {
                if ((select[i].value).toString() === (subTypeKitchen).toString()) {
                    select[i].selected = true;
                }
            }
        }

    }, [typeKitchen, subTypeKitchen]) 

    // получение данных о рецепте из базы
    useEffect (() => {
        if (id && user) {
        async function getRecipe() {
            const res = await fetch(`/api/cooking/recipe?type=${type}&id=${id}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {
                setRecipe(data[0]);
                setTitle(data[0].name);
                setIngredientsOld(data[0].ingredients);
                setCookingOld(data[0].cooking);
                setCookOld(data[0].cook);
                setMainImg(data[0].img_main);
                setVeg(data[0].veg);
                setNote(data[0].note);
                setCookArr1(JSON.parse(data[0].cook));    
                setLent(data[0].lent); 
                setCalorie(data[0].calorie);
                setSubTypeComplexity(data[0].complexity);
                setSubTypePrice(data[0].price);
                setFestive(data[0].festive);
                setLactose(data[0].lactose); 
                setGluten(data[0].gluten);  
                setUnusual(data[0].unusual);
                parseFloat(calories).toFixed(1)
                setCalories (parseFloat(data[0].calories).toFixed(1));
                setProteins (parseFloat(data[0].proteins).toFixed(1));
                setFats (parseFloat(data[0].fats).toFixed(1));
                setCarbohydrates (parseFloat(data[0].carbohydrates).toFixed(1));
                setSpicy(data[0].spicy);  
                setExotic(data[0].exotic); 
                setCheap(data[0].cheap);  
                setMarinade(data[0].marinade);      
                setBbq(data[0].bbq);  
                setSubTypeKitchen(data[0].kitchen);          
                setIngredientsArr(JSON.parse(data[0].ingredients_arr));   
                setCookArr(JSON.parse(data[0].cook_arr));
                setCookArrEdit(JSON.parse(data[0].cook_arr));
                setIngredientArrEdit(JSON.parse(data[0].ingredients_arr));
                setLinksArr(JSON.parse(data[0].links));  
                setHours (data[0].hour);
                setMinutes (data[0].minutes);
            }).catch((err) => {
                return(err);
            });
          }
          getRecipe();  
        }                   
    }, [id, user]);

    // основного фото рецепта
    const clickMainImg = () => {  
        setErrorMainImg (true);
        setMainImg (document.getElementById("mainImage").src);        
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

    function replaceValue (text) {
        const value = EmptyText(text.replace(/["']/g, "′"));
        return value.replace(/[*]/g, "⚹");
    }

    // сохранение всех данных отредактированного рецепта    
    const handleClick = async (e) => {
        const val=document.getElementById('mainImage').src;
        const mainImg = val.substring(val.lastIndexOf('/')+1,val.length);
        const titleValue = replaceValue (title);
        const noteValue = replaceValue (note);
        
        const editRecipe = {
            id: id,
            name: titleValue,
            ingredients_arr: JSON.stringify(ingredientArrEdit),
            ingredients: ingredientsOld,
            cooking: cookingOld,
            cook: cookOld,
            img_main: mainImg ,
            veg: veg,
            note: noteValue,
            type: type,  
            cook_arr: JSON.stringify(cookArrEdit),   
            lent:  lent,
            calorie: calorie,
            festive: festive,
            lactose: lactose,
            gluten: gluten,
            unusual: unusual,
            complexity: subTypeComplexity,
            price: subTypePrice,
            spicy: spicy,
            exotic: exotic,
            cheap: cheap, 
            marinade: marinade,
            bbq: bbq, 
            hours: hours,
            minutes: minutes,   
            typeKitchen: subTypeKitchen,   
            proteins: parseFloat(proteins).toFixed(1),
            fats: parseFloat(fats).toFixed(1),
            carbohydrates: parseFloat(carbohydrates).toFixed(1),
            calories: parseFloat(calories).toFixed(1),
            links: JSON.stringify(linksArr),
        }  
        if (errorTitle===false&&errorTitleLength===false&&ingredientArrEdit?.length>0&&errorEditGroupIngredients===false&&errorEditIngredients===false&&cookArrEdit?.length>0&&errorEditCook===false&&errorEditStepCook===false)
        {
            async function editRecipes()  {
                const res = await fetch  (`/api/account/edit_recipe?type=${type}&id=${id}` , 
                {
                    method: "POST",
                    body: JSON.stringify(editRecipe)
                }) .catch((err) => {
                    setErrorRequest (false);
                    return(err);
                })
                if (res.status===200) {
                    setErrorRequest (true);
                    router.push(`/recipes/sort?type=${type}`);
                }
                else setErrorRequest (false);
            }
            editRecipes(); 
        }
        }                    

    // обязательный параметр для cropper соновного фото 
    const clickCookImg = (e) => {      
    //не удалять! обязательный параметр для cropper
    }  

    // динамическое извлечение html коллекций в правке готовки
    useEffect(() => {
         if (cookArr)
         {
             setGroupEditStep(document.getElementsByClassName('edit-step'));
             setGroupEditCook(document.getElementsByClassName('edit-cook-area'));
             setGroupEditImg(document.getElementsByClassName('edit-img'));
             setGroupEditBtn(document.getElementsByClassName('btnAddImg'));
             setGroupEditDeleteBtn(document.getElementsByClassName('cursor-pointer-edit'));
             setGroupEditDeleteImg(document.getElementsByClassName('img-delete'));
             setGroupCookArr(document.getElementsByClassName('cook-arr'));
             setBtnAddCook(document.getElementById('btnAddStep'));    
             setImgAddCook(document.getElementById('addCookImg'));    
             setImgBtnAddCook(document.getElementsByClassName('btnAddImgCook'));    
             setGroupErrorEditCook(document.getElementsByClassName('error-cook'));            
         }        
    }, [cookArr]);       

    // отслеживание открытия блока приготовление
    const handleOpenRecipe = () => {
        setRecipeBlock (true);
    };

    // отслеживание скрытия блока приготовление
    const handleCloseRecipe = () => {
        setRecipeBlock (false);  
    };  

    // счетчик для удаления элемента массива этапа приготовления   
    const removeCook = (e) =>{
        setRemoveCookValue (true);
        cookArrEdit.splice(deleteCount, 1); 
    }  

    // отслеживание пустого значения поля шаг при клике
    const stepValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorStepValue (false);
        }
        else setErrorStepValue (true);
        setValueStepCook(e); 

    }
    
    // отслеживание пустого значения поля шаг input
    const stepInputValueChange = (e, value) => 
        {                              
            Array.from(groupCookArr).forEach((el, i) => {         
                el.placeholder=replaceValue(el.value); 
                const value = replaceValue(e.target.value);  
                    if (el.id===e.target.id) 
                    {
                        if (EmptyText(e.target.value)==="") 
                        {                            
                            cookArrEdit[i] = `{*type*:*шаг*, *value*: **}`;
                        }
                        else
                        {
                            cookArrEdit[i] = `{*type*:*шаг*, *value*: *${value}*}`;
                        }
                    }    
                }) 
            setValueInputCook (e.target.value);
    }          

    // отслеживание пустого значения поля приготовление input
    const cookTextareaValueChange = (e, value) => 
        {
            Array.from(groupCookArr).forEach((el, i) => {      
                const value = replaceValue (e.target.value);
                if (el.id===e.target.id) 
                {
                    if (EmptyText(e.target.value)==="") 
                    {                      
                        cookArrEdit[i] = `{*type*:*приготовление*, *value*: **}`;
                    }
                    else
                    {
                        cookArrEdit[i] = `{*type*:*приготовление*, *value*: *${value}*}`;
                    }
                }         
            }) 
            setValueTextareaCook (e.target.value)
    }

    // отслеживание пустого значения поля приготовление при клике
    const cookValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorCookValue (false);
        }
        else setErrorCookValue (true);
        setValueCook(e); 
    }
    
    // клик по добавлению фото этапа приготовления для отслеживания не загруженной картинки
    const clickAddCookImg = (e) => {  
        setAddCookValue (true);
        setErrorCookImg(true);
    } 

    // добавление шага приготовления
    const addStepCook = (e) =>{
        setAddStepCookValue (true);
        const value = replaceValue (valueStepCook);
        let arrCookValue = `{*type*:*шаг*, *value*: *${value}*}`;
        cookArrEdit.push (arrCookValue);
        document.getElementById('stepInput').value="";
        setErrorStepValue (false);
        //document.getElementById(e.target.id).setAttribute("data-empty", false)        
    }    

    // добавление этапа приготовления 
    const addCook = (e) =>{
        setAddCookValue (true);
        const value = replaceValue (valueCook);
        let arrCookValue = `{*type*:*приготовление*, *value*: *${value}*}`;
        cookArrEdit.push (arrCookValue);
        document.getElementById('cookInput').value="";
        setErrorCookValue (false);
    }

    // добавление фото на этапе приготовления
    const saveCookImg = () => {    
        if (document.getElementById('addCookImg').src===`${process.env.URL}/icons/icon_avatar.png`)
        {          
            setErrorCookImg(false);
        }
        if (errorCookImg){
            const val = document.getElementById ("addCookImg").src;
            let addImg = val.substring(val.lastIndexOf('/')+1,val.length);
            setAddCookValue (true);
            let arrCookValue = `{*type*:*рисунок*, *value*: *${addImg}*}`
            cookArrEdit.push (arrCookValue);  
        }
    }

    // динамическое извлечение html коллекций в ингредиентах
    useEffect(() => {
        if (ingredientsArr)
        {
            setGroupEditIngredgroup(document.getElementsByClassName('edit-group'));
            setGroupEditIngredient(document.getElementsByClassName('edit-ingredient-area'));
            setGroupIngredientEditDeleteBtn(document.getElementsByClassName('cursor-pointer-edit-ingredient'));
            setBtnAddGroup(document.getElementById('btnAddGroup'));               
            setBtnAddIngredient(document.getElementById('btnAddIngredient'));  
            setGroupEditDeleteImgingred(document.getElementsByClassName('img-delete-ingrerdient')); 
            setIngredientArr(document.getElementsByClassName('ingredient-arr'));
            setGroupErrorEditIngredients(document.getElementsByClassName('error-ingredients'));   
            if (document.getElementById("hours-edit")) {
              document.getElementById("hours-edit").setAttribute('placeholder', hours);
            }
            if (document.getElementById("minutes-edit")) {
                document.getElementById("minutes-edit").setAttribute('placeholder', minutes);
            }  
        }        
    }, [ingredientsArr]);


    // динамическое проставление id в блоке приготовление
    useEffect(() => {           
        if (cookArrEdit)
        {           
            if (groupEditStep)
            {       
                Array.from(groupEditStep).forEach((e, i, arr) => {
                    e.id = `edit-step-${i}`;  
                    e.value=e.placeholder;     
                    if (groupErrorEditCook&&groupErrorEditCook.length>0) {
                        setErrorEditStepCook (true);
                    }
                    else setErrorEditStepCook (false);                                                                           
                }) 
            }  
            if (groupEditCook)
            {     
                Array.from(groupEditCook).forEach((e, i, arr) => {
                    e.id = `edit-cook-${i}`;    
                    e.value=e.placeholder;  
                    if (groupErrorEditCook&&groupErrorEditCook.length>0) {
                        setErrorEditCook (true);
                    }
                    else setErrorEditCook (false);           
                }) 
            }  
            if (groupEditDeleteImg)
            {       
                Array.from(groupEditDeleteImg).forEach((e, i, arr) => {
                    e.id = i;              
                }) 
            }  
            if (groupEditDeleteBtn)
            {       
                Array.from(groupEditDeleteBtn).forEach((e, i) => {
                    e.id = `delete-img-${i}`;  
                    document.getElementById(`delete-img-${i}`).addEventListener('click', function(e) {
                        setDeleteCount(i);
                    });            
                }) 
            } 
            if (document.getElementById('addCookImg'))
            {
                setAddCookImgSrc(document.getElementById('addCookImg'))
            }
        } 
        setRemoveCookValue (false);
        setAddCookValue (false);
        setAddStepCookValue (false);
        if (cookArrEdit?.length===0)
        {
            setErrorCook (true);
        }
        else setErrorCook (false);

    }, [cookArrEdit, valueTextareaCook, valueCook, groupErrorEditCook, valueInputCook, setAddStepCookValue, groupEditStep, addCookValue, addStepCookValue, imgBtnAddCook, imgAddCook, btnAddCook, groupCookArr, deleteCount, removeCookValue, recipeBlock, changeCooking1, groupEditCook, groupEditImg, groupEditBtn]);      
 
    // динамическое проставление id в блоке ингредиентов
    useEffect(() => {  
        if (ingredientArrEdit)
        {
            if (groupEditIngredgroup)
            {       
                Array.from(groupEditIngredgroup).forEach((e, i, arr) => {
                    e.id = `edit-group-${i}`;  
                    e.value=e.placeholder;                                            
                    if (groupErrorEditIngredients&&groupErrorEditIngredients.length>0) { 
                        setErrorEditGroupIngredients (true);
                    }
                    else setErrorEditGroupIngredients (false);     
                }) 
            }  
            if (groupEditIngredient)
            {       
                Array.from(groupEditIngredient).forEach((e, i, arr) => { 
                    e.id = `edit-ingredient-${i}`;    
                    e.value=e.placeholder;          
                    if (groupErrorEditIngredients&&groupErrorEditIngredients.length>0) { 
                        setErrorEditIngredients (true);
                    }
                    else setErrorEditIngredients (false);    
                }) 
            }  
            if (groupIngredientEditDeleteBtn)
            {       
                Array.from(groupIngredientEditDeleteBtn).forEach((e, i) => {
                    e.id = `delete-img-ingredient-${i}`;  
                    document.getElementById(`delete-img-ingredient-${i}`).addEventListener('click', function(e) {
                        setDeleteCountIngredient(i);
                    });            
                }) 
            }             
        } 
        setRemoveIngredientValue (false);
        setAddGroupIngredientValue (false);
        setAddGroupValue (false);
        setAddIngredientValue (false);
        if (ingredientArrEdit?.length===0)
        {            
            setErrorIngredients (true);
        }
        else setErrorIngredients (false);


    }, [valueInputIngredients, valueTextareaGroup, valueInputIngredients, valueIngredient, errorIngredientValue, ingredientArrEdit, ingredientsArr, removeIngredientValue, btnAddGroup, groupInput, addGroupValue, addIngredientValue,  btnAddGroup, deleteCountIngredient, changeIngredients1, addGroupIngredientValue, ingredientArrEdit, groupEditIngredgroup, groupEditIngredient, groupIngredientEditDeleteBtn, removeIngredientValue]);     



    useEffect(() => {  
        if (document.getElementById("select-complexity")) 
        {                    
            const select = document.getElementById("select-complexity").getElementsByTagName('option');    
            for (let i = 0; i < select.length; i++) {
                if (parseInt(select[i].value) === parseInt(subTypeComplexity)) {
                    select[i].selected = true;
                }
            }
        }
    }, [typeComplexity])

    useEffect(() => {  
        if (document.getElementById("select-price")) 
        {                    
            const select = document.getElementById("select-price").getElementsByTagName('option');    
            for (let i = 0; i < select.length; i++) {
                if (parseInt(select[i].value) === parseInt(subTypePrice)) {
                    select[i].selected = true;
                }
            }
        }
    }, [typePrice])

    // отслеживание открытия блока ингредиенты
    const handleOpen = () => {
        setIngredBlock (true);
    };

    // отслеживание скрытия блока ингредиенты
    const handleClose = () => {
        setIngredBlock (false);  
    }; 
    
    // отслеживание пустого значения поля группа при клике
    const groupValueChange = (e) => 
        {
            if (EmptyText(e)==="") 
            {
                setErrorGroupValue (false);
            }
            else setErrorGroupValue (true);
            setValueGroup(e); 
    }

    // отслеживание пустого значения поля ингредиент при клике
    const ingredientValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorIngredientValue (false);
        }
        else setErrorIngredientValue (true);
        setValueIngredient(e); 
    }   
    
    // отслеживание пустого значения поля группа input
    const groupInputGroupValueChange = (e, value) => 
        {                          
            Array.from(ingredientArr).forEach((el, i) => {
                const value = replaceValue(e.target.value);
                if (el.id===e.target.id) 
                {
                    if (EmptyText(e.target.value)==="") 
                    {
                        setErrorIngredientValue (false);                            
                        ingredientArrEdit[i] = `{*type*:*группа*, *value*: **}`;
                    }
                    else
                    {
                        setErrorIngredientValue (true);  
                        ingredientArrEdit[i] = `{*type*:*группа*, *value*: *${value}*}`;
                    }
                }         
            }) 
        setValueInputIngredients(e.target.value);            
    }

    // отслеживание пустого значения поля ингредиент input
    const groupTextareaIngredValueChange = (e, value) => 
        {
                Array.from(ingredientArr).forEach((el, i) => { 
                    const value = replaceValue(e.target.value);
                    if (el.id===e.target.id) 
                    {
                        if (EmptyText(e.target.value)==="") 
                        {
                            setErrorIngredientValue (false);                            
                            ingredientArrEdit[i] = `{*type*:*ингредиент*, *value*: **}`;
                        }
                        else
                        {
                            setErrorIngredientValue (true);  
                            ingredientArrEdit[i] = `{*type*:*ингредиент*, *value*: *${value}*}`;
                        }
                    }         
                })  
            setValueTextareaGroup(e.target.value);          
    } 

    // удаление ингредиента
    const removeIngredient = (e) =>{
        setRemoveIngredientValue (true);
        ingredientArrEdit.splice(deleteCountIngredient, 1);
    }

    // добавление группы
    const addGroup = (e) => {      
        setAddGroupValue (true);
        const value = replaceValue (valueGroup);
        let arrGroupValue = `{*type*:*группа*, *value*: *${value}*}`;
        ingredientArrEdit.push (arrGroupValue);
        document.getElementById('groupInput').value="";
        setErrorGroupValue (false);
    }

    // добавление ингредиента
    const addIngredient = (e) =>{
        setAddIngredientValue (true);
        const value = replaceValue (valueIngredient);
        let arrIngredientValue = `{*type*:*ингредиент*, *value*: *${value}*}`;
        ingredientArrEdit.push (arrIngredientValue);       
        document.getElementById('ingredientInput').value=""
        setErrorIngredientValue (false);
    }

    // сохранение отредактированного приготовления
    const saveCook = (e) => {       
        if (groupCookArr && groupCookArr.length>0) {
            const arrCook = [];
            let arrCookValue = "";
            Array.from (groupCookArr).forEach((el, i, arr) => { 
                if (el.tagName==="INPUT") 
                {
                    if (EmptyText(el.value)!=="")
                    {
                        arrCookValue = `{*type*:*шаг*, *value*: *${EmptyText(el.value)}*}`
                    }                    
                }
                if (el.tagName==="TEXTAREA") 
                {
                    if (EmptyText(el.value)!=="")
                    {
                        arrCookValue = `{*type*:*приготовление*, *value*: *${EmptyText(el.value)}*}`
                    }
                }
                if (el.tagName==="IMG") 
                {
                    let val=el.getAttribute('src');
                    let addImg = val.substring(val.lastIndexOf('/')+1,val.length);  
                    arrCookValue = `{*type*:*рисунок*, *value*: *${addImg}*}`
                }
                arrCook.push (arrCookValue);
                setCookArr(arrCook);
                setCookArrEdit(arrCook);
            });     
        }
    }

    // сохранение отредактированных ингредиентов
    const saveIngredient= (e) => {            
        if (ingredientArr && ingredientArr.length>0) {
            const ingredients = [];
            let arrIngredientValue = "";
            Array.from (ingredientArr).forEach((el, i, arr) => { 
                const value = replaceValue (el.value);
                if (el.tagName==="INPUT") 
                    {
                        if (EmptyText(el.value)!=="")
                        {
                            arrIngredientValue = `{*type*:*группа*, *value*: *${value}*}`;
                        }
                    }
                    if (el.tagName==="TEXTAREA") 
                    {
                        if (EmptyText(el.value)!=="")
                        {
                            arrIngredientValue = `{*type*:*ингредиент*, *value*: *${value}*}`;
                        }
                    }
                    ingredients.push (arrIngredientValue);
                    setIngredientsArr (ingredients);
                    setIngredientArrEdit(ingredients);
            });     
        }
    }

    // сохранение отредактированных ссылок
    const saveLinks= (e) => {  
        const arrLinks =[];       

            let arrLinksValue = "";
            if (linkLiCollection&&linkLiCollection.length>0)
                {
                    Array.from(linkLiCollection).forEach((el, i, arr) => {                         
                       
                        let a = document.getElementById(`linksA-${i}`);   
                        const valueEl = replaceValue (el.textContent);
                        const valueA = replaceValue (a.textContent);
                        if (EmptyText(a.textContent)!==""&&EmptyText(el.textContent)!=="")
                        {
                            arrLinksValue = `{*name*:*${valueEl}*, *link*: *${valueA}*}`;       
                            arrLinks.push (arrLinksValue);
                        }
                   });               
                }

        setLinksArr(arrLinks);   
    }

    // сохранение отредактированных ингредиентов
    const saveIngredientOld= (e) => {            
        recipe.ingredients=arrI.join("")
        setIngredientsOld(arrI.join(""))
    }

    // сохранение отредактированного приготовления
    const saveCookingOld= (e) => {            
        recipe.cooking=arrC.join("")
        recipe.cook=arrC;
        setCookOld([])
        setCookingOld(arrC.join(""))
        recipe.cook_arr = [];
    }

    const removeIngredientOld = ((index) => {
        setArrI([...arrI.slice(0, index), ...arrI.slice(index + 1)]);
    });
        
    const removeCookingOld = ((index) => {
        setArrC([...arrC.slice(0, index), ...arrC.slice(index + 1)]);
        setArrC1([...arrC1.slice(0, index), ...arrC1.slice(index + 1)])
    });

    useEffect(() => {
        setIngredientsOld (arrI.join(""));
    }, [arrI]);

    useEffect(() => {
        setCooking (arrC.join(""));
        setCook(JSON.stringify(arrC1));
    }, [arrC1]);
       
    const addIngredients = arrI.map((element, index) => {     
        return <div key={index}>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}}  onDoubleClick={() => removeIngredientOld(index)}></span>        
        </div>
    });
    
    let addCooking = arrC.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeCookingOld(index)}></span>        
        </>
    });         

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
}, [changeLinks,linkAdd, link, linkCollection, linkLiCollection, linkText, linkACollection, linkBtnCollection]);    

const linkName  = (e)  => {
    setLink(EmptyText(e.target.value));
}

const linkValue  = (e)  => {
    setLinkText(EmptyText(e.target.value));
}

const changeTitle = (e) => {
    const title = EmptyText (e)
    if (title==="")
    {
        setErrorTitle (true);
    }
    else setErrorTitle (false);
    if (title.length>80) 
    {
        setErrorTitleLength (true);
    }
    else setErrorTitleLength (false);
    setTitle(title);
}

    // время приготовления в часах
    const hoursValue = (e) => {
        if (Number.isInteger(+e.target.value))
        {
            setErrorTime((prev) => ({ ...prev, hourNumber: true }));    
            document.getElementById("hours-edit").placeholder = Math.abs(e.target.value);
            setHours(Math.abs(e.target.value));
        }
        else {
            setErrorTime((prev) => ({ ...prev, hourNumber: false }));  
            document.getElementById("hours-edit").placeholder = 0;  
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
            document.getElementById("minutes-edit").placeholder = Math.abs(e.target.value);
            setMinutes(e.target.value);
        }
        else {
            setErrorTime((prev) => ({ ...prev, minuteNumber: false }));  
            document.getElementById("minutes-edit").placeholder = 0;  
        }
        if (e.target.value>59)
        {
            setErrorTime((prev) => ({ ...prev, minuteLength: false })); 
        }
        else setErrorTime((prev) => ({ ...prev, minuteLength: true })); 
    }

    return (
    <div>  
        <HeadMetaTags
            content="noindex" 
        />   
        <Navbar/>  
        <div>
            {(auth.auth&&!recipe)  && 
                <div className='text-center pd-t-40'>
                    <h1>Доступ запрещен</h1>
                    <div className='registrationLink pd-b-20'>
                        <p>Для правки рецепта требуется <a href="/auth/login" alt="авторизация Vseresepty.ru">авторство рецепта.</a></p>
                        <BackButton/>  
                        
                    </div>
                    <img src="/img/36.gif" className='h-100' />
                </div>
            }
            {(!auth.auth)  && 
                <div className='text-center pd-t-40'>
                    <h1>Доступ запрещен</h1>
                    <div className='registrationLink pd-b-20'>
                        <p>Для правки рецепта требуется <a href="/auth/login" alt="авторизация Vseresepty.ru">авторизация и авторство рецепта.</a></p>
                        <BackButton/>                          
                    </div>
                    <img src="/img/36.gif" className='h-100' />
                </div>
            }
            {auth.auth&&recipe &&   
            <div>  
                <div className='contentRecipe'>  
                    <div className='editRecipes'>                
                        <div>
                            <img className='mainImgAva' src='/icons/icon_change.png' /><h1 className='pd-l-20'>Редактировать рецепт</h1>
                            <p>Измените или дополните рецепт, сохраните когда внесете необходимые изменения.</p>  
                            <div className='addRecipeHeader'>
                                <h2>Название блюда</h2>
                                <div className='pd-b-10'>
                                    <input type="text" name="title" placeholder={recipe?.name} onChange={(e) => { changeTitle(e.target.value)}} />                                
                                    <div className='error pd-t-10'>
                                        {errorTitle===true && <div className='error pd-t-5'>Заполните название.</div>}
                                        {errorTitleLength && <div className='error pd-t-5'>Название не должно быть больше 80 символов.</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='addRecipeNote'>
                                <h2>Краткое описание или особенности</h2>     
                                <textarea type="text" name="title" placeholder={recipe.note} onChange={(e) => setNote(e.target.value)} />                      
                            </div>
                                <div>                                
                                    <h2>Фото рецепта</h2>   
                                        {mainImg&&cookArr===null &&
                                            <AddImage btnClass="buttonTransparentBorder mr-b-10" imgClass="imgMainClass" clickBtn={clickMainImg} btnCropId="btnCropMainImg" pathToSave="recipe_main_img" defaultImage={`/upload/recipe_main_img/${mainImg}`} canvasId="mainImageCanvas" imgId="mainImage"/>                                                        
                                        }  
                                        
                                        {mainImg&&cookArr?.length>0 &&
                                            <AddImage btnClass="buttonTransparentBorder mr-b-10" imgClass="imgMainClass" clickBtn={clickMainImg} btnCropId="btnCropMainImg" pathToSave="https://storage.yandexcloud.net/vseresepty" defaultImage={`https://storage.yandexcloud.net/vseresepty/${mainImg}`} canvasId="mainImageCanvas" imgId="mainImage"/>                                                        
                                        }    
                                </div> 
                                <div className='flex-block'>
                                    <div>
                                        <h2 className='f-s-20 pd-l-0 '>Ингредиенты:</h2>   
                                    </div>                                                                                                                         
                                    {!ingredBlock &&
                                        <div>
                                            <span className='icon-block'>                                                 
                                                <img onClick = {handleOpen} className='img_main pd-t-50' src="/icons/icon-close-block.png" alt=""/>                       
                                            </span>                                                          
                                        </div>
                                    }
                                    {ingredBlock &&
                                        <div>
                                            <span className='icon-block'>                                                 
                                                <img onClick = {handleClose} className='img_main pd-t-50' src="/icons/icon-open-block.png" alt=""/>                       
                                            </span>                                                     
                                        </div>
                                    }                                              
                                </div>                               
 
                                {/* ингредиенты из новой базы */}
                                {ingredientsArr&&ingredBlock&&ingredientsArr?.length>0 &&    
                                    <div>                                                  
                                        <div className='editIngredients'>                                            
                                            {ingredientsArr&&ingredBlock&&changeIngredients1===false &&                                 
                                                ingredientsArr.map((v, i, arr) => {
                                                    let str = v.replace(/\*/g, '"');
                                                    let obj = JSON.parse('{"obj":[' + str + ']}');
                                                    return (
                                                        <div key={`ingredient`+i}>
                                                            {obj.obj[0]?.type==='группа' &&
                                                                <h3 className='pd-l-15 pd-t-20 pd-r-15 pd-b-15'>{`${obj.obj[0].value}`}</h3>
                                                            }
                                                            {obj.obj[0]?.type==='ингредиент' &&
                                                                <li className='pd-l-15 pd-t-10 pd-r-15 pd-b-10'>{`${obj.obj[0].value}`}</li>                                            
                                                            }
                                                        </div>                                    
                                                    )
                                                })
                                            }                                                                                                           
                                        </div> 
                                    </div>                                                                                                     
                                }  
                                    {/* ингредиенты из новой базы */}
                                    {ingredientsArr&&ingredBlock&&ingredientsArr?.length>0&&changeIngredients1===false &&
                                        <div className='buttonWhite block-right'>                                    
                                            <button className='mr-t-20 mr-b-15' onClick={() => 
                                            setChangeIngredients1(true)}>ИЗМЕНИТЬ ИНГРЕДИЕНТЫ</button>                                         
                                        </div> 
                                    }

                                    {/* правка ингредиентов из новой базы */}
                                    {ingredientArrEdit&&ingredBlock&&ingredientsArr?.length>0&&changeIngredients1===true &&
                                        <> 
                                        <h3 className='pd-b-20 pd-t-5 text-orange'>Правка ингредиентов</h3>
                                        <div className='editIngredients pd-t-40 pd-b-40 pd-l-20 pd-r-20'>                                        
                                        {ingredientArrEdit&&ingredBlock&&changeIngredients1===true &&                                 
                                            ingredientArrEdit.map((v, i, arr) => {                                                
                                                let str = v.replace(/\*/g, '"');
                                                let obj = JSON.parse('{"obj":[' + str + ']}');                                              
                                                return (
                                                    <div key={`ingredient`+i}>
                                                        {obj.obj[0]?.type==='группа' &&
                                                        <div className='flex-start edit-step-cook'>
                                                            <div className='f-s-16 width-95'>Группа:</div>                                                          
                                                            <div className='width-90-percent'>                                                                                                                                                                                     
                                                                <input onChange={(e)=>{groupInputGroupValueChange(e, obj.obj[0].value); setErrorGroupValue (false)}} minLength="1" type='text' className='ingredient-arr edit-group pd-r-15 width-93-percent' placeholder={`${obj.obj[0].value}`} />
                                                                {obj.obj[0].value==="" &&<div className='error error-ingredients'>Поле не должно быть пустым.</div>}
                                                            </div>
                                                            <div className='pd-t-5'>
                                                                <button onClick={((e)=>removeIngredient(e))} className='cursor-pointer-edit-ingredient'><img src="/icons/icon-remove-red.png" className='img-delete-ingredient'/></button> 
                                                            </div>                                                           
                                                        </div>
                                                        }
                                                        {obj.obj[0]?.type==='ингредиент' &&
                                                            <div className='flex-start edit-cook'>
                                                                <div className='f-s-12 width-95'>Ингредиент:</div> 
                                                                <div className='width-90-percent'>
                                                                   <textarea onChange={(e)=>{groupTextareaIngredValueChange(e, obj.obj[0].value); setErrorIngredientValue (false)}} minLength="4" className='ingredient-arr edit-ingredient-area pd-t-20 pd-r-15 mr-r-5 width-93-percent' placeholder={`${obj.obj[0].value}`}/>
                                                                   {obj.obj[0].value==="" &&<div className='error error-ingredients'>Поле не должно быть пустым.</div>} 
                                                                </div>
                                                                <div className='pd-t-5'><button onClick={((e)=>removeIngredient(e, obj.obj[0].value))} className='cursor-pointer-edit-ingredient'>
                                                                    <img src="/icons/icon-remove-red.png" className='img-delete-ingredient'/></button> 
                                                                </div>
                                                            </div>                                            
                                                        }
                                                    </div>                                    
                                                )
                                            })
                                        }
                                        </div>                                          
                                        </>
                                    }                                 
                                {/* правка ингредиентов из новой базы */}
                                    {ingredientsArr&&ingredientsArr.length>=0&&ingredBlock&&changeIngredients1===true &&
                                        <div>                                         
                                            <div className='addRecipeCook pd-b-40'>  
                                                <div className='ingredientsGroup mr-t-30'>  
                                                    <h3 className='h3-raleway-bold pd-b-20 pd-t-20 f-s-20'>Добавить:</h3>
                                                    <p className='mr-b-5'>ГРУППА:</p> 
                                                    <input id="groupInput" onChange={event => {groupValueChange(event.target.value); }} />                                 
                                                    {errorGroupValue &&<div className='buttonWhite'>                                                                      
                                                        <button id="btnAddGroup" className='mr-t-10' onClick={event => {addGroup(event)}}>
                                                            ДОБАВИТЬ ГРУППУ
                                                        </button>                                        
                                                    </div>}
                                                </div>                                     
                                                <div className='ingredientsGroup pd-t-15'> 
                                                    <p className='mr-b-5'>ИНГРЕДИЕНТ:</p> 
                                                    <input id="ingredientInput" onChange={event => ingredientValueChange(event.target.value)} />
                                                    <div className='buttonWhite'>                                    
                                                        {errorIngredientValue &&
                                                        <button id="btnAddIngredient" className='mr-t-10' onClick={event => {addIngredient(event)}}>
                                                            ДОБАВИТЬ ИНГРЕДИЕНТ
                                                        </button>
                                                        }
                                                    </div>
                                                </div>                                                 
                                            </div>  
                                                {errorEditGroupIngredients===true&&errorEditIngredients===true &&                                      
                                                    <div className='error f-s-16'>Заполните пустые поля в разделе ингредиенты, или удалите их.</div>
                                                }                                                                         
                                                {errorIngredients===true &&
                                                    <div className='error f-s-16'>Нет ни одного ингрединета.</div>
                                                }
                                                <div className='flex-start buttonRightWrap pd-t-20'>  
                                                    
                                                    <div id="recipe" className='textDecorationOrange'>                                                                                                                           
                                                        <button onClick={() => setChangeIngredients1(false)} className='buttonTransparent mr-t-15'><span>ОТМЕНИТЬ</span></button>                                                                                                             
                                                    </div> 
                                                    {errorEditGroupIngredients===false&&errorEditIngredients===false&&ingredientArrEdit?.length>0 &&
                                                    <div className='pd-b-20 mr-t-20 mrb-15' id="recipe">                                                                                                                                 
                                                        <button onClick={() => {setChangeIngredients1(false); saveIngredient()}} className='buttonOrangeSm'>Сохранить ингредиенты</button>                                                                                                             
                                                    </div>}   
                                                </div> 
                                        </div> 
                                    }    

                                {/* ингредиенты из старой базы */}
                                {recipe.ingredients!=="null"&&ingredBlock&&recipe.ingredients?.length>0&&recipe.ingredients&&changeIngredients1===false &&                                 
                                <div>                                      
                                    {recipe.ingredients!=="null" && <>
                                    {!changeIngredients && <>
                                        <h3 className='h3-raleway-bold pd-b-15 f-s-18 text-red'>Старая база! Лучше править напрямую в базе!</h3>
                                        <div className='ingredientsList'>
                                            {recipe.ingredients && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.ingredients)}}></div>}
                                        </div>
                                        <div className='buttonWhite block-right' >
                                            <button className='mr-t-20 mr-b-15' onClick={() => {setChangeIngredients1(true); }}>
                                                ИЗМЕНИТЬ ИНГРЕДИЕНТЫ
                                            </button>
                                        </div></>}
                                    </>
                                    }
                                </div>}  

                                {/* правка ингредиентов из старой базы */}
                                    {recipe.ingredients!=="null"&&ingredBlock&&recipe.ingredients?.length>0&&recipe.ingredients&&changeIngredients1===true &&
                                        <>                                         
                                        <h3 className='pd-b-20 pd-t-5 text-orange'>Правка</h3>
                                        <div className='editIngredient'> 
                                        <>
                                        <p>Введите по одному ингредиенту в строке, указывая количество. Для удаления или редактирования ингредиента дважды кликните на нем.</p>                                             
                                        <div className='recipeAdd' >
                                            {addIngredients}                    
                                        </div> 

                                        <div className='addRecipeIngredients'>  
                                            <div className='ingredientsGroup'>
                                                <div className='buttonWhite ingredientsGroupP'>    
                                                    <p className='mr-b-5 mr-t-30'>ГРУППА:</p>
                                                    <input className='mr-b-15' value={valueTitleIngredient} onChange={event => setValueTitleIngredient(event.target.value)} placeholder="Например: Тесто"/>
                                                    <button onClick={event => {setArrI([...arrI, `<h3>${valueTitleIngredient}</h3>`]);}}>ДОБАВИТЬ ГРУППУ</button>
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
                                        </div>                                        
                                        <div className='flex-start buttonRightWrap pd-t-20'>                                       
                                            <div id="recipe" className='textDecorationOrange'>                                                                                                                           
                                                <button onClick={() => setChangeIngredients1(false)} className='buttonTransparent mr-t-15'><span>ОТМЕНИТЬ</span></button>                                                                                                             
                                            </div>  
                                            <div className='pd-b-20 mr-t-20 mrb-15' id="recipe">                                                                                                                                 
                                                <button onClick={() => {setChangeIngredients1(false); saveIngredientOld()}} className='buttonOrangeSm'>Сохранить ингредиенты</button>                                                                                                             
                                                </div>  
                                            </div>                                                                                  
                                        </>
                                    }   

                                {/* раздел ссылки */}
                                {linksArr&&linksArr?.length>0&&!changeLinks&&ingredBlock && 
                                <>
                                    <div className='pd-b-40 pd-l-30 linkWrap '>
                                        <h3 className='pd-b-20 pd-l-30 pd-t-30'>Ссылки:</h3>  
                                            <div className='pd-b-40 editIngredients'>
                                                {linksArr.map((v, i, arr) => {
                                                let str = v.replace(/\*/g, '"');
                                                let obj = JSON.parse(str);
                                                return (
                                                    <div className='pd-l-30' key={`link`+i}>                                                            
                                                        <a href={obj.link}>{obj.name}</a>
                                                    </div>                                    
                                                )})} 
                                            </div>
                                        </div>                                    
                                        <div className='buttonWhite block-right'>                                    
                                            <button className='mr-t-20 mr-b-15' onClick={() => 
                                            setChangeLinks(true)}>ИЗМЕНИТЬ ССЫЛКИ</button>                                         
                                        </div>                                 
                                    </>
                                } 

                                {linksArr&&linksArr?.length===0&&!changeLinks&&ingredBlock && 
                                <>                                  
                                    <div className='buttonWhite block-right'>                                    
                                        <button className='mr-t-20 mr-b-15' onClick={() => 
                                        setChangeLinks(true)}>ИЗМЕНИТЬ ССЫЛКИ</button>                                         
                                    </div>                                 
                                </>}             

                                {/* правка раздела ссылки */}
                                    {linksArr&&changeLinks && 
                                        <>
                                            <div id='links' className='linkWrap'>                            
                                            </div> 
                                            <h3 className='pd-b-20 pd-t-5 text-orange'>Правка ссылок</h3>
                                            <div className='buttonWhite linkButtonWrap border-bottom-light-grey'> 
                                                <p>Введите в верхнее поле название ссылки, в поле ниже значение ссылки.</p>
                                                <input type='text' onChange={event => linkName(event)} placeholder="Например: крем"/>
                                                <input className='mr-t-10' type='text' onChange={event => linkValue(event)} placeholder="Например: /recipes/.../..."/>
                                                {linkText!==""&&link!=="" &&
                                                <button className='mr-t-15' onClick={addLink}>                                                
                                                    ДОБАВИТЬ ССЫЛКУ
                                                </button>     
                                                }                                                                 
                                            </div>                                                 
                                            <div className='flex-start buttonRightWrap pd-t-20'>                                       
                                                <div id="recipe" className='textDecorationOrange'>                                                                                                                           
                                                    <button onClick={() => setChangeLinks(false)} className='buttonTransparent mr-t-15'><span>ОТМЕНИТЬ</span></button>                                                                                                             
                                                </div> 
                                                 
                                                <div className='pd-b-20 mr-t-20 mr-b-15' id="recipe">                                                                                                                                 
                                                    <button onClick={() => {setChangeLinks(false); saveLinks()}} className='buttonOrangeSm'>Сохранить ссылки</button>                                                                                                             
                                                </div>  
                                            </div> 
                                </>}                                                        
                                <div className='border-bottom-light-grey'></div>                               
                                <div className='cooking'>                     
                                    <div className='flex-block'>
                                        <div><h2>Приготовление:</h2></div>
                                            {!recipeBlock &&                                                 
                                            <div>
                                                <span className='icon-block'>                                                 
                                                    <img onClick = {handleOpenRecipe} className='img_main pd-t-50' src="/icons/icon-close-block.png" alt=""/>                       
                                                </span>                                                          
                                            </div>
                                            }                                                                                        
                                            {recipeBlock &&
                                                <div>
                                                    <span className='icon-block'>                                                 
                                                        <img onClick = {handleCloseRecipe} className='img_main pd-t-50' src="/icons/icon-open-block.png" alt=""/>                       
                                                    </span>                                                     
                                                </div>
                                            }  
                                    </div>

                                    {/* приготовление из новой базы */}
                                    {recipeBlock&&cookArr?.length>0&&changeCooking1===true && <>
                                        <div>
                                        {cookArr&&recipeBlock &&                                 
                                            cookArr.map((v, i, arr) => {
                                                let str = v.replace(/\*/g, '"');
                                                let obj = JSON.parse('{"obj":[' + str + ']}');
                                                return (
                                                    <div  key={`cook`+i}>
                                                        {obj.obj[0]?.type==='шаг' &&
                                                            <h3 className='pd-t-20 pd-r-15'>{`${obj.obj[0].value}`}</h3>
                                                        }
                                                        {obj.obj[0]?.type==='приготовление' &&
                                                            <p className='pd-t-10 pd-r-15 pd-b-10'>{`${obj.obj[0].value}`}</p>                                            
                                                        }
                                                        {obj.obj[0]?.type==='рисунок' &&
                                                            <img src={`https://storage.yandexcloud.net/vseresepty/${obj.obj[0].value}`} />                                            
                                                        }
                                                    </div>                                    
                                                )
                                            })
                                        }                                                                       
                                        </div>  
                                        <div className='buttonWhite block-right'>
                                            <button className='mr-b-15' onClick={() => { setChangeCooking1(false)}}>
                                                ИЗМЕНИТЬ ПРИГОТОВЛЕНИЕ
                                            </button> 
                                        </div> 
                                        </>    
                                    }

                                    {/* правка приготовление из новой базы */}
                                    {recipeBlock&&cookArrEdit?.length>=0&&changeCooking1===false && 
                                        <>   
                                        <h3 className='pd-b-15 text-orange f-s-22'>Правка</h3>
                                        {((cookArrEdit||cookArrEdit?.length===0)&&recipeBlock) && 
                                        <div className='editCook pd-t-40 pd-b-40 pd-l-20 pd-r-20'> 
                                            {((cookArrEdit||cookArrEdit?.length===0)&&recipeBlock) &&                                                                          
                                                cookArrEdit.map((v, i, arr) => {
                                                let str = v.replace(/\*/g, '"');
                                                let obj = JSON.parse('{"obj":[' + str + ']}');                                                                                   
                                                return (                                                    
                                                    <div key={`cook`+i}>
                                                        {obj.obj[0]?.type==='шаг'&&
                                                        <div className='flex-start edit-step-cook'>                                                            
                                                            <div className='f-s-16 width-80'>Шаг:</div> 
                                                            <div className='width-93-percent'>                                                               
                                                                <input onChange={(e)=>{stepInputValueChange(e, obj.obj[0].value)}} minLength="1" type='text' className='cook-arr edit-step pd-r-15 width-93-percent' placeholder={`${obj.obj[0].value}`} />
                                                                {obj.obj[0].value==="" &&<div className='error error-cook'>Поле не должно быть пустым.</div>}
                                                            </div>
                                                            <div className='pd-t-5'>
                                                                <button onClick={((e)=>removeCook(e))} className='cursor-pointer-edit'><img src="/icons/icon-remove-red.png" className='img-delete'/></button> 
                                                            </div>                                                           
                                                        </div>
                                                        }
                                                        {obj.obj[0]?.type==='приготовление' &&
                                                            <div className='flex-start edit-cook'>
                                                                <div className='f-s-12 width-80'>Действие:</div> 
                                                                <div className='width-93-percent'>
                                                                    <textarea onChange={(e)=>{cookTextareaValueChange(e, obj.obj[0].value)}} minLength="4" className='cook-arr edit-cook-area pd-t-20 pd-r-15 mr-r-5 width-93-percent' placeholder={`${obj.obj[0].value}`}/>
                                                                    {obj.obj[0].value==="" &&<div className='error error-cook'>Поле не должно быть пустым.</div>}
                                                                 </div>                                                                
                                                                <div className='pd-t-5'><button onClick={((e)=>removeCook(e))} className='cursor-pointer-edit'>
                                                                    <img src="/icons/icon-remove-red.png" className='img-delete'/></button> 
                                                                </div>                                                               
                                                            </div>                                            
                                                        } 
                                                       
                                                        {obj.obj[0]?.type==='рисунок' &&                                                        
                                                            <div className='flex-start edit-cook-img'>                                                                   
                                                            <AddImage btnClass="buttonTransparentBorder mr-b-10 btnAddImg" imgClass="cook-arr edit-img" clickBtn={((e)=>clickCookImg(e))} btnCropId={`btnCropCookImg-${i}`} pathToSave="https://storage.yandexcloud.net/vseresepty" defaultImage={`https://storage.yandexcloud.net/vseresepty/${obj.obj[0].value}`} canvasId={`cookImageCanvas-${i}`} imgId={`cookImage-${i}`} /> 
                                                            <div className='pd-t-5 mr-l-15'>
                                                                <button onClick={((e)=>removeCook(e))} className='cursor-pointer-edit'>
                                                                    <img src="/icons/icon-remove-red.png" className='img-delete'/>
                                                                </button> 
                                                            </div>   
                                                            </div>                                          
                                                        }
                                                    </div>                                    
                                                )
                                            })
                                        }  
                                        </div> }
                                            <div className='addRecipeCook pd-b-40'>  
                                                <div className='ingredientsGroup mr-t-30'>  
                                                    <h3 className='h3-raleway-bold pd-t-20 pd-b-20 f-s-20'>Добавить:</h3>
                                                    <p className='mr-b-5'>ШАГ:</p> 
                                                    <input id="stepInput"  onChange={event => stepValueChange(event.target.value)} />                                 
                                                    {errorStepValue &&<div className='buttonWhite'>                                                                      
                                                        <button id="btnAddStep" className='mr-t-10' onClick={event => {addStepCook(event)}}>
                                                            ДОБАВИТЬ ШАГ
                                                        </button>                                        
                                                    </div>}
                                                </div>                                     
                                                <div className='ingredientsGroup pd-t-15'> 
                                                    <p className='mr-b-5'>ДЕЙСТВИЕ:</p> 
                                                    <input id="cookInput" onChange={event => cookValueChange(event.target.value)}/>
                                                    <div className='buttonWhite'>                                    
                                                        {errorCookValue &&
                                                        <button id="btnAddCook" className='mr-t-10' onClick={event => {addCook(event)}}>
                                                            ДОБАВИТЬ ДЕЙСТВИЕ
                                                        </button>
                                                        }
                                                    </div>
                                                </div>                                                 
                                            </div>
                                            <div className='formAddImage'>
                                                <AddImage btnId="btn-cook" btnClass="buttonTransparentBorder btnAddImgCook" imgClass="edit-img" clickBtn={((e)=>clickAddCookImg(e))} btnCropId="btnCropCook" pathToSave="https://storage.yandexcloud.net/vseresepty" defaultImage='/icons/icon_avatar.png' canvasId="addCookCanvas" imgId="addCookImg" /> 
                                            </div>
                                            {!errorCookImg && <div className='error'>Выберите фото</div>} 
                                            <div className='uploadImage'>
                                                <button className='buttonWhite' id="add-cook-btn" onClick={saveCookImg}>ДОБАВИТЬ ФОТО</button>
                                            </div>        
                                            {errorEditCook===true&&errorEditStepCook===true &&
                                                <div className='error pd-t-40 f-s-16'>                                                                                                                                 
                                                   Заполните пустые поля в разделе приготовление, или удалите их.
                                                </div> 
                                            }    
                                            {errorCook===true &&
                                                <div className='error pd-t-30 f-s-16'>Нет ни одного этапа приготовления.</div>
                                            }                                
                                            <div className='flex-start buttonRightWrap pd-t-40 pd-b-10'>                                       
                                                <div id="recipe" className='textDecorationOrange'>                                                                                                                           
                                                    <button onClick={() => setChangeCooking1(true)} className='buttonTransparent mr-t-15'><span>ОТМЕНИТЬ</span></button>                                                                                                             
                                                </div>  
                                                {errorEditCook===false&&errorEditStepCook===false&&cookArrEdit.length>0 &&
                                                    <div className='pd-b-20 mr-t-20 mrb-15' id="recipe">                                                                                                                                 
                                                        <button onClick={() => {setChangeCooking1(true); saveCook()}} className='buttonOrangeSm'>Сохранить приготовление</button>                                                                                                             
                                                    </div> 
                                                }                                                 
                                            </div> 
                                        </> 
                                    } 

                                    {/* приготовление из старой базы */}
                                    <div id="recipe" className='buttonWhite'>
                                        {recipe.cooking&&recipeBlock&&changeCooking===true&&(recipe?.cook_arr==="null"||recipe?.cook_arr===null) && 
                                            <>
                                                <h3 className='h3-raleway-bold pd-b-15 f-s-18 text-red'>Старая база! Лучше править напрямую в базе!</h3>
                                                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe.cooking)}}></div>                                            
                                            </>                                
                                        }
                                        {recipeBlock&&changeCooking===true&&cookArr1&&cookArr1.length>0 &&
                                            <div className='buttonWhite block-right'>
                                                <button className='mr-b-15' onClick={() => setChangeCooking(false)}>
                                                    ИЗМЕНИТЬ ПРИГОТОВЛЕНИЕ
                                                </button>
                                            </div>
                                        }
                                    </div>

                                    {/* правка приготовление из старой базы */}
                                    {recipeBlock&&changeCooking===false&&cookArr1&&cookArr1.length>0 &&                                 
                                    <>
                                    <p>Опишите как готовить ваше блюдо по шагам, добавляя имеющиеся фото к каждому шагу. Для удаления контента дважды кликните на нем в шаблоне. В шаблоне будет примерно отображено как ваш рецепт будет отображаться на сайте.</p>                 
                                    <div className='recipeAdd'>
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
                                                <div className='addImg'>
                                                    {!additionalImg && <div className='addImg'><img src="/icons/icon_image.png" alt="food"/></div>}
                                                    {additionalImg && <img src={`https://storage.yandexcloud.net/vseresepty/${additionalImg}`} alt={recipe?.name}/>}
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
                                        <div className='flex-start buttonRightWrap pd-t-20'>         
                                              
                                            <div>Заполните пустые поля в разделе приготовление или удалите их.</div>
                                            <div id="recipe" className='textDecorationOrange'>                                                                                                                           
                                                <button onClick={() => setChangeCooking(true)} className='buttonTransparent mr-t-15'><span>ОТМЕНИТЬ</span></button>                                                                                                             
                                            </div>  
                                            
                                            <div className='pd-b-20 mr-t-20 mrb-15' id="recipe">                                                                                                                                 
                                                <button onClick={() => {setChangeCooking(true); saveCookingOld()}} className='buttonOrangeSm'>Сохранить ингредиенты</button>                                                                                                             
                                            </div>
                                            </div>  
                                        </> 
                                        }
                                </div>
                                <div className='border-bottom-light-grey'></div>
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
                                                <p>Консервация</p>
                                            </div> 
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {gluten===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setGluten(1); else setGluten(0)}} />}
                                                        {gluten!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setGluten(1); else setGluten(0)}} />}                                                      
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
                                            <div className='addCathegoryBlock'>
                                                <div className='switch'>
                                                    <label className="switch">
                                                        {lactose===1 && <input checked="checked" type="checkbox" onChange={event => {if (event.target.checked) setLactose(1); else setLactose(0)}} />}
                                                        {lactose!==1 && <input type="checkbox" onChange={event => {if (event.target.checked) setLactose(1); else setLactose(0)}} />}

                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <p>Безлактозное</p>
                                            </div>  
                                        </div>
                                    </div>
                                </div> 
                                <div className="pd-t-40 pd-b-20 border-top-light-grey">
                                        <input type="radio" checked={typeKitchen === "kitchenType"} name="kitchenType" value="kitchenType" id="kitchenType" className="custom-checkbox" onChange={(e) => {setTypeKitchen(e.target.value)}}/>
                                        <label htmlFor="kitchenType">Тип Кухни</label>                        
                                    </div>  
                                    {typeKitchen==="kitchenType" && 
                                        <div className='selectRecipe'>
                                            <select id="select" onChange={(e) => setSubTypeKitchen(e.target.value)}> 
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
                                    <div className="pd-t-40 pd-b-20 addCathegoryBorder">
                                        <input type="radio" checked={typeComplexity === "complexityType"} name="complexityType" value="complexityType" id="complexityType" className="custom-checkbox" 
                                        onChange={(e) => {setTypeComplexity(e.target.value);}}
                                        />
                                        <label htmlFor="complexityType">Сложность приготовления</label>                        
                                    </div> 
                                    
                                    {typeComplexity==="complexityType" && 
                                        <div className='selectRecipe'>
                                            <select id="select-complexity" onChange={(e) => {
                                                setSubTypeComplexity(e.target.value)                                                
                                            }
                                            }> 
                                                <option value="0">Не выбрано</option>
                                                <option value="1">Простое</option>
                                                <option value="2">Среднее</option> 
                                                <option value="3">Сложное</option> 
                                            </select>
                                        </div>
                                    }

                                    <div className="pd-t-40 pd-b-20 addCathegoryBorder">
                                        <input type="radio" checked={typePrice === "priceType"} name="priceType" value="priceType" id="priceType" className="custom-checkbox" 
                                        onChange={(e) => {setTypePrice(e.target.value);}}
                                        />
                                        <label htmlFor="priceType">Цена</label>                        
                                    </div> 
                                    
                                    {typePrice==="priceType" && 
                                        <div className='selectRecipe'>
                                            <select id="select-price" onChange={(e) => {
                                                setSubTypePrice(e.target.value)                                                
                                            }
                                            }> 
                                                <option value="0">Не выбрано</option>
                                                <option value="1">Дешевое</option>
                                                <option value="2">Среднее</option> 
                                                <option value="3">Дорогое</option> 
                                            </select>
                                        </div>
                                    }

                                    <div className='addCathegoryBorder pd-b-30'> 
                                        <h2>Время приготовления</h2>
                                        <div className='addCathegoryBlock pd-r-10'>  
                                            <div className='inputs-calories'>
                                                <div>
                                                    <label htmlFor="hours-edit">Часы</label><br/>
                                                    <input placeholder="" min="0" max="150" onChange={hoursValue} id="hours-edit" type='number'/>
                                                </div>
                                                <div>
                                                    <label htmlFor="minutes-edit">Минуты</label><br/>
                                                    <input placeholder="" min="0" max="59" onChange={minutesValue} id="minutes-edit" type='number'/>
                                                </div>
                                            </div>
                                        </div>                                        
                                        {(errorTime.hourNumber===false||errorTime.minuteNumber===false) &&                                       
                                            <div className='error pd-t-10'>
                                                Введите целое число
                                            </div>                                      
                                        }   
                                        {!errorTime.hourLength  &&
                                        <>
                                            <div className='error pd-t-10'>
                                                Введите менее 150 часов.
                                            </div>
                                        </>
                                        }
                                        {!errorTime.minuteLength  &&
                                        <>
                                            <div className='error pd-t-10'>
                                                Введите менее 60 минут.
                                            </div>
                                        </>
                                        }                                     
                                    </div> 
                                    <div className='addCathegoryBorder pd-b-3 border-bottom-light-grey'> 
                                        <h2>Энергетическая ценность на 100 грамм</h2>
                                        <div className='addCathegoryBlock pd-r-10 pd-b-30'>  
                                            <div className='inputs-calories'>
                                                <div>
                                                    <label htmlFor="proteins">Белки</label><br/>                                                    
                                                    {recipe.proteins===null &&
                                                        <input placeholder="" onChange={proteinsValue} id="proteins" type='number'/>
                                                    }
                                                    {recipe.proteins!==null &&                                                   
                                                        <input placeholder={parseFloat(recipe.proteins).toFixed(1)} onChange={proteinsValue} id="proteins" type='number'/>
                                                    }
                                                </div>
                                                <div>
                                                    <label htmlFor="fats">Жиры</label><br/>
                                                    {recipe.fats===null &&
                                                        <input placeholder="" onChange={fatsValue} id="fats" type='number'/>
                                                    }   
                                                    {recipe.fats!==null &&
                                                        <input placeholder={parseFloat(recipe.fats).toFixed(1)} onChange={fatsValue} id="fats" type='number'/>
                                                    }  
                                                </div>
                                                <div>
                                                    <label htmlFor="carbohydrates">Углеводы</label><br/>
                                                    {recipe.carbohydrates===null &&
                                                        <input placeholder="" onChange={carbohydratesValue} id="carbohydrates" type='number'/>
                                                    }
                                                    {recipe.carbohydrates!==null &&
                                                        <input placeholder={parseFloat(recipe.carbohydrates).toFixed(1)} onChange={carbohydratesValue} id="carbohydrates" type='number'/>
                                                    }
                                                </div>
                                                <div>
                                                    <label htmlFor="calories">Калории</label><br/>
                                                    {recipe.calories===null &&
                                                        <input placeholder="" onChange={caloriesValue} id="calories" type='number'/>
                                                    }
                                                    {recipe.calories!==null &&
                                                        <input placeholder={parseFloat(recipe.calories).toFixed(1)} onChange={caloriesValue} id="calories" type='number'/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className='pd-t-30'>
                                        {errorTitle===true && 
                                            <div className='error f-s-16'>Заполните название блюда.</div>
                                        }
                                        {errorTitleLength===true && 
                                            <div className='error f-s-16 pd-t-5'>Название блюда не должно превышать 80 символов.</div>
                                        }
                                        {ingredientArrEdit?.length===0 &&
                                            <div className='error f-s-16 pd-t-5'>Заполните ингредиенты.</div>
                                        }
                                        {errorEditGroupIngredients===true&&errorEditIngredients===true &&                                      
                                            <div className='error pd-t-5 f-s-16 '>Заполните пустые поля в разделе ингредиенты, или удалите их.</div>
                                        }                                          
                                        {cookArrEdit?.length===0 &&
                                            <div className='error f-s-16 pd-t-5'>Заполните приготовление.</div>
                                        }
                                        {errorEditCook===true&&errorEditStepCook===true &&                                      
                                            <div className='error pd-t-5 f-s-16 '>Заполните пустые поля в разделе приготовление, или удалите их.</div>
                                        }   
                                        {errorRequest===false &&
                                            <div className='error f-s-16 pd-t-5'>Ошибка запроса.</div>
                                        }                                 
                                    </div>                                    
                                    <div className='buttonRightWrap pd-t-20'>
                                    <button className='buttonTransparent'><span><a href={`/recipes/sort?type=${type}`}>ОТМЕНИТЬ ВСЕ ИЗМЕНЕНИЯ</a></span></button>
                                    
                                    {(errorTitle===false&&errorTitleLength===false&&ingredientArrEdit?.length>0&&errorEditGroupIngredients===false&&errorEditIngredients===false&&cookArrEdit.length>0&&errorEditCook===false&&errorEditStepCook===false&& errorTime.minuteLength===true && errorTime.hourLength===true) && 
                                        <button className='buttonOrange' onClick={handleClick}>Сохранить Рецепт</button>
                                    }
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


