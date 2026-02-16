"use client";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import ImageGallery from "react-image-gallery";
import ReactToPrint from 'react-to-print';
import StarRating from '../../../services/star_rating';
import Navbar from '../../../components/navbar';
import CommunityRules from '../../../components/community_rules';
import "react-image-gallery/styles/css/image-gallery.css";
import Modal from '../../../components/modal';
import DateFormatDMY from '../../../services/date-format';
import Footer from '../../../components/footer';
import ShareSocialTelegram from '../../../components/share_social/share_social_telegram';
import ShareSocialFacebook from '../../../components/share_social/share_social_facebook';
import ShareSocialVK from '../../../components/share_social/share_social_vk';
import ShareSocialWatsapp from '../../../components/share_social/share_social_whatsapp';
import { useAuth } from '../../../context/context';
import ChoiсeStarRating from '../../../services/choice-star-rating';
import { useRouter } from 'next/router';
import Loading from '../../../components/loading';
import SliderSlick from '../../../services/slider-slick';
import AddImage from '../../../services/cropper/add-image';
import HeadMetaTags from '../../../components/head';


const FoodTypeRecipe = () => {

    const router = useRouter()
    const mainCat = useSearchParams().get('type');
    const [isDirty, setIsDirty] = useState(false);  
    const [currentDomain, setCurrentDomain] = useState('');
    const [savedUser, setSavedUser] = useState ();   
    const [visitedUser, setVisitedUser] = useState ();  
    const [userReview, setUserReview] = useState (true);  // проверка оставлял ли юзер отзыв
    const [rating, setRating] = useState("0");  // среднее значение рейтинга  
    const [changeRating, setChangeRating] = useState(0);  // значение выставленного юзером рейтинга
    const cat = useSearchParams().get('type');
    const id = useSearchParams().get('id');
    const [recipe, setRecipe] = useState([{name:""}]);
    const componentRef = useRef();
    const [visibleSocial, setVisibleSocial] = useState (false);   
    const [cook, setCook] = useState ([]);
    const [ingredientsArr, setIngredientsArr] = useState ([]);  // новые рецепты раздел ингредиенты
    const [linksArr, setLinksArr] = useState ([]);  // массив ссылок для рецепта
    const [cookArr, setCookArr] = useState ([]); // новые рецепты раздел приготовление
    const [modal, setModal] = useState(false); 
    const [secondModal, setSecondModal] = useState(false);
    const [thirdModal, setThirdModal] = useState();    
    const [caloriesBlock, setCaloriesBlock] = useState(false);  
    const refReviews = useRef(null);
    const refPhotos = useRef(null);
    const [reviews, setReviews] = useState ({"params": []}); 
    const [gallery, setGallery] = useState ({"params": []}); 
    const [userPublicName,setUserPublicName] = useState("");  
    const [note, setNote] = useState ("");     
    const [savedRecipes, setSavedRecipes] = useState ({"saved":[]});  // сохраненные рецепты строка из базы
    const [visitedPages, setVisitedPages] = useState ({"visited":[]});  // посещенные страницы строка из базы
    const [visitedPagesUnuque, setVisitedPagesUnuque] = useState ({"visited":[]});  // посещенные страницы строка из базы
    const img = [];
    const imgArr = reviews?.params?.filter(i => i.photos?.length>0);
    const [isRating, setIsRating] = useState (false);
    const [user, setUser] = useState (null);
    const [isLoading, setIsLoading] = useState(false);
    const [ingredBlock, setIngredBlock]= useState (true);    
    const [recipeBlock, setRecipeBlock]= useState (false); 
    const [articlesBlock, setArticlesBlock]= useState (false);    
    const [reviewBlock, setReviewBlock]= useState (true);    
    const [noteBlock, setNoteBlock]= useState (true); 
    const [isTime, setIsTime]= useState (false); 
    const [isComplexity, setIsComplexity]= useState (false); 
    const [isComposition, setIsComposition]= useState (false); 
    const [isPrice, setIsPrice]= useState (false); 
    const [articles, setArticles] = useState ([]);
    const [nameRecipe, setNameRecipe] = useState ([]);
    const [miniText, setMiniText] = useState ({});
    const [sections, setSections] = useState ({});
    const [nameValue, setNameValue] = useState ("");
    const [mainImg, setMainImg] = useState ("");
    const intervalRef = useRef();
    const [descriptionValue, setDescriptionValue] = useState ("");
    const authCheck = useAuth();
    imgArr?.map ((i) => img.push({"original": `${i.photos}`, "thumbnail": `${i.photos}`, "description": `Автор: ${i.user}`}));

    const handleOpen = () => {
        setIngredBlock (true);
    };
    const handleClose = () => {
        setIngredBlock (false);  
    };  
    const handleOpenNote = () => {
        setNoteBlock (true);
    };
    const handleCloseNote = () => {
        setNoteBlock (false);  
    }; 
    const handleOpenRecipe = () => {
        setRecipeBlock (false);
    };
    const handleCloseRecipe = () => {
        setRecipeBlock (true);  
    };  
    const handleOpenReview = () => {
        setReviewBlock (true);
    };
    const handleCloseReview = () => {
        setReviewBlock (false);  
    }; 

    const handleOpenArticles = () => {
        setArticlesBlock (true);
    };
    const handleCloseArticles = () => {
        setArticlesBlock (false);  
    }; 
    useEffect (() =>    
        {   
            authCheck.authorization();   
            setUser (authCheck.currentUser);
            authCheck.auth; 
    }, [authCheck]); 

    useEffect (() =>    
    {   
        if (user) 
        {
        async function getUserInfo() {
            const res = await fetch(`/api/account/user?email=${user}`, {
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
    }, [user]);    

    const handleCommunityRules = (() => 
    {
        setThirdModal(true);  
    });

    const clickReviews = () => {
        refReviews.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const clickPhotos = () => {
        refPhotos.current?.scrollIntoView({ behavior: 'smooth' });
    };    

    useEffect (( ) => {         
        if (cat && id)
            {
                async function getRecipe() {
                const res = await fetch(`/api/cooking/recipe?type=${cat}&id=${id}`, {
                        method: "GET",
                    }) 

                    if (res.status===200)                      
                    {
                        setIsLoading(true);
                    };
                    return res.json().then((data) => {                        
                        setRecipe(data);      
                        let name = `<meta name="description" content=!!!  ${nameRecipe} рецепт приготовления с пошаговым фото калории калорийность recipes preparing calories delicious dishes/>`
                        setNameRecipe(name )
                        if (data[0].fats+data[0].calories+data[0].carbohydrates+data[0].proteins===0)
                        {
                            setCaloriesBlock(true);
                        }
                        let param = [];
                        param = data[0].cook;                        
                        const paramCook = JSON.parse(param); 
                        let cooking = paramCook.filter(function(item, pos, arr) {
                            return item.cook!==""
                        })
                        setCook (cooking);
                        const paramReview = data[0].review;
                        setReviews(JSON.parse(paramReview)); 
                        const paramGallery = data[0].users_gallery;  
                        setGallery(paramGallery); 
                        setIngredientsArr(JSON.parse(data[0].ingredients_arr));                        
                        setCookArr(JSON.parse(data[0].cook_arr));
                        setLinksArr(JSON.parse(data[0].links));  
                    }).catch((err) => {
                        return(err);
                    });
                
                }
            getRecipe();   

        } 
        if (user) {
            async function getSavedRecipes() {
                    const res = await fetch(`/api/account/saved_recipes?email=${user}`, {
                            method: "GET",
                        }) 
                        return res.json().then((data) => {   
                            const arr = data[0];
                            const arr_saved = JSON.parse(arr.saved_recipes);
                            setSavedRecipes(arr_saved); 
                            arr_saved.saved.forEach(function(item) {  // проверка есть ли данный рецепт в сохраненных     
                                if (item.recipe===currentDomain) 
                                {
                                    setSavedUser(false);                                               
                                }           
                            }); 
                            const arr_visited = JSON.parse(arr.visited_pages);                            
                            setVisitedPages(arr_visited);                                          
                            visitedPages.visited.forEach(function(item) {  // проверка есть ли данный рецепт в посещенных страницах  
                                if (item.page!==currentDomain) 
                                {                                    
                                    setVisitedUser(false)                               ;
                                }           
                            }); 
                                                    
                        }).catch((err) => {
                            return(err);
                        });
                }
            getSavedRecipes();                                     
        }
        setCurrentDomain(document.location.href);   
        
        async function getArticles() {
            const res = await fetch(`/api/articles/chapter_article`, {
                    method: "GET",
                }) 
                return res.json().then((data) => {                        
                      
                    const arr = ShuffleArray(data);
                    let indexToRemove = 4;                                    
                    arr.splice(indexToRemove + 1);
                    setArticles(arr); 
                    setText(JSON.parse(data[0].text));    
                }).catch((err) => {
                    return(err);
                });            
            }
        getArticles();   

     }, [id, user]); 

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

    useEffect(() => {      
        if (reviews.params.length!==0) {        // если в базе есть отзывы
            reviews.params.forEach((item)=>{    // находим оставлял ли юзер отзыв и выставляем флаг
                if (item.userEmail === user) 
                    {
                        setUserReview (false);                            
                    }
                //else {setUserReview (true);}  
                })    
        }
        else setUserReview (true)
        if (reviews.params.length===0 && changeRating!==0)
        {
            setRating (changeRating);   // если в базе нет отзывов и юзер поставил рейтинг, выставить рейтинг в рейтинг юзера 
        }
    }, [reviews, authCheck]);

    useEffect(() => {
        let v = 0;
        let l = 0;           
        if (reviews.params.length!==0) {                    // если в базе есть отзывы
            for (let i=0; i<reviews.params.length; i++) {
                v= v+Number(reviews.params[i].rating);                  
            }
            for (let j=0; j<reviews.params.length; j++) {
                if (reviews.params[j].rating>0)                
                {
                    l = l+1;                
                }
            }
            setRating((v/l).toFixed(0));        // вычисляем среднее арифметическое рейтинга из базы
        }
        if (reviews.params.length===0) 
        { setRating(changeRating);}
    }, [reviews, changeRating]);

    const handleChangeRating = (value) => 
    {
        setChangeRating(value);  // выставленный рейтинг
    } 

    const handleDelete = async ()=>{
        try {
             await fetch(`/api/account/delete_recipe?cat=${cat}&id=${id}`, {
                 method: "DELETE"             
            })                                 
            } catch (err) {
                return err;
        }
        setModal(false);
        router.push(`/recipes/sort?type=${cat}`);   
    }

    const sendUserReview = async  () => { 
        const reviewAll = reviews;  
        let reviewUser = "";
        if (authCheck.auth===true) {
            let img = document.getElementById('imageReview').src;
            let addImg = img.substring(img.lastIndexOf('/')+1,img.length);
            if (addImg!=="icon_avatar.png")
            {
                img = document.getElementById("imageReview").src;
            }
            else img="";
            reviewUser = {"user": userPublicName, "userEmail": user, "review": note, "rating": changeRating, "photos": img};           
            reviewAll.params.push (reviewUser);
            var reviewJson = JSON.stringify(reviewAll);        
            setIsRating (true);  // флаг выставленного юзером рейтинга 
            async function sendReview() {
                const res = await fetch(`/api/cooking/review?type=${cat}&id=${id}`, {
                    method: "POST",
                    body: reviewJson,
                })                    
                .catch((err) => {
                    return(err);
                });
            }
            sendReview(); 
            async function sendUserRating() {
                const res = await fetch(`/api/cooking/review?type=${cat}&id=${id}&rating=${rating}`, {
                method: "PUT",
                })                    
                .catch((err) => {
                    return(err);
                });
                }
                sendUserRating();             
            window.location.reload();
        }   
    }

    // const handleOnClick = (e) => {
    //     e.preventDefault();
    //     setLoadError((prev) => ({ ...prev, imageEmpty: true }));
    //     setLoadError((prev) => ({ ...prev, imageFormat: true }));
    //     setLoadError((prev) => ({ ...prev, loaded: true }));
    //     if (!inputFileRef.current?.files?.length) {
    //         setLoadError((prev) => ({ ...prev, imageEmpty: false }));
    //         return;
    //     }
    //     const formData = new FormData();        
    //     Object.values(inputFileRef.current.files).forEach(file => {
    //         formData.append('file', file);
    //     });		
	// 	document.getElementById('files').addEventListener('change', function() {
    //         const fileImg = this.files[0];            
    //         if (fileImg && !fileImg.type.match('image.*')) {
    //             setLoadError((prev) => ({ ...prev, imageFormat: false }));
    //           this.value = ''
    //         }
    //     });    
    //     async function loading() {
    //         await fetch(`/api/upload?folder=user_gallery`, {
    //             method: 'POST',
    //             body: formData
    //         }) 
    //         .then (response => {                
    //             setLoadError((prev) => ({ ...prev, loaded: true }));                
    //             if (response.status===200)
    //             {             
    //             };  
    //                 response.json().then((data) => {
    //                     setImgUrl (data[0]);
    //                 })             
    //             })            
    //             .catch((err) => {           
    //                 return (err);
    //             });
    //         }
    //         loading();  
    // };

    const hanldeSave = (e => {    
        const likeBtn = e.target.closest(".savedSelector")
        setIsDirty (true);
        const aria = {
            label: {
            true: "Удалить",
            false: "Сохранить"
            }
        }
        likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
        likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed]; 
        if (savedUser!==false) { 
            if (likeBtn.ariaPressed==='true') {
                savedRecipes.saved?.push({recipe: `${currentDomain}`, name: `${recipe[0]?.name}`, img: `${recipe[0]?.img_main}`});                
            }
            if (likeBtn.ariaPressed==='false') {
                savedRecipes.saved?.pop();
            } 
            if (user) {
                try {                
                    fetch(`/api/account/saved_recipes?email=${user}`, 
                    {    
                        method: "PUT",
                        body: JSON.stringify(savedRecipes), 
                    });   
                }  
                catch (err) {
                    return(err);
                }
            } 
        }
    }          
);

    useEffect (() => {   
        let img = "";
        if (!visitedUser&&recipe[0])
        {
            if (recipe[0].cook_arr!=="null") {
                img = `https://storage.yandexcloud.net/vseresepty/${recipe[0].img_main}`;
            }
            if (recipe[0].cook_arr==="null") { 
                img = `/upload/recipe_main_img/${recipe[0].img_main}`;
            }       
            if (currentDomain!==""&&img!==""&&recipe[0]?.name!=="")
            {
                visitedPages.visited.push({page: `${currentDomain}`, img: `${img}`, name:`${recipe[0]?.name}`}); 
            }        
            const unique = visitedPages.visited.filter((obj, idx, arr) => 
                arr.findIndex(t => JSON.stringify(t) === JSON.stringify(obj)) === idx
            );
            if (unique[0]?.page.length===0) {
                unique.splice(0,1);
            };           
            const obj = {};
            obj['visited'] = unique;
            setVisitedPagesUnuque (unique);
            async function sendVisitedPages() {
                if (user) {
                    try {                
                        await fetch(`/api/account/visited_pages?email=${user}`, 
                        {    
                            method: "PUT",
                            body: JSON.stringify(obj), 
                        });   
                    }  
                    catch (err) {
                    return(err);
                    }
                } 
            }
            sendVisitedPages();
        }
    }, [visitedPages, recipe[0], reviewBlock]);

    const calc = (e) => {
        const value1 = ((recipe[0]?.proteins/100)*e.target.value);
        document.getElementById("proteins").textContent=value1.toFixed(1);
        const value2 = (recipe[0]?.fats/100)*e.target.value;
        document.getElementById("fats").textContent=value2.toFixed(1);
        const value3 = (recipe[0]?.carbohydrates/100)*e.target.value;
        document.getElementById("carbohydrates").textContent=value3.toFixed(1);
        const value4 = (recipe[0]?.calories/100)*e.target.value;
        document.getElementById("calories").textContent=value4.toFixed(1);
    }

    const clickReviewImg = () => {  
        //не удалять! обязательный атрибут для cropper
    }
    useEffect (() => { 
        const time = document.getElementById('time');
        if (time) {
            time.addEventListener('mouseenter', () => {
            setIsTime (true);
        });
        time.addEventListener('mouseleave', () => {
            setIsTime (false);

        });
        }

        const complexity = document.getElementById('complexity');
        if (complexity) {
            complexity.addEventListener('mouseenter', () => {
            setIsComplexity (true);
        });
        complexity.addEventListener('mouseleave', () => {
            setIsComplexity (false);
        });
        }

        const price = document.getElementById('price');
        if (price) {
            price.addEventListener('mouseenter', () => {
            setIsPrice (true);
        });
        price.addEventListener('mouseleave', () => {
            setIsPrice (false);
        });
        }

        const composition = document.getElementById('composition');
        if (composition) {
            composition.addEventListener('mouseenter', () => {
            setIsComposition (true);
        });
        composition.addEventListener('mouseleave', () => {
            setIsComposition (false);
        });
        }
        if(cookArr?.length===0)
        { 
            setMainImg(`/upload/recipe_main_img/${recipe[0].img_main}`);
        }     
        if(cook&&!cookArr)
        {                            
            setMainImg(`/upload/recipe_main_img/${recipe[0].img_main}`);
        }                                    
        if(cookArr) 
        {
            setMainImg(`https://storage.yandexcloud.net/vseresepty/${recipe[0].img_main}`);
        }
    }, [recipe]);


useEffect (() =>    
{   
    if (articles&&articles.length>0) { 
        articles.map((v, i, arr) => {
            let str = v.text.replace(/\*/g, "'");            
            const indexOfFirst = str.indexOf("'type':'параграф'");              
            if(v.sections.indexOf(nameValue)!==-1)
                {
                    sections [i] = "true";
                }
            else sections [i] = "false";
            if (indexOfFirst!==-1)
                {                    
                    const subStr1 = str.substring(indexOfFirst+29);
                    const str2 = "'type':'раздел', 'value':"; 
                    const subStr2 = subStr1.replace(new RegExp(str2, 'g'), "");
                    const str3 = "{'type':'параграф', 'value':"; 
                    const subStr3 = subStr2.replace(new RegExp(str3, 'g'), "");
                    const str4 = "{'type':'рисунок', 'value':"; 
                    const subStr4 = subStr3.replace(new RegExp(str4, 'g'), "");
                    const str5 = "'type':'список', 'value':"; 
                    const subStr5 = subStr4.replace(new RegExp(str5, 'g'), "");
                    const str6 = '}","{'; 
                    const subStr6 = subStr5.replace(new RegExp(str6, 'g'), "");
                    const str7 = '}","'; 
                    const subStr7 = subStr6.replace(new RegExp(str7, 'g'), "");
                    const str8 = "'"; 
                    const subStr8 = subStr7.replace(new RegExp(str8, 'g'), "");
                    const str9 = '}" ,"{'; 
                    const subStr9 = subStr8.replace(new RegExp(str9, 'g'), "");
                    const str10 = '}"]'; 
                    const subStr10 = subStr9.replace(new RegExp(str10, 'g'), "");
                    let subStr12 = "";
                    if (typeof window !== 'undefined') {            
                        if (window.innerWidth>500) {
                            subStr12 = subStr10.substring(0, 135);
                        }
                        else {
                            subStr12 = subStr10.substring(0, 100);
                        }
                      }                                                     
                    miniText[i] = subStr12;
                }
            else miniText[i] = "Читать далее";
            articles.map ((x, i, arr) => {
                let comment = JSON.parse(arr[i].comments);
                arr[i].commentsLength = `${comment.comments.length}`;
            }) 
            })  
            const arr = ShuffleArray(articles);
        }
}, [articles, sections]); 

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
    <>
        <HeadMetaTags 
            description={`${recipe[0].name} рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            title={recipe[0].name}
            keywords={`${recipe[0].name}, пошаговый рецепт приготовления, приготовить блюдо, готовить вкусную еду, готовка блюд, cooking recipes, kitchen preparing`}
            content="all"
            ogTitle={`${recipe[0].name} Рецепты блюд с пошаговым описанием`}
            ogDescription={`${recipe[0].name} Рецепты блюд с пошаговым описанием`}
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle={`${recipe[0].name} рецепт приготовления блюда cooking recipe`}
            twitterDescription={`${recipe[0].name} приготовить блюдо пошаговый рецепт cooking recipe preparing dish`}
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />
        <Navbar/>  
        <div>                           
            <div className='wrapRecipe wrapRecipeSm'>             
                <div className='contentRecipe'>                             
                    {recipe&&recipe[0]?.name && 
                        <>
                        {!isLoading && <div className='text-center'><Loading size="m"/></div>}                     
                        <div className='headerRecipe'>              
                            <div className='breadcrumbs  text-left'>
                                <Link href="/">РЕЦЕПТЫ</Link>                            
                                <Link href={`/recipes/sort?type=${mainCat}`}> / {recipe[0].add_section}</Link>
                            </div>   
                        </div> 
                        <h1>{recipe[0].name}</h1>
                        <div key={recipe}>                                
                                <span onClick={clickReviews}>             
                                    <StarRating onClick={clickReviews}                    
                                        count={5}
                                        size = {24}
                                        rating = {recipe[0].rating}
                                    ></StarRating>                
                                </span>
                                <span className='ratingRecipe'>  
                                    <span className='ratingBorder'></span>
                                    <span onClick={clickReviews}>ОТЗЫВЫ</span>
                                    <span className='ratingBorder'></span>
                                    <span onClick={clickPhotos}>ФОТО</span>
                                </span>
                                {recipe[0]?.username && <span className='publishDate'>Автор рецепта: <span>{recipe[0]?.username}</span>
                                <span className='ratingBorder'></span> Опубликовано {DateFormatDMY(recipe[0]?.date)} </span>}
                                <div className='recipeButtons'>
                                    <span className='recipeButtonsWrap'>
                                    {authCheck.authStatus===200 &&
                                        <span className='recipeSaveButton' onClick={hanldeSave}>                                            
                                                <button className="savedSelector" aria-label="Сохранить" aria-pressed="false">Сохранить
                                                    <span></span> 
                                                    <svg width="20" height="20" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.8398 2.39496C13.013 -0.169205 10.2871 2.03882 9.27755 
                                                            3.46336C8.26797 2.03882 5.54163 -0.169205 2.71481 2.39496C-0.112011 
                                                            4.95912 1.87349 8.80536 3.2196 10.408C4.22918 11.6544 6.85456 14.361  
                                                            9.27755 15.2158C11.7005 14.361 14.3254 11.6544 15.335 10.408C16.6811 
                                                            8.80536 18.6666 4.95912 15.8398 2.39496Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>        
                                                    </svg>
                                                </button>                                            
                                        </span> }
                                        <span className='recipeRatingButton'>
                                            <span onClick={clickReviews}>Рейтинг </span><img src="/icons/star-icon.png" alt="recipe rating"/>
                                        </span>
                                    </span>
                                    <span className='ratingBorder'></span>
                                    <ReactToPrint
                                        trigger={() => {return <span className="recipePrintButton"><span>Печать</span><img src="/icons/print-icon.png"  lazy="true" alt={`"рецепт ${recipe[0]?.name}"`}/></span>}}
                                        content={() => componentRef.current}
                                        documentTitle= {recipe[0].name} 
                                        pageStyle="print"
                                    />                         
                                    <span className='ratingBorderPrint'></span>
                                    {!visibleSocial &&
                                    <><span className='recipeShareButton' onClick={()=>setVisibleSocial(true)}>
                                        <span>Поделиться </span><img src="/icons/share-icon.png" alt={`"поделиться рецептом ${recipe[0].name}"`}/>
                                    </span><span className='ratingBorderShare'></span></>}
                                    {visibleSocial &&
                                        <span className='social'>
                                            <ShareSocialTelegram
                                                shareUrl={currentDomain}
                                                title={recipe[0]?.name}
                                                width="18px"
                                                height="18px"
                                                fill="rgba(0, 0, 0, 0.65)"
                                                className="social-icon"
                                            />
                                            <span className='ratingBorder'></span> 
                                            <ShareSocialFacebook
                                                shareUrl={currentDomain}
                                                title={recipe[0]?.name}
                                                width="14px"
                                                height="14px"
                                                fill="rgba(0, 0, 0, 0.65)"
                                                count="10"
                                                countVisible="true"
                                                className="social-icon-top2"
                                            />  
                                            <span className='ratingBorder'></span>                         
                                            <ShareSocialVK
                                                shareUrl={currentDomain}
                                                title={recipe[0]?.name}
                                                width="17px"
                                                height="17px"
                                                fill="rgba(0, 0, 0, 0.65)"
                                                count="10"
                                                countVisible="true"
                                                className="social-icon-top5"
                                            />  
                                            <span className='ratingBorder'></span>
                                            <ShareSocialWatsapp 
                                                shareUrl={currentDomain}
                                                title={recipe[0]?.name}
                                                width="17px"
                                                height="17px"
                                                fill="rgba(0, 0, 0, 0.65)"
                                                count="10"
                                                countVisible="true"
                                                className="social-icon-top6"
                                            />        
                                        </span>
                                    } 
                                </div>  
                                <Modal
                                    isVisible={secondModal}
                                    title="Требуется регистрация"
                                    content={<div><p>Чтобы добавить в избранное, требуется <Link href={`/login`}>регистрация</Link></p></div>}
                                    onClose={() => setSecondModal(false)}    
                                />  
                                <ul className="hover-effect-cover">
                                    <li>
                                    {cookArr?.length===0 && 
                                        <><img className='img_main' src={`/upload/recipe_main_img/${recipe[0].img_main}`} alt={`фото блюда ${recipe[0].name} recipe`}/></>         
                                    }
                                    
                                    {cook&&!cookArr &&                            
                                        <><img className='img_main' src={`/upload/recipe_main_img/${recipe[0].img_main}`} alt={`фото блюда ${recipe[0].name} recipe`}/></>
                                    }                                    
                                    {cookArr &&                          
                                        <><img className='img_main' src={`https://storage.yandexcloud.net/vseresepty/${recipe[0].img_main}`} alt={`фото блюда ${recipe[0].name} recipe`}/></>                               
                                    }
                                    <div className="effect-to-left"> 
                                        <div className='property-dish-block'>
                                            <div id="composition" className='composition-block font-segoe'> 
                                                {isComposition &&  
                                                    <div className='pos-composition'> 
                                                        {recipe[0].gluten===1 && 
                                                            <p>БЕЗГЛЮТЕНОВОЕ</p>                                                    
                                                        }
                                                        {recipe[0].lactose===1 && 
                                                            <p>БЕЗЛАКТОЗНОЕ</p>                                               
                                                        }
                                                        {recipe[0].lent===1 && 
                                                            <p>ПОСТНОЕ</p>                                               
                                                        }
                                                        {recipe[0].calorie===1 && 
                                                            <p>НИЗКОКАЛОРИЙНОЕ</p>                                               
                                                        }
                                                        {recipe[0].festive===1 && 
                                                            <p>ПРАЗДНИЧНОЕ</p>                                               
                                                        }
                                                        {recipe[0].veg===1 && 
                                                            <p>ВЕГЕТАРИАНСКОЕ</p>                                               
                                                        } 
                                                    </div>  
                                                }
                                                <img src ="/icons/icon_composition.png" />  
                                            </div>
                                                {((recipe[0].hour&&recipe[0].hour>0)||(recipe[0].minutes&&recipe[0].minutes>0)) && 
                                                    <div id="time" className='time-block font-segoe'>
                                                    {isTime && <span className='time-top'> 
                                                            <span className='time-cook'>Время приготовления :</span> 
                                                            {recipe[0].hour>0 &&
                                                            <span className='time-cook-1'>{recipe[0].hour} ч.</span>
                                                            }
                                                            {recipe[0].minutes>0 &&
                                                            <span className='time-cook-2'>{recipe[0].minutes} мин.</span>
                                                            }
                                                    </span>}  
                                                    <img src ="/icons/icon_time.png" />                                                    
                                                    </div>                                                                                            
                                                }     

                                                {(recipe[0].complexity&&recipe[0].complexity>0) && 
                                                    <div id="complexity" className='time-block font-segoe'>
                                                    {isComplexity && <span className='time-top'> 
                                                            <span className='time-cook'>Сложность приготовления :</span> 
                                                            {recipe[0].complexity===1 &&
                                                            <span className='time-cook-2'>
                                                                <img src ="/icons/icon_circles_1.png" />      
                                                            </span>
                                                            }     
                                                            {recipe[0].complexity===2 &&
                                                            <span className='time-cook-2'>
                                                                <img src ="/icons/icon_circles_2.png" />      
                                                            </span>
                                                            }      
                                                            {recipe[0].complexity===3 &&
                                                            <span className='time-cook-2'>
                                                                <img src ="/icons/icon_circles_3.png" />      
                                                            </span>
                                                            }                                                   
                                                    </span>}  
                                                    <img src ="/icons/icon_complexity.png" />                                                    
                                                    </div>                                                                                            
                                                }   
                                                {(recipe[0].price&&recipe[0].price>0) && 
                                                    <div id="price" className='time-block font-segoe'>
                                                    {isPrice && <span className='time-top'> 
                                                            <span className='time-cook'>Бюджетность :</span> 
                                                            {recipe[0].price===1 &&
                                                            <span className='time-cook-2'>
                                                                <img src ="/icons/icon_circles_1.png" />      
                                                            </span>
                                                            }     
                                                            {recipe[0].price===2 &&
                                                            <span className='time-cook-2'>
                                                                <img src ="/icons/icon_circles_2.png" />      
                                                            </span>
                                                            }      
                                                            {recipe[0].price===3 &&
                                                            <span className='time-cook-2'>
                                                                <img src ="/icons/icon_circles_3.png" />      
                                                            </span>
                                                            }                                                   
                                                    </span>}  
                                                    <img src ="/icons/icon_pay.png" />                                                    
                                                    </div>                                                                                            
                                                }  
                                        </div>
                                    </div>                                       
                                    </li>
                                </ul>
                                <>         
                                {((recipe[0])&&!caloriesBlock) && 
                                    <>
                                        <div className='space-around pd-t-10 f-s-14 break-all'>
                                            <div className='border-light-grey'>
                                                <div className='pd-b-5'>Белки</div>
                                                <div id="proteins" className='f-s-20'>{parseFloat(recipe[0]?.proteins).toFixed(1)}</div>
                                            </div>
                                            <div className='border-light-grey'>
                                                <div className='pd-b-5'>Жиры</div>
                                                <div id="fats" className='f-s-20'>{parseFloat(recipe[0]?.fats).toFixed(1)}</div>
                                            </div>
                                            <div className='border-light-grey'>
                                                <div className='pd-b-5'>Углеводы</div>
                                                <div id="carbohydrates" className='f-s-20'>{parseFloat(recipe[0]?.carbohydrates).toFixed(1)}</div>
                                            </div>
                                            <div className='border-light-grey'>
                                                <div className='pd-b-5'>Калории</div>
                                                <div id="calories" className='text-red f-s-20'>{parseFloat(recipe[0]?.calories).toFixed(1)}</div>
                                            </div>
                                            <div className='border-light-grey'>
                                                <div className='pd-b-5'>Граммы</div>
                                                <div><input onChange={((e)=>{calc(e)})} className='input-gr' type="number" placeholder="100" /></div>
                                            </div>                                            
                                        </div>
                                    </>
                                }
                                </>
                                    {recipe[0]?.note && <div className='flex-block pd-t-20'>
                                            <div>
                                                <h2>О рецепте:</h2> 
                                                  
                                            </div>                                           
                                            {!noteBlock &&
                                                <div>
                                                    <span className='icon-block'>                                                 
                                                        <img onClick = {handleOpenNote} className='img_main pd-t-30' src="/icons/icon-close-block.png" alt=""/>                       
                                                    </span>                                                          
                                                </div>
                                            }
                                            {noteBlock &&
                                                <div>
                                                    <span className='icon-block'>                                                 
                                                        <img onClick = {handleCloseNote} className='img_main pd-t-30' src="/icons/icon-open-block.png" alt=""/>                       
                                                    </span>                                                     
                                                </div>
                                            }                                              
                                </div>}
                                {noteBlock &&<p className='note'>{recipe[0]?.note}</p>}
                                <div ref={componentRef}>                                    
                                        <div className='flex-block'>
                                            <div>
                                                <h2 className='pd-l-0'>Ингредиенты:</h2>   
                                            </div>                                                                                                                         
                                            {!ingredBlock &&
                                                <div>
                                                    <span className='icon-block'>                                                 
                                                        <img onClick = {handleOpen} className='pd-t-30' src="/icons/icon-close-block.png" alt=""/>                       
                                                    </span>                                                          
                                                </div>
                                            }
                                            {ingredBlock &&
                                                <div> 
                                                    <span className='icon-block'>                                                 
                                                        <img onClick = {handleClose} className='pd-t-30' src="/icons/icon-open-block.png" alt=""/>                       
                                                    </span>                                                     
                                                </div>
                                            }                                              
                                        </div>
                                        <div>
                                        {ingredBlock&&(ingredientsArr?.length===0||ingredientsArr===null) && <div className="pd-b-40 pd-t-20"><p className='ingredients pd-b-40 pd-t-40' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe[0].ingredients),}}></p></div>}                                        
                                        {ingredBlock&&ingredientsArr&&ingredientsArr?.length>0 && 
                                        <div>                                            
                                            <div className='ingredients pd-b-40 pd-t-40'>
                                                {ingredientsArr.map((v, i, arr) => {
                                                    let str = v.replace(/\*/g, '"');
                                                    let obj = JSON.parse('{"obj":[' + str + ']}');
                                                    return (
                                                        <div className='pd-l-30' key={`ingredient+${i}`}>
                                                            {obj.obj[0]?.type==='группа' &&
                                                                <h3 className='pd-b-20'>{`${obj.obj[0].value}`}</h3>
                                                            }
                                                            {obj.obj[0]?.type==='ингредиент' &&
                                                                <li>{`${obj.obj[0].value}`}</li>                                            
                                                            }
                                                        </div>                                    
                                                )})}   
                                                </div>                                      
                                            {linksArr&&linksArr?.length>0 && 
                                            <div className='pd-b-40 pd-l-30 linkWrap'>
                                                <h3 className='pd-b-20 pd-l-30 pd-t-30'>Ссылки:</h3>   
                                                <div className='pd-b-40'>
                                                    {linksArr.map((v, i, arr) => {
                                                        let str = v.replace(/\*/g, '"');
                                                        let obj = JSON.parse(str);
                                                        return (
                                                            <div className='pd-l-30' key={`link+${i}`}>                                                            
                                                                <a href={obj.link}>{obj.name}</a>
                                                            </div>                                    
                                                    )})} 
                                                    </div>
                                                </div>}                                                
                                            </div>}
                                        </div>                                                                                                                                                     
                                    <div className='cooking-edit'>
                                            <div>
                                                <div className='flex-block'>
                                                <div><h2>Приготовление:</h2></div>
                                                {recipeBlock &&                                                 
                                                    <div>
                                                        <span className='icon-block'>                                                 
                                                            <img onClick = {handleOpenRecipe} className='img_main pd-t-15' src="/icons/icon-close-block.png" alt=""/>                       
                                                        </span>                                                          
                                                    </div>
                                                }                                                                                        
                                                {!recipeBlock &&
                                                    <div>
                                                        <span className='icon-block'>                                                 
                                                            <img onClick = {handleCloseRecipe} className='img_main pd-t-15' src="/icons/icon-open-block.png" alt=""/>                       
                                                        </span>                                                     
                                                    </div>
                                                }  </div>
                                            {!recipeBlock&&cookArr?.length===0 && <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe[0].cooking),}}></p>}
                                            {!recipeBlock&&cookArr?.length===0 && <div className='pd-b-80'></div>}
                                            {cook&&!recipeBlock&&!cookArr && cook.map((item, index) => {return (
                                                <div key={`cook_${index}`}>
                                                    {item.step && <h3>{`${item.step}`}</h3>}
                                                    {item.cook && <p>{`${item.cook}`}</p>}
                                                    {item.img && <><img src={`/upload/recipe_add_imgs/${item.img}`} alt={`"${recipe[0]?.name}"`}/></>}                                            
                                                </div>                                    
                                            )})}
                                            {cook&&!recipeBlock&&!cookArr && <div className='pd-b-80'></div>}
                                            {cookArr&&!recipeBlock && cookArr.map((v, i, arr) => {
                                                let str = v.replace(/\*/g, '"');
                                                let obj = JSON.parse('{"obj":[' + str + ']}');
                                                return (
                                                    <div key={`cook+${i}`}>
                                                        {obj.obj[0]?.type==='шаг' &&
                                                            <h3>{`${obj.obj[0].value}`}</h3>
                                                        }
                                                        {obj.obj[0]?.type==='приготовление' &&
                                                           <p>{`${obj.obj[0].value}`}</p>                                          
                                                        }
                                                        {obj.obj[0]?.type==='рисунок' &&
                                                            <img src={`https://storage.yandexcloud.net/vseresepty/${obj.obj[0].value}`} alt={`"${recipe[0]?.name}"`}/>                                           
                                                        }
                                                    </div>                                    
                                                )})} 
                                                {cookArr&&!recipeBlock && <div className='pd-b-80'></div>}                                              
                                            </div>
                                    </div>  
                            </div>                                    
                        </div>  
                        {(recipe[0].useremail===authCheck.currentUser) &&  
                        <>
                            <div className='buttonRightWrap mr-b-40 pd-t-40'> 
                                <button className='buttonTransparent'>
                                    <Link href={`/users/edit_recipe?cat=${cat}&id=${id}`}><span>ПРАВИТЬ</span></Link>
                                </button>
                                <button className='buttonOrange' onClick={() => setModal(true)}>Удалить Рецепт</button>
                            </div>                                            
                                <> 
                                    <Modal
                                        isVisible={modal}
                                        title="Удалить рецепт"
                                        content={<p>Вы хотите удалить данный рецепт?</p>}
                                        footer={<button className='buttonWhiteSm' onClick={handleDelete}>ДА</button>}
                                        onClose={() => setModal(false)}    
                                    />  
                                </>
                        </>
                        }

                        <div className='flex-block'>
                            <h2 className='sliderWrapSmH2'>Полезные статьи:</h2>
                            {!articlesBlock &&
                                <div>
                                    <span className='icon-block'>                                                 
                                        <img onClick = {handleOpenArticles} className='img_main pd-t-30' src="/icons/icon-open-block.png" alt=""/>                       
                                    </span>                                                          
                                </div>
                            }
                            {articlesBlock &&
                                <div>
                                    <span className='icon-block'>                                                 
                                        <img onClick = {handleCloseArticles} className='img_main pd-t-30' src="/icons/icon-close-block.png" alt=""/>                       
                                    </span>                                                     
                                </div>
                            } 
                        </div>
                        {!articlesBlock &&                       
                            <div className='articles_flex_recipe pd-b-40'>                            
                                {articles&&miniText&&sections && 
                                    <>
                                        {articles.map((article, i) =>                                            
                                            <>{sections[i]==="true" && <>
                                            <div key={`article+${i}`} className='articles_unit_recipe display-flex'>                                        
                                                <img src={`https://storage.yandexcloud.net/vseresepty/${article.img_main}`} />
                                                <div>                                            
                                                    <h2>{article.name}</h2>  
                                                    <span className='articles_unit_text_recipe'>
                                                        <a href={`/articles/article?id=${article.id}`}>{miniText[i]}
                                                            <img className='artcles_sm' src="/img/transparent-p.png" />
                                                        </a>                                       
                                                    </span>
                                                    <span className='articles_unit_footer artcles_sm'>
                                                        <span className='articles_unit_footer_flex_recipe'>
                                                            <span className='pd-l-15'>{DateFormatDMY(article.date)}</span>
                                                            <span className='pd-r-15'>
                                                                <img src="/icons/icon_comments.png" className='articles_unit_footer_number articles_icon_comments' />    
                                                                <span className='articles_unit_footer_number'><span className='articles_unit_footer_number'>
                                                                    {article.commentsLength}
                                                                </span>                                                               
                                                                </span>
                                                                <img src="/icons/icon_likes.png" className='articles_icon_likes' />
                                                                <span className='articles_unit_footer_number'>{article.likes}</span>
                                                            </span>
                                                        </span>                                    
                                                    </span> 
                                                </div>  
                            
                                            </div>                                        
                                        </>}
                                            </>
                                        )}
                                    </>
                                }
                                <div className='buttonRightWrap mr-b-40'> 
                                    <button className='buttonTransparent'>
                                        <Link href={`/articles`}><span>ВСЕ СТАТЬИ</span></Link>
                                    </button>
                                </div>    
                            </div>
                        }

                        {visitedPagesUnuque.length>1 && <>
                            <h2 className='sliderWrapSmH2'>Вы просматривали:</h2>
                            {visitedPages.visited.length>4 &&
                                <div className='pd-b-80'>
                                    <SliderSlick array={visitedPagesUnuque} />
                                </div>
                            }
                            {visitedPagesUnuque.length<5 &&
                            <>                                
                                <div className='sliderWrapSm pd-b-80 pd-t-5'>
                                    {
                                    visitedPagesUnuque.map ((x,i) => 
                                        <div key={`visited+${i}`}>
                                            <a href={`${x.page}`}>
                                                {x.img!==undefined &&
                                                    <div key={`${x.page}+${i}`}>
                                                        <img src={`${x.img}`} />
                                                    </div>
                                                }  
                                            </a>                         
                                        </div>)
                                    }
                                </div>
                                </>
                            }
                            </>
                        }
                        <div ref={refReviews}>   
                            <div className='flex-block'>                     
                                <h2 className='review' id="reviews">Отзывы</h2>                                                                   
                                    {!reviewBlock &&
                                        <div>
                                            <span className='icon-block'>                                                 
                                                <img onClick = {handleOpenReview} className='pd-t-30' src="/icons/icon-close-block.png" alt=""/>                       
                                            </span>                                                          
                                        </div>
                                    }
                                    {reviewBlock &&
                                        <div>
                                            <span className='icon-block'>                                                 
                                                <img onClick = {handleCloseReview} className='pd-t-30' src="/icons/icon-open-block.png" alt=""/>                       
                                            </span>                                                     
                                        </div>
                                    }                                              
                            </div> 
                            {reviews.params.length===0&&reviewBlock && <p className='f-s-14'>Отзывы отсутсвуют. Будьте первым кто напишет отзыв.</p>}
                            {(img.length===0&&reviewBlock) &&                    
                                <div ref={refPhotos}>
                                    <p className='f-s-14'>Фото отсутствуют. Вы можете разместить свои фото.</p>  
                                </div>
                            }
                            {(authCheck.auth) && userReview && <>
                                <div className=''>                                                                      
                                    <div className='reviewWrap'>  
                                        <p className='pd-t-30 f-s-18'>Здесь вы можете оставить свой отзыв.</p>                                                                            
                                            <div><p className='f-s-12'>Ознакомьтесь с нашими <span onClick={handleCommunityRules} className='linkGray'>Правилами сообщества</span> об отзывах.</p></div>
                                                <div className='review-block'>
                                                    <img src="/icons/icon_recipe.png" alt=""/>
                                                    <h2>{recipe[0]?.name}</h2> 
                                                </div>
                                                <h4 className='pd-t-50'>Ваш рейтинг</h4>
                                                <ChoiсeStarRating                 
                                                    count={5}
                                                    size = {50}
                                                    activeColor={"rgb(211, 28, 3)"}
                                                    inactiveColor={"rgba(0, 0, 0, 0.15)"}
                                                    onChange={handleChangeRating}
                                                    rating = {changeRating}
                                                    rightBlock = {true}
                                                ></ChoiсeStarRating>                                                
                                                <h4 className='pd-t-20'>Ваш отзыв</h4>
                                                <textarea type="text" name="title" placeholder="Что вы думаетет об этом рецепте? Меняли ли вы рецепт, есть ли у вас какие либо замечания?" onChange={((e)=>setNote(e.target.value))}  />                                                
                                                <h4 className='pd-b-20 pd-t-20'>Фото рецепта</h4>                                                    
                                                <AddImage pathToSave="https://storage.yandexcloud.net/vseresepty" btnClass="buttonTransparentBorder mr-b-10" clickBtn={clickReviewImg} btnCropId="btnReviewCropImg" defaultImage="/icons/icon_avatar.png" canvasId="imageReviewCanvas" imgId="imageReview" imgClass=""/>
                                                <Modal
                                                    isVisible={thirdModal}
                                                    title="Правила сообщества"
                                                    content={<CommunityRules />}
                                                    onClose={() => setThirdModal(false)}    
                                                />   
                                                <div className='text-right' >
                                                    <button className='buttonOrange' type="submit" onClick={sendUserReview}>Сохранить</button>                                                                                                     
                                                </div>
                                            </div>                                                            
                                        </div> 
                                    </> 
                                }
                        {(authCheck.auth===false&&reviewBlock) && <div className='pd-t-20'><p className='error'>Чтобы оставить отзыв требуется <a className="linkGray" href="/auth/login" alt="">авторизация.</a></p></div>}                                        
                        
                        {reviews.params.length>0&&reviewBlock && <>
                            {reviews.params &&
                                <div className='reviewItemWrap'>                                                               
                                    {((authCheck.auth===true) && !userReview) && <div className='pd-b-20'><p>Вы уже оставляли свой отзыв. Спасибо!</p></div>}                                
                                        {reviews?.params?.map((item, index) => {
                                            return (  
                                                <div className='reviewItem pd-t-30' key={`review+${index}`}>
                                                    <h4>{item.user}</h4>
                                                    <StarRating                    
                                                        count={5}
                                                        size = {20}
                                                        rating = {item.rating}
                                                    ></StarRating>  
                                                    <p>{item.review}</p>
                                                </div>
                                            )}
                                        )} 
                                </div> 
                            }
                            </>
                        }
                        </div>
                        </>
                    }

                    {(img.length>0&&reviewBlock) &&                    
                        <>
                        <h2 className='sliderWrapSmH2'>Галерея наших подписчиков</h2>
                        <div ref={refPhotos}>          
                            <ImageGallery items={img} />
                        </div>
                        </>
                    }
                </div>
            </div>
        </div>
      <Footer/>
    </>     
  )
}

export default FoodTypeRecipe
