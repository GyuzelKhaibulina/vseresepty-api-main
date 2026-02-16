"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StarRating from '../../services/star_rating';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import { useRecipesArray } from '../../context/all_recipes_array';
import { useRouter } from 'next/router';
import HeadMetaTags from '../../components/head';

const AllRecipes = () => {
    const currentUrl = usePathname();
    const [recipesAll, setRecipesAll] = useState([]);  
    const [isLoading, setIsLoading] = useState([]);  
    const allRecipesArr = useRecipesArray();
    const [recipesAllFest, setRecipesAllFest] = useState([]); 
    const router = useRouter()

useEffect (() =>    
    {    
        allRecipesArr;

    }, [allRecipesArr]); 


    useEffect (() =>    
    {    
         if (allRecipesArr.allRecipesArray.length>0) {
            setRecipesAll (allRecipesArr.allRecipesArray);
            setIsLoading (allRecipesArr.isLoading);
        }   
    }, [allRecipesArr]); 

    useEffect (() =>    
    {   
    let newArray = [];              
    recipesAll.filter(function(item) {                
            if (item.festive===1)
            {
                newArray.push(item)
            }
        })    
    let uniqueRecipes = newArray.filter(function(item, pos) {
        return newArray.indexOf(item) == pos;
    })
    setRecipesAllFest(uniqueRecipes);  
}, [recipesAll]); 

  return (
    <>
    
        <HeadMetaTags
            title="праздничные блюда, праздничный стол"
            description="праздничные блюда, праздничный стол, праздничные рецепты, вкусные блюда и меню, необычные рецепты, festive dishes, recipes festive table, delicious dishes" 
            keywords="праздничные блюда, праздничный стол, праздничные рецепты, вкусные блюда и меню, необычные рецепты, festive dishes, recipes festive table, delicious dishes"
            content="all" 

            ogTitle="праздничные блюда, праздничный стол"
            ogDescription="праздничные блюда, праздничный стол, праздничные рецепты, вкусные блюда и меню, необычные рецепты, festive dishes, recipes festive table, delicious dishes"
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle="праздничные блюда, праздничный стол"
            twitterDescription="праздничные блюда, праздничный стол, праздничные рецепты, вкусные блюда и меню, необычные рецепты, festive dishes, recipes festive table, delicious dishes"
            twitterImage="/public/img/openGrafPreview_1.jpg"
        /> 
        <Navbar/>             
        {/* <Swiper
            spaceBetween={80}
            centeredSlides={true}
            autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            }}
            lazy={true}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper">
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Друзья,</a><p><a href="/filter/festive">наступили приятные новогодние хлопоты!</a></p></div><img src="/gallery/181624-25096.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Время тепла и уюта в кругу семьи и друзей,</a><p><a href="/filter/festive">для которых так хочется приготовить лучшие блюда!</a></p></div><img src="/gallery/181624-25083.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=second">Основные блюда -</a> <p> <a href="/recipes/sort?type=second">запеченная утка, мясо по-французски, гусь в яблоках, лосось в вине!</a></p></div><img src="/gallery/181624-25093.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=snacks">Закуски - </a><p><a href="/recipes/sort?type=snacks">рулеты, канапе, тарталетки, соленья и маринады!</a></p></div><img src="/gallery/181624-25098.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=dough">Выпечка и десерт -</a> <p><a href="/recipes/sort?type=dough">имбирные пряники, аппетитные печенья, ароматные булочки и пирожки!</a></p></div><img src="/gallery/181624-25088.jpg" /></div></SwiperSlide>  
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=dough&subtype=sweet">Вкуснейшие сладости -</a> <p><a href="/recipes/sort?type=dough&subtype=sweet">пирожные с кремом, восхитительные торты, муссы и пудинги!</a></p></div><img src="/gallery/181624-250931.jpg"/></div></SwiperSlide>            
            <SwiperSlide><div className='slideDivText'><div><a href="/recipes/sort?type=salad">И конечно наши любимые салаты -</a> <p><a href="/recipes/sort?type=salad">традиционные и новинки!</a></p></div><img src="/gallery/181624-25094.jpg" /></div></SwiperSlide> 
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Запах мандаринов и новогодней елки</a> - <p> <a href="/filter/festive">дарят праздничное сказочное настроение!</a></p></div><img src="/gallery/181624-25092.jpg" /></div></SwiperSlide>
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Гирлянды, свечи, елочные игрушки и подарки -</a> <p><a href="/filter/festive">погружают в атмосферу детства, добра и веры в чудо!</a></p></div><img src="/gallery/181624-25084.jpg" /></div></SwiperSlide>               
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Пусть Новый 2025 год принесет всем - </a><p><a href="/filter/festive">счастья, мира и благополучия!</a></p></div><img src="/gallery/181624-25085.jpg" /></div></SwiperSlide>                                                     
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">В семьях царит атмосфера любви, добра, понимания, поддержки и уюта</a> <p><a href="/filter/festive">не только в праздники!</a></p></div><img src="/gallery/181624-25097.jpg" /></div></SwiperSlide>                                                                                                      
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">Родные, любимые и друзья будут здоровы и счастливы,</a><p>а праздничные столы вас объединяют!</p></div><img src="/gallery/181624-25086.jpg" /></div></SwiperSlide>             
            <SwiperSlide><div className='slideDivText'><div><a href="/filter/festive">И пусть сбываются самые прекрасные, волшебные, </a><p><a href="/filter/festive">несбыточные мечты!</a></p></div><img src="/gallery/181624-25099.jpg" /></div></SwiperSlide>                             
        </Swiper>   */}
        <div className='width-100-percent'>     
            <div className='headerRecipe'>  
                <h2>Праздничные блюда</h2>                        
                <div className="main-wrap pd-t-40">
                    {recipesAllFest && 
                        <>                            
                            {recipesAllFest.map((recipe, index) => 
                                <div className='all-recipes-item' key={index}>
                                <div>
                                    <ul className="hover-effect-cover">
                                        <li>
                                            {recipe.cook_arr==="null" &&
                                                <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                            }
                                            {recipe.cook_arr!=="null" && 
                                                <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                            }
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
                                </div>                                  
                                <span className='recipe_title'>
                                    <span className='title pd-l-15 pd-r-10 pd-t-15'>
                                        <Link href={`../recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link> 
                                    </span>                        
                                    <span className='rating_stars'>      
                                        <span>         
                                            <StarRating                    
                                                count={5}
                                                size = {24}
                                                rating = {recipe.rating}
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

export default AllRecipes