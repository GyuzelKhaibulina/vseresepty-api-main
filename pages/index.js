"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from './components/footer';
import Loading from './components/loading';
import { useRecipesArray } from './context/all_recipes_array';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';
import HeadMetaTags from './components/head';
import StarRating from './services/star_rating';
import Navbar from './components/navbar';

const MainPage = () => {
    const [recipesAll, setRecipesAll] = useState([]);  
    const [isLoading, setIsLoading] = useState([]);  
    const allRecipesArr = useRecipesArray();
    const router = useRouter();
    const [arrImg, setArrImg] = useState([]);

    useEffect (() =>    
    {    
        allRecipesArr;
    }, [allRecipesArr, router]); 
 
    useEffect (() =>    
    {    
         if (allRecipesArr.allRecipesArray.length>0) {
            setIsLoading (allRecipesArr.isLoading);            
            setRecipesAll(allRecipesArr.allRecipesArray);
        }  
    }, [allRecipesArr, router]); 

    useEffect (() =>    
    {   
        const arr = [];
        recipesAll.map((recipe, index) => {
        arr.push (recipe.img_main);
        })
        setArrImg (arr);
}, [allRecipesArr, router]); 


    // useEffect (() =>
    //     {  
            // arrImg - все фото
            //console.log (arrImg)
        //     async function getMainPhotos() {
        //         const img={
        //             arr_img: arrImg
        //         }
        //         const res = await fetch(`/api/unused_photos`, {
        //              method: "POST",
        //             body: JSON.stringify(arrImg),
        //         })                    
        //         return res.json().then((data) => {
            
        //        }).catch((err) => {
        //             return(err);
        //         });
        //           }
        //     getMainPhotos();   
        // }, [arrImg]);


  return (
    <>
        <HeadMetaTags 
            description="рецепты блюд приготовить блюдо пошаговый рецепт готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish"
            title="рецепты приготовления блюд cooking recipes"
            keywords="рецепты,приготовить блюдо, пошаговый рецепт приготовления, готовить вкусную еду, cуп, салат, рулет, закуски, напитки, гарнир, мясо, рыба, выпечка, пирог, пицца, пельмени, манты, суши, жареное, вареное, отварное, диета, вегетарианство, мясные, вкусные, кухни мира, кулинарная книга, готовка блюд, recipes, cooking recipes, kitchen preparing, dishes, cook, eating"
            content="all"
            ogTitle="Рецепты блюд с пошаговым описанием"
            ogDescription="Рецепты блюд с пошаговым описанием"
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle="рецепты приготовления блюд cooking recipes"
            twitterDescription="приготовить блюдо пошаговый рецепт готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish"
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />
        <Navbar/>   

        {/* Баннер Новый год */}            
         {/* <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            }}
            lazy={true}
            speed= {1000} 
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Друзья,</a><p><a href="/filter/festive">наступили приятные новогодние хлопоты!</a></p></div><img src="/gallery/181624-25096.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Время тепла и уюта в кругу семьи и друзей,</a><p><a href="/filter/festive">для которых так хочется приготовить лучшие блюда!</a></p></div><img src="/gallery/181624-25083.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=second">Основные блюда -</a> <p> <a href="/recipes/sort?type=second&subtype=poultry">запеченная утка, мясо по-французски, гусь в яблоках, лосось в вине!</a></p></div><img src="/gallery/181624-25093.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=snacks">Закуски - </a><p><a href="/recipes/sort?type=snacks">рулеты, канапе, тарталетки, соленья и маринады!</a></p></div><img src="/gallery/181624-25098.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=dough">Выпечка и десерт -</a> <p><a href="/recipes/sort?type=dough">имбирные пряники, аппетитные печенья, ароматные булочки и пирожки!</a></p></div><img src="/gallery/181624-25088.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=dough&subtype=sweet">Вкуснейшие сладости -</a> <p><a href="/recipes/sort?type=dough&subtype=sweet">пирожные с кремом, восхитительные торты, муссы и пудинги!</a></p></div><img src="/gallery/181624-250931.jpg"/></div></SwiperSlide>            
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=salad">И конечно наши любимые салаты -</a> <p><a href="/recipes/sort?type=salad">традиционные и новинки!</a></p></div><img src="/gallery/181624-25094.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Запах мандаринов и новогодней елки</a> - <p> <a href="/filter/festive">дарят праздничное сказочное настроение!</a></p></div><img src="/gallery/181624-25092.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Гирлянды, свечи, елочные игрушки и подарки -</a> <p><a href="/filter/festive">погружают в атмосферу детства, добра и веры в чудо!</a></p></div><img src="/gallery/181624-25084.jpg" /></div></SwiperSlide>               
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Пусть Новый 2026 год принесет всем - </a><p><a href="/filter/festive">счастья, мира и благополучия!</a></p></div><img src="/gallery/181624-25085.jpg" /></div></SwiperSlide>                                                     
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">В семьях царит атмосфера любви, добра, понимания, поддержки и уюта</a> <p><a href="/filter/festive">не только в праздники!</a></p></div><img src="/gallery/181624-25097.jpg" /></div></SwiperSlide>                                                                                                      
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Родные, любимые и друзья будут здоровы и счастливы,</a><p>а праздничные столы вас объединяют!</p></div><img src="/gallery/181624-25086.jpg" /></div></SwiperSlide>             
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">И пусть сбываются самые прекрасные, волшебные, </a><p><a href="/filter/festive">несбыточные мечты!</a></p></div><img src="/gallery/181624-25099.jpg" /></div></SwiperSlide>                             
        </Swiper>    */}
        
        {/* Баннер Масленица */}  
        <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            }}
            lazy={true}
            speed= {1000} 
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Ура, Масленица!</a><p><a href="/filter/maslenitsa">Провожаем зиму, встречаем весну! Готовим наши любимы блины, блинчики, блиночки!</a></p></div><img src="/gallery/maslenitsa-1.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Масленица древний славянский праздник проводов зимы и встречи весны.</a><p><a href="/filter/maslenitsa">Блины были символом солнца перед приходом весеннего равноденствия.</a></p></div><img src="/gallery/maslenitsa-7.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Люди пытались "умаслить" наступившую весну, отсюда название Масленица.</a> <p> <a href="/filter/maslenitsa">Пекли баранки, бублики и конечно блины, приправляя сметаной, медом, вареньями, икрой и сметаной.</a></p></div><img src="/gallery/maslenitsa-3.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">На улицах устраивали веселые гулянья, балаганы, хороводы, кулачные бои, прыгали через костер, пели песни.</a><p><a href="/filter/maslenitsa">Празднично наряжались, ходили в гости, угощали блинами бедных.</a></p></div><img src="/gallery/maslenitsa-2.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Каждый день Масленицы имеет свое значение -</a> <p><a href="/filter/maslenitsa">например в среду "Лакомку" зять ходил в гости к теще на блины.</a></p></div><img src="/gallery/maslenitsa-5.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">У каждой семьи рецепт блинов был свой,</a> <p><a href="/filter/maslenitsa">с использованием разных видов муки и других ингредиентов.</a></p></div><img src="/gallery/maslenitsa-6.jpg"/></div></SwiperSlide>            
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Блины готовили исключительно женщины, </a> <p><a href="/filter/maslenitsa">передавая рецепты из поколения в поколение.</a></p></div><img src="/gallery/maslenitsa-8.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">В наши дни Масленица остается одним из наиболее популярных праздников,</a><p> <a href="/filter/maslenitsa">и представляет собой элементы древних языческих обычаев и христианских традиций.</a></p></div><img src="/gallery/maslenitsa-12.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Масленица также семейный праздник, который объединяет родных,</a> <p><a href="/filter/maslenitsa">погружает в атмосферу радости, добра, веселья и встречи весны!</a></p></div><img src="/gallery/maslenitsa-15.jpg" /></div></SwiperSlide>               
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Родные и близкие собираются за одним столом, вкушая блины с медом, вареньем, грибами, рыбой, икрой, сметаной. Присоединятся у уличным ярмаркам в предверии заключительного дня Масленицы.</a><p></p></div><img src="/gallery/maslenitsa-13.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">Готовьте блины с удовольствием, пробуйте различные варианты и сохраняйте свои семейные рецепты блинов.</a><p><a href="/filter/maslenitsa"></a></p></div><img src="/gallery/maslenitsa-10.jpg" /></div></SwiperSlide>                                                                                                                                                                               
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/maslenitsa">В Масленичное воскресенье по древним традициям, которые мы соблюдаем по сей день, чучело Масленицы, символизирующеее уход и зимы, сжигают, и наступает красавица Весна!</a><p></p></div><img src="/gallery/maslenitsa-16.jpg" /></div></SwiperSlide>                             
        </Swiper>    
        
        {/* Баннер Пасха */}               
        {/* <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            }}
            lazy={"true"}
            speed= {1000} 
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
                           
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/festive_dishes">Скоро Пасха!</a><br/><a href="/filter/festive_dishes">Великий Пост подходит к концу и завершится праздником Пасхи.</a><p></p></div><img src="/gallery/pasha-4.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=second">Не пора задуматься о праздничном столе?</a><br/>Те кто постился, соскучились по блюдам с <a href="/recipes/sort?type=second&subtype=meat">мясом</a>, <a href="/recipes/sort?type=second&subtype=poultry">птицей</a> и <a href="/recipes/sort?type=second&subtype=fish">рыбой.</a><p/></div><img src="/gallery/pasha-2.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=salad">А может попробовать новые рецепты салатов?</a><p/></div><img src="/gallery/pasha-11.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=dough">Красиво и по домашнему на столе смотрится выпечка - пироги и пирожки, с начинками и без, также хлеб, булочки. А какой волшебный запах от свежей выпечки!</a><p/></div><img src="/gallery/pasha-6.jpg"/></div></SwiperSlide>            
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=dough">Редкий праздничный стол обходится без десерта -</a> <br/><a href="/recipes/sort?type=dough">тортов, пирожных, фруктовых салатов.</a><p/></div><img src="/gallery/pasha-7.jpg" /></div></SwiperSlide>               
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/paskha">Ну и конечно выпекаем куличи - </a><a href="/filter/paskha">без начинки, с начинкой, с сухофруктами и орехами. Также готовим творожную пасху.</a><p/></div><img src="/gallery/pasha-10.jpg" /></div></SwiperSlide>                                                                                                                                                                               
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/paskha">Рецептов куличей огромное множество! </a><a href="/filter/paskha">Предлагаем вам наши рецепты.</a><p/></div><img src="/gallery/pasha-9.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/all_recipes">По окончании Великого поста необходимо постепенно возвращаться к привычному рациону питания. Чтобы избежать проблемы со здоровьем, рекомендуется вводить мясные и молочные блюда постепенно.</a><p/></div><img src="/gallery/pasha-3.jpg" /></div></SwiperSlide>                     
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/maslenitsa">Христос Воскрес!</a><p><a href="/filter/festive">Поздравляем со светлой Пасхой!</a></p></div><img src="/gallery/pasha-1.jpg" /></div></SwiperSlide>
        </Swiper>     */}


        {/* Баннер Майские */}               
            {/* <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            }}
            lazy={true}
            speed= {1000} 
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
                           
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/festive_dishes">Здравствуй май!</a><br/><a href="/filter/festive_dishes">Ура, наступили самые любимые весенние праздники!</a><p></p></div><img src="/gallery/may-1.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/festive_dishes">Все вокруг наполнено любовью и энергией жизни! </a><a href="/filter/paskha">Наступают длинные выходные праздничные дни, которые так приятно провести среди друзей и близких на природе.</a><p/></div><img src="/gallery/may-6.jpg" /></div></SwiperSlide>                                                                                                                                                                               
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Время ездить на барбекю, пикники и на дачи, готовить на природе аппетитные блюда.</a><p/></div><img src="/gallery/may-7.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Традиционно в нашей стране все любят жарить шашлыки в майские праздники.</a><p/></div><img src="/gallery/may-8.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Запах дымка делает вкус блюд неповторимым, а время приготовления проходит в дружеской расслабленной атмосфере, где каждый может показать свое мастерство и поделиться секретами приготовления.</a><p/></div><img src="/gallery/may-9.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Рецептов блюд на костре неисчислимое количество от классических шашлыков из мяса и рыбы, до овощей, грибов, сыров, супов, вторых блюд, салатов и каш.</a><p/></div><img src="/gallery/may-10.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div>К шашлыкам отлично подходят <a href="/recipes/sort?type=main&subtype=sauces">соусы</a>, овощи, зелень, <a href="/filter/marinade">соленья и маринады</a>.<p></p></div><img src="/gallery/may-11.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Друзья, желаем вам прекраснных весенних денечков!</a><a href="/filter/bbq"></a><p/></div><img src="/gallery/may-12.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/festive_dishes">Май самый душистый месяц года,</a><br/> просыпаются насекомые, трудятся пчелки, порхают красивые бабочки.<p/></div><img src="/gallery/may-2.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/festive_dishes">Растения наливаются цветом и силами.</a><p/></div><img src="/gallery/may-3.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/festive_dishes">Расцветают цветы и деревья, травка зеленеет, природа набирается сил на все лето.</a><p/></div><img src="/gallery/may-4.jpg"/></div></SwiperSlide>            
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/festive_dishes">Заливаются звонкими трелями птицы,</a> <br/><a href="/filter/festive_dishes">находят пару, вьют гнезда и растят птенцов.</a><p/></div><img src="/gallery/may-5.jpg" /></div></SwiperSlide>               
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Наслаждайтесь природой и вкусной едой!</a><p/></div><img src="/gallery/may-13.jpg" /></div></SwiperSlide>        

        </Swiper>     */}


        {/* Баннер Лето               
        <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            
            }}
            lazy={true}
            speed= {1000}  
            
            pagination={{
            clickable: true,
           
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            
            className="mySwiper">                        
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=second">На природе блюда более аппетитны и вкусны</a>, <a href="/recipes/sort?type=dough">особенно приготовленные своими руками.</a><p/></div><img src="/gallery/leto-2.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=snacks">Как приятно провести время среди любимых на пикнике,</a> <a href="/recipes/sort?type=salad">не забыв захватить корзину со съестными припасами.</a><p/></div><img src="/gallery/leto-38.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Время ездить на дачи и готовить на костре ароматные шашлыки, запекать рыбу, готовить овощи и грибы на углях.</a><p/></div><img src="/gallery/may-8.jpg" /></div></SwiperSlide>           
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/bbq">Запах дымка придает блюдам особенный аромат копчения, а процесс приготовления среди близких и друзей, доставляет истинное удовольствие!</a><p/></div><img src="/gallery/may-9.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=second&subtype=veg">Созревают овощи и зелень, наливаясь цветом и витаминами.</a><p/></div><img src="/gallery/leto-77.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=salad&subtype=veg">Овощные салаты</a>, <a href="/recipes/sort?type=soup&subtype=veg">супы</a> <a href="/recipes/sort?type=second&subtype=veg">и другие блюда приготовленные из летних овощей</a>, <a href="/recipes/sort?type=snacks&subtype=veg">обретают насыщенный вкус и яркий аромат.</a><br/><p/></div><img src="/gallery/leto-8.jpg" /></div></SwiperSlide>                         
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=dough&subtype=sweet">Наливаются соком, сладостью и манящим запахом ягоды и фрукты.</a><p/></div><img src="/gallery/leto-29.jpg" /></div></SwiperSlide>   
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=dough&subtype=dessert">Наслаждайтесь вкусными блюдами с использованием ягод и фруктов!</a><p/></div><img src="/gallery/leto-37.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=dough">Пироги, пирожки и другая выпечка из летних ягод и фруктов обладает ярким цветом и вкусом.</a><p/></div><img src="/gallery/leto-9.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=dough&subtype=dessert">А как вкусны нежные фруктовые и ягодные нотки в десертах</a> <a href="/recipes/sort?type=salad&subtype=fruit">и салатах!</a><p/></div><img src="/gallery/leto-28.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/recipe/sort?type=snacks&subtype=cut&id=79">Украшения из свежих летних ягод, выглядит особенно красиво и аппетитно!</a><p/></div><img src="/gallery/leto-72.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/sort?type=drink">Полезны и вкусны соки, смузи, лимонады и другие напитки приготовленные из ягод, фруктов и овощей.</a><p/></div><img src="/gallery/leto-69.jpg" /></div></SwiperSlide>              
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/filter/gribi">В лесах после дождичка вырастают ароматные грибы, из которых можно приготовить большое количество вкуснейших блюд.</a><p/></div><img src="/gallery/leto-64.jpg" /></div></SwiperSlide>             
            <SwiperSlide><div className='slideDivTextWhite'><div><a href="/recipes/all_recipes">Друзья, желаем вам насладиться ласковым летом, вместе с друзьями и близкими!</a><p/></div><img src="/gallery/leto-85.jpg" /></div></SwiperSlide>                  
        </Swiper> 
        */} 

        {/* Баннер Засолка              
        <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 4000,
            disableOnInteraction: false,            
            }}
            lazy={true}
            speed= {1000}              
            pagination={{
            clickable: true,           
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}            
            className="mySwiper">                      
           
            <SwiperSlide><div className='slideDivTextWhite'><div><p><a href="/filter/marinade">Никакие магазинные соления не сравнятся с приготовленными своими руками!</a></p></div><img src="/gallery/zasolka-13.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><p>Многие хозяйки создают настоящие шедевры, щедро украшая свои погреба разноцветными <a href="/filter/marinade">солениями, маринадами,</a><a href="/recipes/sort?type=main&subtype=compote">компотами и вареньями</a>.</p></div><img src="/gallery/zasolka-8.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><p><a href="/articles/article?id=22">Вкус солениям и маринадам также придают пряные травы. Экспериментируйте, добавляя пикантные нотки.</a></p></div><img src="/gallery/zasolka-4.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><p><a href="/filter/marinade">Как правильно солить, мариновать, сушить ароматные грибочки? Делимся рецептами!</a></p></div><img src="/gallery/zasolka-6.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivTextWhite'><div><p><a href="/recipes/sort?type=main&subtype=compote">Сладкоежкам на радость делаем фруктовые и ягодные варенья, джемы, повидла и конфитюры!</a></p></div><img src="/gallery/zasolka-10.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivTextWhite'><div><p><a href="/articles/chapter_article?name=spices">У каждой хозяйки свои предпочтения в использовании приправ и специй, благодаря которым соления и маринады имеют свой уникальный вкус.</a></p></div><img src="/gallery/zasolka-3.jpg" /></div></SwiperSlide>
         
            <SwiperSlide><div className='slideDivTextWhite'><div><p><a href="/recipes/sort?type=main&subtype=compote">Вкусные и полезные напитки из ягод и фруктов, напомнят зимой о волшебном лете!</a></p></div><img src="/gallery/zasolka-5.jpg" /></div></SwiperSlide>                           
        </Swiper>  */} 

        <div className='width-100-percent'>     
            <div className='headerRecipe'>  
                <h1 className="pd-t-20 pd-b-10">Все рецепты</h1>                      
                <div className="main-wrap pd-t-40">
                    {recipesAll && 
                        <>                            
                            {recipesAll.map((recipe, index) => 
                                <div className='all-recipes-item' key={"recipe"+index}>
                                    <div>
                                        {recipe.cook_arr!=="null" &&
                                            <ul className="hover-effect-cover">
                                                <li>
                                                <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                                <div className="effect-to-left"> 
                                                    {recipe.gluten===1 && 
                                                        <p>БЕЗГЛЮТЕНОВОЕ</p>                                               
                                                    }
                                                    {recipe.lactose===1 && 
                                                        <p>БЕЗЛАКТОЗНОЕ</p>                                               
                                                    }
                                                    {recipe.lent===1 && 
                                                        <p>ПОСТНОЕ</p>                                               
                                                    }                                                
                                                    {recipe.veg===1 && 
                                                        <p>ВЕГЕТАРИАНСКОЕ</p>                                               
                                                    } 
                                                    {recipe.calorie===1 && 
                                                        <p>НИЗКОКАЛОРИЙНОЕ</p>                                               
                                                    }
                                                    {recipe.festive===1 && 
                                                        <p>ПРАЗДНИЧНОЕ</p>                                               
                                                    }
                                           
                                                </div>
                                            </li>
                                            </ul>
                                        }
                                        {recipe.cook_arr==="null" &&
                                            <ul className="hover-effect-cover">
                                                <li>
                                                <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                                <div className="effect-to-left"> 
                                                    {recipe.gluten===1 && 
                                                        <p>БЕЗГЛЮТЕНОВОЕ</p>                                               
                                                    }
                                                    {recipe.lactose===1 && 
                                                        <p>БЕЗЛАКТОЗНОЕ</p>                                               
                                                    }
                                                    {recipe.lent===1 && 
                                                        <p>ПОСТНОЕ</p>                                               
                                                    }                                                
                                                    {recipe.veg===1 && 
                                                        <p>ВЕГЕТАРИАНСКОЕ</p>                                               
                                                    } 
                                                    {recipe.calorie===1 && 
                                                        <p>НИЗКОКАЛОРИЙНОЕ</p>                                               
                                                    }
                                                    {recipe.festive===1 && 
                                                        <p>ПРАЗДНИЧНОЕ</p>                                               
                                                    }
                                                </div>
                                            </li>
                                            </ul>
                                        }  
                                    </div>        
                                    <span className='recipe_title'>
                                        <span className='title pd-l-15 pd-r-10 pd-t-15'>
                                            <p><Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> </p>
                                        </span>                        
                                        <span className='rating_stars'>      
                                            <span>         
                                                <StarRating                    
                                                    count={5}
                                                    size = {24}
                                                    rating = {recipe.rating}
                                                    className = "display-none"
                                                ></StarRating>  
                                            </span>   
                                            <span className='ratingList'>Рейтинг</span>                                            
                                        </span> 
                                    </span>                                                
                                </div>                               
                            )}                
                        </>
                    }
                </div>
                {!isLoading && <div className='text-center'><Loading size="l"/></div>} 
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default MainPage
