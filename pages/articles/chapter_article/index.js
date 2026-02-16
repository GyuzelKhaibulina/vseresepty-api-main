"use client"
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useSearchParams } from 'next/navigation';
import DateFormatDMY from '../../services/date-format';
import HeadMetaTags from '../../components/head';


const ChapterArticle = () => {    
    const name = useSearchParams().get('name');
    const [nameValue, setNameValue] = useState ("");
    const [articles, setArticles] = useState ([]);
    const [text, setText] = useState ({});
    const [miniText, setMiniText] = useState ({});
    const [sections, setSections] = useState ({});
    const [comments, setComments] = useState ([]);

    const [articlesArr, setArticlesArr] = useState ([]);


    useEffect (() =>    
    {   
        async function getArticles() {
            const res = await fetch(`/api/articles/chapter_article`, {
                    method: "GET",
                }) 
                return res.json().then((data) => {                        
                    setArticles(data); 
                    setText(JSON.parse(data[0].text));    
                    setComments(JSON.parse(data[0].comments));
                }).catch((err) => {
                    return(err);
                });            
            }
        getArticles();                
}, [name]); 

useEffect (() =>    
{   
    if (articles&&articles.length>0) { 
        articles.map((v, i, arr) => {
            let str = v.text.replace(/\*/g, "'");            
            let obj = JSON.parse('{"obj":[' + str + ']}');
            const indexOfFirst = str.indexOf("'type':'параграф'");              
            if(v?.sections?.indexOf(nameValue)!==-1)
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
                    const subStr12 = subStr10.substring(0, 135);
                    miniText[i] = subStr12;
                }
            else miniText[i] = "Читать далее";
            articles.map ((x, i, arr) => {
                let comment = JSON.parse(arr[i].comments);
                arr[i].commentsLength = `${comment.comments.length}`;
            }) 
            })            
        }
        setArticlesArr(articles);
}, [articles, sections]); 

    useEffect (() =>    
    {   
        if (name==="compound") {
            setNameValue ("Состав")
        }
        if (name==="picnic") {
            setNameValue ("Пикник")
        }
        if (name==="health") {
            setNameValue ("Здоровье")
        }
        if (name==="decor") {
            setNameValue ("Декор")
        }
        if (name==="lifehacks") {
            setNameValue ("Лайфхаки")
        }        
        if (name==="aesthetics") {
            setNameValue ("Эстетика")
        }
        if (name==="gourmet") {
            setNameValue ("Гурман")
        }
        if (name==="trends") {
            setNameValue ("Тенденции")
        }
        if (name==="sea_kitchen") {
            setNameValue ("Средиземноморская кухня")
        }
        if (name==="seasoning") {
            setNameValue ("Заправки")
        }
        if (name==="spread") {
            setNameValue ("Намазки")
        }
        if (name==="liquid") {
            setNameValue ("Жидкости")
        }
        if (name==="greens") {
            setNameValue ("Травы")
        }
        if (name==="oil") {
            setNameValue ("Масло")
        }        
        if (name==="sauces") {
            setNameValue ("Соусы")
        }
        if (name==="spices") {
            setNameValue ("Специи")
        }
        if (name==="kitchen") {
            setNameValue ("Кухня")
        }
        if (name==="vegetables") {
            setNameValue ("Овощные блюда")
        }
        if (name==="romantic_dinner") {
            setNameValue ("Романтический ужин")
        }
        if (name==="dessert") {
            setNameValue ("Десерт")
        }
        if (name==="romantic_breakfast") {
            setNameValue ("Романтический завтрак")
        }        
        if (name==="coffee") {
            setNameValue ("Кофе")
        }
        if (name==="drinks") {
            setNameValue ("Напитки")
        }
        if (name==="seafood") {
            setNameValue ("Морепродукты")
        }        
        if (name==="trends") {
            setNameValue ("Тенденции")
        }
        if (name==="season") {
            setNameValue ("Сезонные")
        }
        if (name==="veget") {
            setNameValue ("Вегетарианство")
        }
        if (name==="unusual") {
            setNameValue ("Необычные блюда")
        }
        if (name==="exotic") {
            setNameValue ("Экзотическая кухня")
        }
        if (name==="meat") {
            setNameValue ("Мясные блюда")
        }

}, [name]); 
const intervalRef = useRef();
// useEffect(() => {
//     intervalRef.current = setInterval(() => {      
//       const metaDescription = document.querySelector('meta[name="description"]');
//       const metaKeywords = document.querySelector('meta[name="keywords"]');
//       const metaOgTitle = document.querySelector('meta[property="og:title"]');
//       const metaOgDescription = document.querySelector('meta[property="og:description"]');
//       const metaTwitterTitle = document.querySelector('meta[property="twitter:title"]');
//       const metaTwitterDescription = document.querySelector('meta[property="twitter:description"]');
//       const title=`статьи ${nameValue} и приготовление вкусных блюд`;
//       const description=`статьи ${nameValue} рецепт приготовления вкусных блюд с пошаговым фото кулинария recipe cooking`;
//       const keywords=`статьи ${nameValue} рецепт приготовления вкусных блюд с пошаговым фото кулинария recipe cooking`;
//       const metaTitle = document.querySelector('title');
//       metaTitle.textContent= title;
//       metaDescription.setAttribute('content', description);
//       metaKeywords.setAttribute('content', keywords);
//       metaOgTitle.setAttribute('content', title);
//       metaOgDescription.setAttribute('content', description);
//       metaTwitterTitle.setAttribute('content', title);
//       metaTwitterDescription.setAttribute('content', description);        
//     }, 200);
//     return () => clearInterval(intervalRef.current);
// }, [nameValue]);



    return (
        <>
            <HeadMetaTags
                description={`статьи про кулинарию ${nameValue} рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
                title={`статьи про кулинарию на тему ${nameValue} и приготовление рецептов`}
                keywords={`статьи про кулинарию ${nameValue} рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
                content="all"
                ogTitle={`${nameValue} Рецепты блюд с пошаговым описанием`}
                ogDescription={`${nameValue} Рецепты блюд с пошаговым описанием`}
                ogImage="/public/img/openGrafPreview_1.jpg"
                twitterTitle={`${nameValue} рецепт приготовления блюда cooking recipe`}
                twitterDescription={`${nameValue} приготовить блюдо пошаговый рецепт cooking recipe preparing dish`}
                twitterImage="/public/img/openGrafPreview_1.jpg"
            />
            <Navbar/>   
            <div>                  
                <div className='pd-b-40'>               
                    <div className='breadcrumbs text-center'>
                        <Link href="/articles">СТАТЬИ</Link><><span> / {nameValue}</span></>                                           
                    </div>  
                    <h1 className='f-s-45 text-center'>{nameValue}</h1>                
                    <div className='articles_wrap'>
                        <div className='articles_flex'>                            
                            {articlesArr&&miniText&&sections && 
                                <>
                                    {articlesArr.map((article, i, arr) =>                                            
                                        <>{sections[i]==="true" && <>
                                            <div key={`article`+i} className='articles_unit display-flex'>                                        
                                                <img src={`https://storage.yandexcloud.net/vseresepty/${article.img_main}`} />
                                                <div>                                            
                                                    <h2>{article.name}</h2>  
                                                    <span className='articles_unit_text'>
                                                        <a href={`/articles/article?id=${article.id}`}>{miniText[i]}
                                                            <img src="/img/transparent-p.png" />
                                                        </a>                                       
                                                    </span>
                                                    <span className='articles_unit_footer'>
                                                        <span className='articles_unit_footer_flex'>
                                                            <span className='pd-l-15'>{DateFormatDMY(article.date)}</span>
                                                            <span className='pd-r-15'>
                                                                <img src="/icons/icon_comments.png" className='articles_unit_footer_number articles_icon_comments' />    
                                                                 <span className='articles_unit_footer_number'>{article.commentsLength}</span>                                                               
                                                                <img src="/icons/icon_likes.png" className='articles_icon_likes' />
                                                                <span className='articles_unit_footer_number'>{article.likes}</span>
                                                            </span>
                                                        </span>                                    
                                                    </span> 
                                                </div>                                  
                                            </div>                                        
                                            </>
                                        }
                                        </>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                </div>           
                <Footer/>
            </div>  
                    
        </>
    )
}

export default ChapterArticle