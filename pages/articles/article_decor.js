"use client"
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import HeadMetaTags from '../components/head';



const AllArticles = () => {    
    const intervalRef = useRef();
    // useEffect(() => {
    //     intervalRef.current = setInterval(() => {         
    //       const metaDescription = document.querySelector('meta[name="description"]');
    //       const metaKeywords = document.querySelector('meta[name="keywords"]');
    //       const metaOgTitle = document.querySelector('meta[property="og:title"]');
    //       const metaOgDescription = document.querySelector('meta[property="og:description"]');
    //       const metaTwitterTitle = document.querySelector('meta[property="twitter:title"]');
    //       const metaTwitterDescription = document.querySelector('meta[property="twitter:description"]');
    //       const title=`Декор и украшение блюд праздничного стола`;
    //       const description=`Декор праздничного стола рецепт приготовления вкусных блюд с пошаговым фото кулинария красивая еда украшение кухни recipe cooking`;
    //       const keywords=`Декор праздничного стола рецепт приготовления вкусных блюд с пошаговым фото кулинария recipe cooking`;
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
    // }, []);


  return (
    <>
        <HeadMetaTags
            description={`статьи про кулинарию Декор праздничного стола рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            title={`Декор праздничного стола`}
            keywords={`статьи про кулинарию Декор праздничного стола рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            content="all"
            ogTitle={`Декор праздничного стола`}
            ogDescription={`статьи про кулинарию Декор праздничного стола рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle={`Декор праздничного стола`}
            twitterDescription={`статьи про кулинарию Декор праздничного стола рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />
        <Navbar/>   
        <div>                  
            <div>               
                <div className='article'>
                    <img src='/img/8.jpg' />
                    <div className='article_wrap pd-t-40'>
                        <h1>Декор праздничного стола</h1>
                        <p>Украшение праздничного стола — это настоящее искусство, которое способствует созданию особой атмосферы и подчеркивает важность события. Эстетичный декор стола становится неотъемлемой частью общего впечатления от торжества. Использование элементов декора, ярких акцентов и современных трендов вдохновит вас и поможет сделать ваш праздник незабываемым.</p>
                        <h1 className='pd-t-140'>Дизайн интерьера</h1>
                        <p>Одним из важных правил при выборе предметов для оформления интерьера является их соответствие выбранному стилю. Чем лучше сочетаются между собой отдельные элементы, тем более гармоничным и завершенным выглядит общее впечатление. Особое значение имеет подбор цветов и размеров предметов, а также их функциональность — все эти аспекты вместе создают уютную и продуманную атмосферу в помещении.</p>
                        <h1 className='pd-t-140'>Украшение блюд</h1>
                        <p>Декор блюд, или украшение блюд, — это важная часть кулинарии, которая помогает сделать еду более привлекательной и аппетитной. Это не только придает блюду эстетическую ценность, но и может подчеркнуть его вкус и текстуру. Существует множество способов украшения блюд, которые можно разделить на несколько категорий.</p>
                        <p>Полезные советы для декора вы можете найти в наших статьях.</p>
                        <span className='btn_article'><a href='/articles/chapter_article?name=decor'>ПОДРОБНЕЕ &#62;&#62;</a></span>
                    </div>                    
                </div>
            </div>           
        </div>  
                
    </>
  )
}

export default AllArticles