"use client"
import React from 'react';
import Navbar from '../components/navbar';
import HeadMetaTags from '../components/head';

const AllArticles = () => {    

    return (
    <>
        <HeadMetaTags
            description={`статьи про кулинарию, здоровье, полезные, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            title={`статьи про здоровье и правильное питание`}
            keywords={`статьи про кулинарию, здоровье, полезные, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            content="all"
            ogTitle={`статьи про здоровье и правильное питание`}
            ogDescription={`статьи про кулинарию, здоровье, полезные, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle={`статьи про здоровье и правильное питание`}
            twitterDescription={`статьи про кулинарию, здоровье, полезные, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />
        <Navbar/>   
        <div>                  
            <div>               
                <div className='article'>
                <img src='/img/9.jpg' />
                <div className='article_wrap pd-t-40'>
                    <h1>Здоровье</h1>
                    <p>Еда и здоровье тесно связаны: сбалансированное питание обеспечивает организм энергией и строительными материалами для клеток, влияя на общее состояние, настроение и даже риск развития заболеваний.</p>
                    <p>Правильное питание, включающее разнообразные продукты, регулярный прием пищи и умеренное потребление вредных веществ, способствует хорошему самочувствию и долголетию. Соблюдение принципов здорового питания - это образ жизни, который способствует укреплению здоровья, повышению энергии и улучшению общего самочувствия.</p>                    
                    <p>Делимся советами и рекомендациями для здорового рациона.</p>
                    <span className='pd-t-80 btn_article'><a href='/articles/chapter_article?name=health'>ПОДРОБНЕЕ &#62;&#62;</a></span>
                </div>
                </div>
            </div>           
        </div>  
                
    </>
  )
}

export default AllArticles