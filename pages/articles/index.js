"use client"
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HeroSlider from '../components/hero-slider';
import HoverEffect from '../components/hover-effect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import HeadMetaTags from '../components/head';


const AllArticles = () => {
    // useEffect(() => {         
    //       const metaDescription = document.querySelector('meta[name="description"]');
    //       const metaKeywords = document.querySelector('meta[name="keywords"]');
    //       const metaOgTitle = document.querySelector('meta[property="og:title"]');
    //       const metaOgDescription = document.querySelector('meta[property="og:description"]');
    //       const metaTwitterTitle = document.querySelector('meta[property="twitter:title"]');
    //       const metaTwitterDescription = document.querySelector('meta[property="twitter:description"]');
    //       const title=`Полезные статьи о кулинарии рецепты народов мира`;
    //       const description=`Полезные статьи о кулинарии рецепты народов мира приготовления вкусных блюд с пошаговым фото кулинария recipe cooking`;
    //       const keywords=`Полезные статьи о кулинарии рецепты народов мира приготовления вкусных блюд с пошаговым фото кулинария recipe cooking`;
    //       const metaTitle = document.querySelector('title');
    //       metaTitle.textContent= "Полезные статьи о кулинарии рецепты народов мира";
    //       metaDescription.setAttribute('content', description);
    //       metaKeywords.setAttribute('content', keywords);
    //       metaOgTitle.setAttribute('content', title);
    //       metaOgDescription.setAttribute('content', description);
    //       metaTwitterTitle.setAttribute('content', title);
    //       metaTwitterDescription.setAttribute('content', description);        
    // }, []);

    const slider = [
        {
            src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
                <source src="video/12345-4891.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle1"/>
                </video>`,
            h2 : "Современность",
            p: "Гастрономия — это всегда нечто большее, чем просто прием пищи. Она служит отражением эпохи, культурных трансформаций и внедрения современных технологий.",
            a: "/articles/article_tendetsii"
        },
        {
            src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
                <source src="video/12345-4875.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle2"/>
                </video>`,
            h2 : "Наслаждение",
            p: "Тонким вкусом обладают не многие, но для истинных ценителей еды, дегустация и оценка блюд являются не только наслаждением, но и своего рода наукой!",
            a: "/articles/article_gurman"
        },
        {
            src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
                <source src="video/12345-4882.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle3"/>
                </video>`,
            h2 : "Утонченность",
            p: "Можно ли наслаждаться вкусом блюда, без изысканной подачи? Эстеты предпочитают идеал во всем!",
            a: "/articles/article_estetica"
        },
        {
            src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
                <source src="video/12345-4892.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle4"/>
                </video>`,
            h2 : "Смекалка",
            p: "Бытовые секреты - это настоящая кулинарная магия! Они помогут избежать небольших трудностей и сделать процесс приготовления проще.",
            a: "/articles/article_lifehaki"
        },
        {
            src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
                <source src="video/12345-4878.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle5"/>
                </video>`,
            h2 : "Красота",
            p: "Творческие натуры сделают из простых предметов стола и окружающих предметов настоящие произведения искусства!",
            a: "/articles/article_decor"
        },
        // {
        //     src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
        //             <source src="video/12345-4873.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle6"/>
        //         </video>`,
        //     h2 : "Цель",
        //     p: "При покупке, приготовлении и употреблении продуктов, не стоит забывать, что основная цель пищи - получение необходимых микроэлементов без ущерба здоровью.",
        //     a: "/articles/article_zdorovie"
        // },
        {
            src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
                    <source src="video/12345-4888.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle7"/>
                </video>`,
            h2 : "Природа",
            p: "Отдых от городской суеты - это своего рода ритуал, роднящий нас с далекими предками, вдыхающий в пищу особую энергетику, вкус и аромат!",
            a: "/articles/article_piknik"
        },
        // {
        //     src : `<video id="Media-Audio" autoplay="autoplay" muted loop="loop">    
        //             <source src="video/12345-4884.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' alt="cookArticle8"/>
        //         </video>`,
        //     h2 : "История",
        //     p: "Знания о культуре кухонных мировых традиций, безусловно являются признаком эрудированного человека, уважительно относящегося к истории человечества.",
        //     a: "/articles/article_kultura"
        // },      
    ]

    const cdMarker = [
        {
            classNameLi: "selected",
            a: "#0",
            classNameA: "",
            text: "ТЕНДЕНЦИИ"
        },
        {
            classNameLi: "",
            a: "#0",
            classNameA: "mr-l-10-cd-hero",
            text: "ГУРМАН"
        },
        {
            classNameLi: "",
            a: "#0",
            classNameA: "pd-l-15",
            text: "ЭСТЕТИКА"
        },
        {
            classNameLi: "",
            a: "#0",
            classNameA: "mr-l-15-cd-hero pd-l-10 pd-l-20-sm",
            text: "ЛАЙФХАКИ"
        },
        {
            classNameLi: "",
            a: "#0",
            classNameA: "pd-l-20",
            text: "ДЕКОР"
        },
        // {
        //     classNameLi: "",
        //     a: "#0",
        //     classNameA: "",
        //     text: "ЗДОРОВЬЕ"
        // },
        {
            classNameLi: "",
            a: "#0",
            classNameA: "",
            text: "ПИКНИК"
        },
        // {
        //     classNameLi: "",
        //     a: "#0",
        //     classNameA: "",
        //     text: "КУЛЬТУРА"
        // }     
    ]

  
  return (
    <>
        <HeadMetaTags
            description={`статьи про кулинарию, здоровье, пищевые добавки, продукты, полезные, мировые тенденции, кулинарные тренды, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            title={`статьи про кулинарию`}
            keywords={`статьи про кулинарию, здоровье, пищевые добавки, продукты, полезные, мировые тенденции, кулинарные тренды, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            content="all"
            ogTitle={`статьи про кулинарию`}
            ogDescription={`статьи про кулинарию, здоровье, пищевые добавки, продукты, полезные, мировые тенденции, кулинарные тренды, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle={`статьи про кулинарию`}
            twitterDescription={`статьи про кулинарию, здоровье, пищевые добавки, продукты, полезные, мировые тенденции, кулинарные тренды, рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />
       <Navbar/>   
        <HeroSlider slider={slider} cdMarker={cdMarker} /> 
        <div className='article-content'/>      
        <div className='article-wrap'>        
            <div className='article-child-wrap'>      
                <HoverEffect type="Steve" aText="text" aSrc="/articles/chapter_article?name=health" imgSrc="/img/1.jpg" imgAlt="alt" h2="Здоровье" p="Основная цель пищи - получение необходимых микроэлементов без ущерба здоровью." />        
                <HoverEffect type="Steve" aText="text" aSrc="/articles/chapter_article?name=compound" imgSrc="/img/2.jpg" imgAlt="alt" h2="Состав" p="Разбираемся в тонкостях состава, маркировки, знаков и символов продуктов." />  
                <HoverEffect type="Steve" aText="text" aSrc="/articles/chapter_article?name=kitchen" imgSrc="/img/14.jpg" imgAlt="alt" h2="Кухня" p="Знания о культуре кулинарных мировых традиций, помогают стать настоящим профессионалом!" />        
             </div>  
        </div>
        <div className='clear-both pd-b-180 pd-t-40'>                   
            <div className='article-content pd-b-80'>                  
                <h1 className='text-center pd-t-80-art f-s-57'>Гид по приправам</h1>   
                <p>В современном мире существует огромное количество специй, соусов и других ингредиентов, украшающих, оттеняющих и изысканно подчеркивающих вкус основных блюд. Узнав о секретах использования, составе, пользе и сочетаниях с другими продуктами, вы станете настоящим кулинаром и мастером своего дела!</p>   
                 <ul className="ch-grid">
                    <li>
                        <div className="ch-item ch-img-1">
                            <div className="ch-info">
                                <h3>Специи</h3>
                                <p><a href="/articles/chapter_article?name=spices">Перейти</a></p>
                            </div>
                        </div>
                        <div className='pd-t-20 linkColor'><h3><a href="/articles/chapter_article?name=spices">Специи</a></h3></div>
                    </li>
                    <li>
                        <div className="ch-item ch-img-2">
                            <div className="ch-info">
                                <h3>Соусы</h3>
                                <p><a href="/articles/chapter_article?name=sauces">Перейти</a></p>
                            </div>            
                        </div>
                        <div className='pd-t-20 linkColor'><h3><a href="/articles/chapter_article?name=sauces">Соусы</a></h3></div>
                    </li>
                    <li>
                        <div className="ch-item ch-img-3">
                            <div className="ch-info">
                                <h3>Масло</h3>
                                <p><a href="/articles/chapter_article?name=oil">Перейти</a></p>
                            </div>            
                        </div>
                        <div className='pd-t-20 linkColor'><h3><a href="/articles/chapter_article?name=oil">Масло</a></h3></div>
                    </li>
                    <li>
                        <div className="ch-item ch-img-4">
                            <div className="ch-info">
                                <h3>Травы</h3>
                                <p><a href="/articles/chapter_article?name=greens">Перейти</a></p>
                            </div>
                        </div>
                        <div className='pd-t-20 linkColor'><h3><a href="/articles/chapter_article?name=greens">Травы</a></h3></div>
                    </li>
                    <li>
                        <div className="ch-item ch-img-5">
                            <div className="ch-info">
                                <h3>Жидкости</h3>
                                <p><a href="/articles/chapter_article?name=liquid">Перейти</a></p>
                            </div>
                        </div>
                        <div className='pd-t-20 linkColor'><h3><a href="/articles/chapter_article?name=liquid">Жидкости</a></h3></div>
                    </li>
                    <li>
                        <div className="ch-item ch-img-6">
                            <div className="ch-info">
                                <h3>Намазки</h3>
                                <p><a href="/articles/chapter_article?name=spread">Перейти</a></p>
                            </div>
                        </div>
                        <div className='pd-t-20 linkColor'><h3><a href="/articles/chapter_article?name=spread">Намазки</a></h3></div>
                    </li>
                </ul>
            </div>           
            <div className='article-content pd-b-80 pd-t-20'>
                <h1 className='text-center f-s-57'>Вокруг света</h1>   
                <p>Ознакомиться с кухней разных народов мира в наши дни можно не выходя из дома. Возможно ли оценить полноценный вкус блюд не посетив страну, в которой блюдо зародилось и не попробовав местную кухню? Прежде чем пробовать не обычное для вас блюдо, возможно стоит изучить каким вкусом, остротой или степенью пржарки обладает блюдо, особенно если кухня разительно отличается от культуры приготовления в вашей стране. Пробуем готовить сами или наслаждаемся ресторанным приготовлением!</p>     
            </div>
            <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 10000,            
            disableOnInteraction: false,
            parallax: true
            }}
            speed= {1000}
            lazy={true}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
                <SwiperSlide><div><div className='swipper-slider-right'><h3>РЫБА И МОРЕПРОДУКТЫ</h3><a href="/articles/chapter_article?name=seafood">Блюда из морепродуктов готовятся во всех странах. Есть такие, которые вошли в историю и которые непременно стоит попробовать.</a><p/><button><a href='/articles/chapter_article?name=seafood'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-114.jpg" /></div></SwiperSlide>                    
                <SwiperSlide><div><div className='swipper-slider-right'><h3>СВЕЖЕСТЬ ФРУКТОВ</h3><a href="/articles/chapter_article?name=drinks">В каждой стране благодаря особенностям климата и национальным вкусам есть свои рецепты приготовления напитков.</a><p/><button><a href='/articles/chapter_article?name=drinks'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-107.jpg" /></div></SwiperSlide>  
                <SwiperSlide><div><div className='swipper-slider-right'><h3>МАГИЯ ЗАПРАВОК</h3><a href="/articles/chapter_article?name=seasoning">Секретные ингредиенты заправок могут сделать даже самое простое блюдо изысканным и аппетитным!</a><p/><button><a href='/articles/chapter_article?name=seasoning'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-64.jpg" /></div></SwiperSlide>                                                                                                               
                <SwiperSlide><div><div className='swipper-slider-right'><h3>СРЕДИЗЕМНОМОРСКАЯ КУХНЯ</h3><a href="/articles/chapter_article?name=sea_kitchen">Попробуйте блюда с дуновением моря, с привкусом оливок, морепродуктов и молочных продуктов.</a><p/><button><a href='/articles/chapter_article?name=sea_kitchen'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-113.jpg" /></div></SwiperSlide>  
                <SwiperSlide><div><div className='swipper-slider-right'><h3>АРОМАТ КОФЕ</h3><a href="/articles/chapter_article?name=coffee">В разных странах существуют свои уникальные традиции и способы приготовления кофе. Кофеманы мира делятся секретами приготовления!</a><p/><button><a href='/articles/chapter_article?name=coffee'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-74.jpg" /></div></SwiperSlide>                       
                <SwiperSlide><div><div className='swipper-slider-right'><h3>РОМАНТИЧЕСКИЙ ЗАВТРАК</h3><a href="/articles/chapter_article?name=romantic_breakfast">Хотите удивить или просто порадовать вторую половинку и ищете идеи? Возможно вам понравится кое-что из наших секретов!</a><p/><button><a href='/articles/chapter_article?name=romantic_breakfast'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-130.jpg" /></div></SwiperSlide>  
                <SwiperSlide><div><div className='swipper-slider-right'><h3>ВКУС ДЕСЕРТА</h3><a href="/articles/chapter_article?name=dessert">Считаете себя настоящим гурманом? Тогда предлагаем интересные идеи, что можно попробовать во время путешествий или приготовить самим.</a><p/><button><a href='/articles/chapter_article?name=dessert'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-125.jpg" /></div></SwiperSlide>                      .                                                                       
                <SwiperSlide><div><div className='swipper-slider-right'><h3>УЖИН НА ДВОИХ</h3><a href="/articles/chapter_article?name=romantic_dinner">Для создания атмосферы романтики идеально подойдет уединенный романтитческий ужин. Как использовать рецепты разных стран мира чтобы покорить любимого?</a><p/><button><a href='/articles/chapter_article?name=romantic_dinner'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-71.jpg" /></div></SwiperSlide>                                            
                <SwiperSlide><div><div className='swipper-slider-right'><h3>ОВОЩНОЙ МИКС</h3><a href="/articles/chapter_article?name=vegetables">Как и любые другие виды блюд, овощные блюда не остались в стороне и занимают важное место в национальных кухнях разных стран мира.</a><p/><button><a href='/articles/chapter_article?name=vegetables'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-57.jpg" /></div></SwiperSlide>  
                <SwiperSlide><div><div className='swipper-slider-right'><h3>МЯСНЫЕ ТРАДИЦИИ</h3><a href="/articles/chapter_article?name=meat">Нет ничего более питательного и сытного, чем мясные блюда. Готовим вкуснейшие сочные и ароматные блюда из мяса, используя секреты разных стран мира!</a><p/><button><a href='/articles/chapter_article?name=meat'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-126.jpg" /></div></SwiperSlide>              
                <SwiperSlide><div><div className='swipper-slider-right'><h3>МАНЯЩАЯ ЭКЗОТИКА</h3><a href="/articles/chapter_article?name=exotic">Какие удивительные кулинарные шедевры, способные поразить даже самых искушённых гурманов, придумали кулинары со всех концов света?</a><p/><button><a href='/articles/chapter_article?name=exotic'>ПОДРОБНЕЕ</a></button></div><img src="/gallery/44455-115.jpg" /></div></SwiperSlide>  
            </Swiper> 
        </div> 
        <div className='pd-b-140'></div>
        <div className='clear-both'>                   
            <Footer/>
        </div>                 
    </>
  )
}

export default AllArticles