"use client";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState} from 'react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { useAuth } from '../context/context';
import EmptyText from '../services/empty-text';
import { useRouter } from 'next/router';
import AddImage from '../services/cropper/add-image';
import CustomSelect from '../components/select';
import BackButton from '../components/button_back';
import HeadMetaTags from '../components/head';


const AddArticle = () => {
    const auth = useAuth();
    const router = useRouter();  
    const [options, setOptions] = useState([
        {label: "Тенденции", value:"trends" }, 
        {label: "Гурман", value:"gourmet"}, 
        {label: "Эстетика", value:"aesthetics"}, 
        {label: "Лайфхаки", value:"lifehacks"},
        {label: "Декор", value:"decor"}, 
        {label: "Здоровье", value:"health"}, 
        {label: "Пикник", value:"picnic"}, 
        {label: "Состав",value:"compound"},
        {label: "Кухня",value:"kitchen"},
        {label: "Специи", value:"spices"}, 
        {label: "Соусы", value:"sauces"}, 
        {label: "Масло", value:"oil"},  
        {label: "Травы", value:"greens"},
        {label: "Жидкости",value:"liquid"},
        {label: "Намазки",value:"spread"},
        {label: "Заправки", value:"seasoning"},  
        {label: "Средиземноморская кухня", value:"sea_kitchen"}, 
        {label: "Морепродукты",value:"seafood"},
        {label: "Напитки",value:"drinks"},
        {label: "Кофе",value:"coffee"},
        {label: "Романтический завтрак",value:"romantic_breakfast"},
        {label: "Десерт",value:"dessert"},
        {label: "Романтический ужин",value:"romantic_dinner"},
        {label: "Овощные блюда",value:"vegetables"},
        {label: "Мясные блюда",value:"meat"},
        {label: "Экзотическая кухня",value:"exotic"},
        {label: "Необычные блюда",value:"unusual"},
        {label: "Вегетарианство",value:"veget"},
        {label: "Сезонные",value:"season"}
    ]);
    const [title, setTitle] = useState();   // название статьи
    const [sortValue, setSortValue]= useState ({kind: 'all', kindName: 'Любой'});  // список разделов
    const [cooking, setCooking] = useState ("");    // описание статьи
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const [note, setNote] = useState ("");    // краткое описание  
    const [userPublicName,setUserPublicName] = useState("");  
    const [userRole,setUserRole] = useState("");  
    const [errorArr, setErrorArr] = useState (false);    
    const [errorMainImg, setErrorMainImg] = useState (false); 
    const [errorCookImg, setErrorCookImg] = useState (false); 
    const [errorCook, setErrorCook] = useState (true); 
    const [errorСooking, setErrorСooking] = useState (false); 
    const [errorType, setErrorType] = useState (false); 
    const [errorStep, setErrorStep] = useState (false); 
    const [errorCooking, setErrorCooking] = useState (false); 
    const [errorMark, setErrorMark] = useState (true); 
    const [errorEmptyArticle, setErrorEmptyArticle] = useState (false); 
    const [errorCookValue, setErrorCookValue] = useState (false); 
    const [errorMarkValue, setErrorMarkValue] = useState (false); 
    const [errorStepValue, setErrorStepValue] = useState (false); 
    const [arrC, setArrC] = useState([]);
    const [arrC1, setArrC1] = useState([]);
    const [valueCooking, setValueCooking] = useState();   
    const [valueMark, setValueMark] = useState();  
    const [valueTitleCooking, setValueTitleCooking] = useState(); 
    const [currentUser, setCurrentUser] = useState();
    const [mainImage, setMainImage] = useState([]);
    const [cookStepDivCollection, setCookStepDivCollection] = useState();
    const [cookStepHCollection, setCookStepHCollection] = useState();
    const [cookStepInputCollection, setCookStepInputCollection] = useState();
    const [markCollection, setMarkCollection] = useState();
    const [cookCollection, setCookCollection] = useState();        
    const [cookHCollection, setCookHCollection] = useState();
    const [markPCollection, setMarkPCollection] = useState();
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
    const [errorTitleLength, setErrorTitleLength] = useState(false);   // длина названия статьи
    const [errorRequest, setErrorRequest ] = useState(false);
    const [errorEmptyParagraph, setErrorEmptyParagraph] = useState(true); // ошибка пустых значений названий параграфов статьи
    const [errorEmptyText, setErrorEmptyText] = useState(true); // ошибка пустых значений параграфов статьи
    const [errorEmptyMark, setErrorEmptyMark] = useState(true); // ошибка пустых значений списка статьи
  
    useEffect (() =>    
    {   
        auth.authorization();   
        setCurrentUser(auth.currentUser);    
        auth.auth; 
    }, [auth]); 

    // запрос для получения инфо о юзере
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
                setUserRole(data[0].role);                
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

    // отслеживание отсутствия приготовления
    useEffect (( ) => { 
        if (arrC.length>0) {            
            setErrorСooking(true)
         }
        else setErrorСooking(false);     
    }, [arrC]);

    // отслеживание всех ошибок для показа основной кнопки отправить
    
    useEffect (( ) => {       
        if (errorMainTitle && errorMainImg && errorСooking && errorType) {        
            setErrorArr (true)
        }
        else setErrorArr (false);  
    }, [errorMainTitle, errorMainImg, errorСooking, errorType]);      
 
    // массив приготовления для динамического отображения с возможностью удаления
    const addCooking = arrC.map((element, index) => {     
        return <>            
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(element),}} key={element} onDoubleClick={() => removeCooking(index)}></span>        
        </>
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
            setCookHCollection(document.getElementsByClassName('articleLi'));
            setCookInputCollection(document.getElementsByClassName('changeCookInput'));
            setCookWrap(document.getElementById('cookRecipe'));
            setCookValues(document.getElementsByClassName('cookCollection'));
            setErrorStep(document.getElementsByClassName('errorStep'));
            setErrorCook(document.getElementsByClassName('errorCook'));
            setMarkCollection(document.getElementsByClassName('changeMarkInput'));
            setErrorMark(document.getElementsByClassName('errorMark'));
            setMarkPCollection(document.getElementsByClassName('articleMarkLi'));
    }, []);
   
    // динамическое проставление id в блоке статьи
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
        if (errorMark) 
            {
                Array.from(errorMark).forEach((e, i, arr) => {
                e.id = `errorMark-${i}`;
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
                if (cookHCollection.length>0)
                {
                    setErrorEmptyArticle (true);
                }
                else setErrorEmptyArticle (false);
                    Array.from(cookHCollection).forEach((e, i, arr) => {
                    e.id = `cookHCook-${i}`;
                  });
            }   
            if (markPCollection) 
            {                
                if (markPCollection.length>0)

                    Array.from(markPCollection).forEach((e, i, arr) => {
                    e.id = `markPCook-${i}`;
                  });
            }   
        if (cookStepInputCollection) 
            {
                Array.from(cookStepInputCollection).forEach((e, i, arr) => {                  
                    // отслеживание пустых значений в поле название статьи                      
                    e.id=`inputStepCook-${i}`;                                                    
                    document.getElementById(`inputStepCook-${i}`).addEventListener('input', function(el) {
                        let emptyH = EmptyText(e.value);
                        setErrorEmptyParagraph (true);
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
                // отслеживание пустых значений в поле параграф
                    e.id=`cookCook-${i}`;                                                            
                    document.getElementById(`cookCook-${i}`).addEventListener('input', function(el) {     
                        setErrorCooking(true);   
                        setErrorEmptyText (true);                     
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
        if (markCollection) 
            {
                Array.from(markCollection).forEach((e, i, arr) => {                  
                // отслеживание пустых значений в поле список
                    e.id=`markCook-${i}`;                                                            
                    document.getElementById(`markCook-${i}`).addEventListener('input', function(el) {     
                        setErrorMark(true);   
                        setErrorEmptyMark (true);                     
                        let emptyH = EmptyText(e.value);
                        document.getElementById(`markPCook-${i}`).textContent=emptyH;   
                        if (emptyH!=="")
                            {
                                document.getElementById(`markCook-${i}`).setAttribute("data-empty", false);
                                document.getElementById(`errorMark-${i}`).textContent="";                                                                               
                            }
                        else 
                            {
                                document.getElementById(`markCook-${i}`).setAttribute("data-empty", true);
                                document.getElementById(`errorMark-${i}`).textContent="Поле не должно быть пустым, заполните или удалите двойным щелчком.";
                             } 
                        });
                    });                                           
            }            
    }, [arrC, cookStepInputCollection, cookStepInputCollection, cookInputCollection, cookHCollection, errorCookValue, errorCooking, errorMark,  errorEmptyMark, errorCook, errorEmptyText, errorEmptyParagraph]);   
   
    useEffect(() => {
        setCooking (arrC.join("")); // парсинг динамическгого html в поле параграф
    }, [arrC1]);

    // отслеживание пустого значения поля параграф при клике
    const CookValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorCookValue (false);
        }
        else setErrorCookValue (true);
        setValueCooking(e); 
    }

    // отслеживание пустого значения поля список при клике
        const MarkValueChange = (e) => 
        {
            if (EmptyText(e)==="") 
            {
                setErrorMarkValue (false);
            }
            else setErrorMarkValue (true);
            setValueMark(e); 
        }

    // отслеживание пустого значения поля название параграфа при клике
    const StepValueChange = (e) => 
    {
        if (EmptyText(e)==="") 
        {
            setErrorStepValue (false);
        }
        else setErrorStepValue (true);
        setValueTitleCooking(e); 
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

   // отправка статьи со всеми параметрами в базу
   const handleClick = (e) => {     
   Array.from(cookStepInputCollection).forEach((el, i, arr) => {   
        if (el.getAttribute("data-empty")==="true"){
            setErrorEmptyParagraph (false);
        }
   });
   Array.from(cookInputCollection).forEach((el, i, arr) => {   
        if (el.getAttribute("data-empty")==="true"){
            setErrorEmptyText (false);
        }
    });
    Array.from(cookInputCollection).forEach((el, i, arr) => {   
        if (el.getAttribute("data-empty")==="true"){
            setErrorEmptyText (false);
        }
    });
    Array.from(markCollection).forEach((el, i, arr) => {   
        if (el.getAttribute("data-empty")==="true"){
            setErrorEmptyMark (false);
        }
    });
    const arrLinks = [];
    let arrLinksValue = "";
    if (linkLiCollection&&linkLiCollection.length>0)
    {
        Array.from(linkLiCollection).forEach((el, i, arr) => {   
            const a = document.getElementById(`linksA-${i}`); 
            const link = replaceValue (a.textContent);
            const name = replaceValue (el.textContent);
            arrLinksValue = `{*name*:*${name}*, *link*: *${link}*}`;       
            arrLinks.push (arrLinksValue);
       });
    }       
   
    const arrCook = [];
    let arrCookValue = "";
    let j = 1;
    if (cookValues)
    {
        Array.from(cookValues).forEach((el, i, arr) => {   
            const link = replaceValue (el.textContent);
            if (el.tagName==="H3"&&EmptyText(el.textContent)!=="") {                    
                arrCookValue = `{*type*:*раздел*, *value*: *${link}*}`;
            }   
            if (el.tagName==="IMG") {
                let val=el.getAttribute('src');
                let addImg = val.substring(val.lastIndexOf('/')+1,val.length);                    
                arrCookValue = `{*type*:*рисунок*, *value*: *${addImg}*}`;
            }
            if (el.tagName==="LI"&&EmptyText(el.textContent)!=="") {                 
                arrCookValue = `{*type*:*параграф*, *value*: *${link}*}` ;
            }      
            if (el.tagName==="P"&&EmptyText(el.textContent)!=="") {                 
                arrCookValue = `{*type*:*список*, *value*: *${link}*}` ;
            }                          
            arrCook.push (arrCookValue);            
      });   
    }
    const arrCookFilter= arrCook.filter((number) => number !== "");
    const val= document.getElementById('mainImage').src;
    const mainImg = val.substring(val.lastIndexOf('/')+1,val.length);
    const today = new Date().toISOString().slice(0, 10)
    const noteValue = replaceValue (note);
    const titleValue = replaceValue (title);
    

    const article = {
        name: titleValue,
        text: JSON.stringify(arrCookFilter),
        img_main: mainImg,    
        note: noteValue,
        review: JSON.stringify({"params": []}),
        username: auth.currentUser,
        publicUserName: userPublicName,
        date: today,
        links: JSON.stringify(arrLinks),
        sections: JSON.stringify(sortValue),
        comments: JSON.stringify({"comments": []}),
    }

    if (errorEmptyArticle&&errorMainImg&&!errorTitle&&!errorTitleLength&&errorEmptyParagraph&&errorEmptyText&&errorEmptyMark)
    {
         async function addArticle() {
         const res = await fetch (`/api/account/add_article` , 
         {
             method: "POST",
             body: JSON.stringify(article)                    
         })
         .catch((err) => {
             setErrorRequest (true);
             return(err);
         }); 
         if (res.status===200) {
            setErrorRequest (false);
            router.push(`/articles`);
         }
         else setErrorRequest (true);
     }
     addArticle();
    } 
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

const handleChangeSelect = (e) => {
    setSortValue ({
        kindName: "Любой ингредиент",
        kind: "all"
    });
    if (e.value!=="")       
    {            
        const sortValueArr = [];
        const sortLabelArr = [];
        for(const arr of e) {
            sortValueArr.push(arr.value);   
            sortLabelArr.push(arr.label);     
        }
        let sortValueString = sortValueArr.join(",");   
        let sortLabelString = sortLabelArr.join(",");   
        setSortValue ({
            kindName: sortLabelString,
            kind: sortValueString
        });
    }
    if (e.length===0)         
    setSortValue ({
        kindName: "Любое блюдо",
        kind: "all"
    });
} 

return (
    <div> 
        <HeadMetaTags
            content="noindex" 
        />     
        <Navbar/>  
        <div>
        {(!auth.auth&&userRole!=="admin")  && 
            <div className='text-center pd-t-40'>
                <h1>Доступ запрещен</h1>
                <div className='registrationLink pd-b-40'>
                    <p>Для добавления статьи требуется <a href="/auth/login" alt="авторизация Vseresepty.ru">авторизация и роль админа.</a></p>
                    <BackButton/>                     
                </div> 
                <img src="/img/34.gif" className='h-100' />
            </div>
        }
        {(auth.auth&&userRole!=="admin")  && 
            <div className='text-center pd-t-40'>
                <h1>Доступ запрещен</h1>
                <div className='registrationLink pd-b-40'>
                    <p>Для добавления статьи требуется роль админа.</p>
                    <BackButton/>                    
                </div>
                <img src="/img/41.gif" className='h-100' />
            </div>
        }
        {(auth.auth&&userRole==="admin") &&   
             <div className='pd-b-140'><div className='addRecipes'>                
                <div>
                    <img className='mainImgAva' src='/icons/icon_notebook.png' /><h1>Добавить статью</h1>
                    <div className='addRecipeContent'>   
                        <div className='addRecipeHeader'>
                            <h2>Название статьи</h2>
                            <div>
                                <input type="text" name="title" placeholder="Дайте название вашей статье (до 80 символов)" onChange={(e) => {changeTitle(e.target.value)}}  />                                                                 
                            </div> 
                            <div className='error'>
                                {errorTitle===true && <div className='error'>Заполните название.</div>}
                                {errorTitleLength && <div className='error pd-t-5'>Название не должно быть больше 80 символов.</div>}
                            </div>
                        </div>                          
                        <div className='addRecipeNote'>
                            <h2>Кратое описание или заметки</h2>     
                            <div>
                                <textarea type="text" name="title" placeholder="Опишите кратко особенности вашей статьи" onChange={(e) => setNote(e.target.value)} />                      
                            </div>
                        </div>                        
                        <div className='mainImage addIngredients'>                                
                            <h2 >Фото статьи</h2>
                            <AddImage pathToSave="https://storage.yandexcloud.net/vseresepty" btnClass="buttonTransparentBorder mr-b-10" clickBtn={clickMainImg} btnCropId="btnCropMainImg" defaultImage="/icons/icon_avatar.png" canvasId="mainImageCanvas" imgId="mainImage"  imgClass=""/>
                            {!errorMainImg && <div className='error pd-t-5'>Загрузите основное фото статьи</div>}                      
                            <div className='pd-b-20'></div>
                        </div>               

                        <div className='addIngredients'>                    
                            <h2>Статья</h2>
                            <p>Добавляйте название раздела и параграфы, добавляя имеющиеся фото. В шаблоне будет примерно отображено как ваш статья будет отображаться на сайте. Для удаления контента дважды кликните на нем в шаблоне статьи.</p>                 
                            {!errorEmptyArticle && <div className='error pd-t-20 pd-b-10'>Статья отсутствует.</div>}
                            <div className='recipeTextCook' id='cookRecipe'>
                                <div className='mr-t-20'>
                                    {addCooking}     
                                </div>               
                            </div>                            
                            <div className='addRecipeCook'>  
                                <div className='ingredientsGroup mr-t-30'>  
                                    <p className='mr-b-5'>НАЗВАНИЕ РАЗДЕЛА:</p> 
                                    <input value={valueTitleCooking} onChange={event => StepValueChange(event.target.value)} placeholder=""/>                                 
                                    {errorStepValue &&<div className='buttonWhite'>                                                                      
                                        <button onClick={event => {setArrC([...arrC, `<div class="stepAdd"><span class="section-block">Подраздел:</span><h3 class="changeStepH cookCollection">${valueTitleCooking}</h3><button class="changeArticle">Изменить подраздел: </button><input class="changeStepInput" type="text"></input><div class="errorStep error-article error pd-l-25"></div></div>`]); setArrC1([...arrC1, {step: valueTitleCooking}])}}>
                                            ДОБАВИТЬ НАЗВАНИЕ РАЗДЕЛА
                                        </button>                                        
                                    </div>}
                                </div>                                     
                                <div className='ingredientsGroup mr-t-30'> 
                                    <p className='mr-b-5'>ПАРАГРАФ:</p> 
                                    <input value={valueCooking} onChange={event => {CookValueChange(event.target.value); }} placeholder=""/>
                                    <div className='buttonWhite'>                                    
                                        {errorCookValue &&
                                        <button onClick={event => {setArrC([...arrC, `<div class="cookAdd"><span class="paragraph">Параграф:</span><li class="articleLi cookCollection">${valueCooking}</li><button class="changeCookBtn">Изменить параграф: </button><input class="changeCookInput" type="text"></input><div class="errorCook error-article error pd-l-25"></div>`]); setArrC1([...arrC1, {cook: valueCooking}])}}>
                                            ДОБАВИТЬ ПАРАГРАФ
                                        </button>
                                        }
                                    </div>
                                </div> 
                                <div className='ingredientsGroup mr-t-30'> 
                                    <p className='mr-b-5'>СПИСОК:</p> 
                                    <input value={valueMark} onChange={event => {MarkValueChange(event.target.value); }} placeholder=""/>
                                    <div className='buttonWhite'>                                    
                                        {errorMarkValue &&
                                        <button onClick={event => {setArrC([...arrC, `<div class="markAdd"><span class="mark">Список:</span><p class="articleMarkLi cookCollection">${valueMark}</p><button class="changeMarkBtn">Изменить список: </button><input class="changeMarkInput" type="text"></input><div class="errorMark error-article error pd-l-25"></div>`]); setArrC1([...arrC1, {cook: valueMark}])}}>
                                            ДОБАВИТЬ СПИСОК
                                        </button>
                                        }
                                    </div>
                                </div> 
                            </div>
                            <div className='pd-b-25'>                                
                                <p className='mr-t-30'>ФОТО В ДАННОМ ПАРАГРАФЕ:</p>                                  
                                <AddImage pathToSave="https://storage.yandexcloud.net/vseresepty" btnClass="buttonTransparentBorder mr-b-10" clickBtn={clickCookImg} btnCropId="btnCropCookImg" defaultImage="/icons/icon_avatar.png" canvasId="CookImageCanvas" imgId="cookImage" imgClass=""/>
                                <div className='uploadImage'>
                                    <button className='buttonWhite' onClick={saveCookImg}>СОХРАНИТЬ ФОТО В ПАРАГРАФЕ</button>
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
                            <div> 
                                <h2>Выбор раздела и подраздела</h2>
                                <div  className='border-bottom-light-grey pd-b-20'>
                                    <CustomSelect        
                                    options={options}
                                    placeHolder='Разделы соответствующие тематике статьи'
                                    onChange={(e) => handleChangeSelect(e)                                
                                    }
                                    isMulti     
                                    /> 
                                </div>
                                <div className='pd-t-20 pd-b-40'>
                                    {errorTitle===true && <div className='error'>Заполните название.</div>}
                                    {errorTitleLength && <div className='error pd-t-5'>Название не должно быть больше 80 символов.</div>}
                                    {!errorMainImg && <div className='error pd-t-5'>Основное фото статьи отсутствует.</div>}   
                                    {errorEmptyParagraph===false && <div className='error pd-t-5'>Заполните пустые поля в разделе название подраздела статьи.</div>}
                                    {!errorEmptyText && <div className='error pd-t-5'>Заполните пустые поля в разделе параграфов статьи.</div>}
                                    {!errorEmptyMark && <div className='error pd-t-5'>Заполните пустые поля в разделе ссылки статьи.</div>}
                                    {!errorEmptyArticle && <div className='error pd-t-5'>Статья отсутствует.</div>}
                                    {errorRequest && <div className='error pd-t-5'>Ошибка запроса.</div>}
                                </div>
                                <div className='buttonRightWrap pd-t-20'>
                                    <button className='buttonTransparent'><span><a href="/">ОТМЕНИТЬ</a></span></button>
                                    {errorEmptyArticle&&errorMainImg&&!errorTitle&&!errorTitleLength && 
                                        <button className='buttonOrange' onClick={handleClick}>Сохранить Статью</button>
                                    }
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

export default AddArticle
