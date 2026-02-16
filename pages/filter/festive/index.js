"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StarRating from '../../services/star_rating';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import { useRecipesArray } from '../../context/all_recipes_array';
import HeadMetaTags from '../../components/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const AllRecipes = () => {
    const [recipesAll, setRecipesAll] = useState([]);  
    const [isLoading, setIsLoading] = useState([]);  
    const allRecipesArr = useRecipesArray();
    const [recipesAllFest, setRecipesAllFest] = useState([]); 

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
            title="новогодниие блюда"
            description="новогодниие блюда, салаты для новогоднего стола, новогодние рецепты, рождественские блюда, рецепты на рождество, christmas dishes, salads new year, new year's table, new year's recipes" 
            keywords="новогодниие блюда, салаты для новогоднего стола, новогодние рецепты, рождественские блюда, рецепты на рождество, christmas dishes, salads new year, new year's table,  new year's recipes"
            content="all" 
            ogTitle="новогодниие блюда"
            ogDescription="новогодниие блюда, салаты для новогоднего стола, новогодние рецепты, рождественские блюда, рецепты на рождество, christmas dishes, salads new year, new year's table, new year's recipe"
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle="новогодниие блюда"
            twitterDescription="новогодниие блюда, салаты для новогоднего стола, новогодние рецепты, рождественские блюда, рецепты на рождество, christmas dishes, salads new year, new year's table, new year's recipe"
            twitterImage="/public/img/openGrafPreview_1.jpg"
        /> 
        <Navbar/>             
        <div className='width-100-percent'>     
            <div className='headerRecipe'>  
                <h2>Новогодний стол</h2>    
                <Swiper
                    spaceBetween={80}
                    centeredSlides={true}
                    autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    }}
                    lazy={true}
                    speed= {2000} 
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper">
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/articles/article?id=33">Рождественская сказка</a></h2><p><a href="/articles/article?id=33">Подарите новогоднее чудо своим родным и близким - уделите внимание волшебству в подготовке к встрече Нового года!</a></p></div><img src="/gallery/new-year-11.jpg" /></div></SwiperSlide>
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=snacks&subtype=cut">Красивая подача блюд</a></h2><p><a href="/recipes/sort?type=snacks&subtype=cut">Делимся идеями интересных новогодних раскладок продуктов. Придайте вашему столу уникальность и интересный вид!</a></p></div><img src="/gallery/new-year-12.jpg" /></div></SwiperSlide>                        
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/articles/article?id=33">Уютный огонек очага</a></h2><p><a href="/articles/article?id=33">Встречаем год Огненной лошади с красивыми свечами, подсвечниками и другими аксессуарыми для теплого приема Ногового 2026 года!</a></p></div><img src="/gallery/new-year-1.jpg" /></div></SwiperSlide>
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/articles/article?id=33">Элементы декора</a></h2><p><a href="/articles/article?id=33">Стильные салфетки, эффектные аксессуары, лаконичные скатерти сделают ваш стол по настоящему особенным!</a></p></div><img src="/gallery/new-year-8.jpg" /></div></SwiperSlide>
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=second&subtype=meat">Мясные блюда</a></h2><p><a href="/recipes/sort?type=second&subtype=meat">Приготовьте вкусные ароматные блюда для ценителей мяса.</a></p></div><img src="/gallery/new-year-29.jpg" /></div></SwiperSlide>                          
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=dough&subtype=dessert">Изысканный десерт</a></h2><p><a href="/recipes/sort?type=dough&subtype=dessert">Побалуйте себя вкусными сладостями!</a></p></div><img src="/gallery/new-year-28.jpg" /></div></SwiperSlide>                          
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=dough">Ароматная выпечка</a></h2><p><a href="/recipes/sort?type=dough">Пироги и пирожки, печенье и торты - какой новогодний стол без них?</a></p></div><img src="/gallery/new-year-27.jpg" /></div></SwiperSlide>   
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=second&subtype=poultry">Блюда из птицы</a></h2><p><a href="/filter/festive">Ароматный гусь, утка в яблоках, нежная курочка - классика праздничных столов!</a></p></div><img src="/gallery/new-year-26.jpg" /></div></SwiperSlide>                         
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/filter/fish">Рыба и морепродукты</a></h2><p><a href="/filter/fish">Порадуйте себя и свих близких блюдами с рыбой и мрепродуктами.</a></p></div><img src="/gallery/new-year-25.jpg" /></div></SwiperSlide> 
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/filter/unusual">Необычные блюда</a></h2><p><a href="/filter/unusual">Разнообразьте рецепты сочными фруктами, ароматными ягодами, ореховыми нотками, сливочными сырами.</a></p></div><img src="/gallery/new-year-21.jpg" /></div></SwiperSlide>                         
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=snacks&subtype=can">Милые тарталетки</a></h2><p><a href="/recipes/sort?type=snacks&subtype=can">Украсьте стол вкусными канапе и тарталетками с различными начинками которые оценят ваши гости!</a></p></div><img src="/gallery/new-year-19.jpg" /></div></SwiperSlide> 
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=salad&subtype=fish">Салаты с морепродуктами</a></h2><p><a href="/recipes/sort?type=salad&subtype=fish">Морские деликатесы не только вкусные и полезные, но и не повредят вашей фигуре.</a></p></div><img src="/gallery/new-year-20.jpg" /></div></SwiperSlide> 
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=snacks&subtype=can">Изюминка стола</a></h2><p><a href="/recipes/sort?type=snacks&subtype=can">Канапе настоящее произведение искусства и поле для творчества!</a></p></div><img src="/gallery/new-year-18.jpg" /></div></SwiperSlide> 
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=salad&subtype=meat">Классика новогоднего стола</a></h2><p><a href="/recipes/sort?type=salad&subtype=meat">Оливье и другие сытные мясные салаты к новогоднему столу .</a></p></div><img src="/gallery/new-year-16.jpg" /></div></SwiperSlide> 
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=snacks&subtype=can">Эстетика закуски</a></h2><p><a href="/recipes/sort?type=snacks&subtype=can">Фуршетные блюда радуют глаз и всегда уместны на любом празднике!</a></p></div><img src="/gallery/new-year-15.jpg" /></div></SwiperSlide> 
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=snacks&subtype=roll">Сворачиваем рулетики</a></h2><p><a href="/recipes/sort?type=snacks&subtype=roll">Эффектно смотрятся на праздничном столе аппетитные спаральки!</a></p></div><img src="/gallery/new-year-14.jpg" /></div></SwiperSlide>  
                        <SwiperSlide><div className='slide1DivText'><div><h2><a href="/recipes/sort?type=drink">Хрустальный звон бокалов</a></h2><p><a href="/recipes/sort?type=drink">Делимся рецептами вкусных напитков к новогоднему столу.</a></p></div><img src="/gallery/new-year-6.jpg" /></div></SwiperSlide> 
                </Swiper> 

                <div className="main-wrap pd-t-80">
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