"use client"
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import HeadMetaTags from '../components/head';


const AllArticles = () => {    

  return (
    <>
        <HeadMetaTags
            description={`статьи про кулинарию лайфхаки на кухне рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            title={`лайфхаки на кухне рецепты блюд`}
            keywords={`статьи про кулинарию лайфхаки на кухне рецепты блюд рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            content="all"
            ogTitle={`лайфхаки на кухне рецепты блюд`}
            ogDescription={`статьи про кулинарию лайфхаки на кухне рецепты блюд рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle={`лайфхаки на кухне рецепты блюд`}
            twitterDescription={`статьи про кулинарию лайфхаки на кухне рецепты блюд рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />
        <Navbar/>   
        <div>                  
            <div>               
                <div className='article'>
                <img src='/img/7.jpg' />
                <div className='article_wrap pd-t-40'>
                    <h1>Кухонные лайфхаки</h1>
                    <p>Мечтаете научиться готовить вкусные блюда и поражать гостей и близких изысканными угощениями? Для этого вовсе не обязательно проводить на кухне целые дни.</p>
                    <p>Чтобы создавать вкусные блюда, важно подходить к процессу с душой и немного вдохновения. Также полезно знать полезные кулинарные хитрости, которыми делятся опытные хозяйки и профессиональные шеф-повара элитных ресторанов.</p>
                    <p>Мы хотим поделиться лайфхаками, секретами и советами, которые помогут вам повысить уровень своих кулинарных навыков. </p>
                    <span className='btn_article'><a href='/articles/chapter_article?name=lifehacks'>ПОДРОБНЕЕ &#62;&#62;</a></span>
                </div>
                    
                </div>
            </div>           
        </div>  
                
    </>
  )
}

export default AllArticles