"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import StarRating from '../../services/star_rating';
import Navbar from '../../components/navbar';
import Link from 'next/link';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import { useRecipesArray } from '../../context/all_recipes_array';
import { useRouter } from 'next/router';
import HeadMetaTags from '../../components/head';


const FoodType = () => {
    const router = useRouter();
    const mainCat = useSearchParams().get('type');
    const cat = useSearchParams().get('subtype');
    const allRecipesArr = useRecipesArray();
    const [typeRecipe, setTypeRecipe] = useState();
    const [sort, setSort] = useState();
    const [subtypeRecipe, setSubtypeRecipe] = useState();
    const [recipes, setRecipes] = useState([]);
    const [imgGallery, setImgGallery] = useState();
    const [typeCook, setTypeCook] = useState();
    const [metaCat, setMetaCat] = useState(false);
    const [metaMainCat, setMetaMainCat] = useState(false);
    const [subTypeRecipe, setSubTypeRecipe] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [recipesAll, setRecipesAll] = useState([]);  
    const [recipesAllKitchen, setRecipesAllKitchen] = useState([]);  
    const [recipesKitchen, setRecipesKitchen] = useState([]);  
    const [currentDomain, setCurrentDomain] = useState('');        
    const [metaTitle, setMetaTitle] = useState('');        

    useEffect (( ) => {
        if (mainCat==="kitchen") {    
            setTypeCook("кухня");
        }      
        if (mainCat==="main") {
            setTypeCook("основные блюда");
        }           
        if (mainCat==="soup") {
            setTypeCook("супы");
        }  
        if (mainCat==="second") {
            setTypeCook("вторые блюда");
        }  
        if (mainCat==="salad") {
            setTypeCook("салаты");
        }  
        if (mainCat==="pelmeni") {
            setTypeCook("пельмени манты");
        }  
        if (mainCat==="snacks") {
            setTypeCook("закуски");
        }  
        if (mainCat==="dough") {
            setTypeCook("тесто и десерт");
        }  
        if (mainCat==="drink") {
            setTypeCook("напитки");
        }  
        if (mainCat==="multi") {
            setTypeCook("мультиварка");
        }  
    }, [mainCat]);  

    useEffect (( ) => { 
        if (mainCat!==null && cat===null)
        {
            setMetaMainCat (true);
            setMetaCat (false);
        }
        if (mainCat!==null && cat!==null && subTypeRecipe!==undefined)
        {           
            setMetaCat (true);
            setMetaMainCat (false);
        }           
        setCurrentDomain(document.location.href);   
        setRecipesAll (allRecipesArr.allRecipesArray);
        setIsLoading (allRecipesArr.isLoading);   
    }, [mainCat, cat, router])  

    useEffect (( ) => {        
        if (cat!==undefined) {
            if (mainCat==="kitchen")
            {
                setSort("Кухня");
                 if (cat==="rus") setSubTypeRecipe("Русская"); 
                 if (cat==="eur") setSubTypeRecipe("Европейская");   
                 if (cat==="kavk") setSubTypeRecipe("Кавказская"); 
                 if (cat==="turk") setSubTypeRecipe("Тюркская"); 
                 if (cat==="asia") setSubTypeRecipe("Азиатcкая"); 
                 if (cat==="pan") setSubTypeRecipe("Паназиатcкая"); 
                 if (cat==="ind") setSubTypeRecipe("Индийская"); 
                 if (cat==="amer") setSubTypeRecipe("Американская"); 
                 if (cat==="mex") setSubTypeRecipe("Мексиканская"); 
            }
            if (mainCat==="main")
            {
                setSort("Основные");
                 if (cat==="bouillon") setSubTypeRecipe("Бульоны");  
                 if (cat==="cereals") setSubTypeRecipe("Каши, крупы"); 
                 if (cat==="garnish") setSubTypeRecipe("Гарниры"); 
                 if (cat==="sauces") setSubTypeRecipe("Соусы"); 
                 if (cat==="base") setSubTypeRecipe("Основы и заготовки"); 
                 if (cat==="marinade") setSubTypeRecipe("Маринады и соления"); 
                 if (cat==="compote") setSubTypeRecipe("Компоты и варенья"); 
            }
            if (mainCat==="soup")
            {
                setSort("Супы");
                 if (cat==="meat") setSubTypeRecipe("Мясные"); 
                 if (cat==="fish") setSubTypeRecipe("Рыба, морепродукты"); 
                 if (cat==="pure") setSubTypeRecipe("Супы-Пюре");                       
                 if (cat==="veg") setSubTypeRecipe("Вегетарианские"); 
                 if (cat==="cold") setSubTypeRecipe("Холодные"); 
                 if (cat==="bbq") setSubTypeRecipe("На мангале"); 
            }
            if (mainCat==="second")
            {
                setSort("Вторые блюда");
                 if (cat==="meat") setSubTypeRecipe("Мясо");  
                 if (cat==="poultry") setSubTypeRecipe("Птица"); 
                 if (cat==="fish") setSubTypeRecipe("Рыба, морепродукты");                        
                 if (cat==="veg") setSubTypeRecipe("Вегетарианские"); 
                 if (cat==="bbq") setSubTypeRecipe("На мангале"); 
            }
            if (mainCat==="salad")
            {
                setSort("Салаты");
                 if (cat==="meat") setSubTypeRecipe("Мясные");
                 if (cat==="fish") setSubTypeRecipe("Рыба, морепродукты");
                 if (cat==="veg") setSubTypeRecipe("Вегетарианские");
                 if (cat==="warm") setSubTypeRecipe("Теплые");
                 if (cat==="fruit") setSubTypeRecipe("Фруктовые");
            }
            if (mainCat==="pelmeni")
            {
                setSort("Пельмени");
                 if (cat==="meat") setSubTypeRecipe("С мясом");
                 if (cat==="fish") setSubTypeRecipe("Рыба, морепродукты");
                 if (cat==="veg") setSubTypeRecipe("Вегетарианские");
            }
            if (mainCat==="snacks")
            {
                setSort("Закуски");
                 if (cat==="roll") setSubTypeRecipe("Рулеты, роллы");
                 if (cat==="salad") setSubTypeRecipe("Салатные");
                 if (cat==="pickles") setSubTypeRecipe("Маринады, соленья");
                 if (cat==="cut") setSubTypeRecipe("Нарезка");
                 if (cat==="veg") setSubTypeRecipe("Вегетарианские");
                 if (cat==="can") setSubTypeRecipe("Канапе, тарталетки");
                 if (cat==="snack") setSubTypeRecipe("Снеки, сухарики");
            }
            if (mainCat==="dough")
            {
                setSort("Тесто и десерт");
                 if (cat==="dough") setSubTypeRecipe("Блюда из теста");
                 if (cat==="sweet") setSubTypeRecipe("Сладкие блюда из теста");
                 if (cat==="dessert") setSubTypeRecipe("Десертные блюда");
                 if (cat==="cream") setSubTypeRecipe("Крем, глазурь");
                 if (cat==="gateau") setSubTypeRecipe("Рецепты теста");
            }
            if (mainCat==="drink")
            {
                setSort("Напитки");
                 if (cat==="cold") setSubTypeRecipe("Прохладительные");
                 if (cat==="smooth") setSubTypeRecipe("Смузи");
                 if (cat==="cocktails") setSubTypeRecipe("Коктейли");
                 if (cat==="compote") setSubTypeRecipe("Морсы, компоты");
                 if (cat==="tea") setSubTypeRecipe("Чаи");
                 if (cat==="coffee") setSubTypeRecipe("Кофе");
                 if (cat==="alco") setSubTypeRecipe("Алкогольные");
            }
            if (mainCat==="multi")
            {
                setSort("Мультиварка");
                 if (cat==="soup") setSubTypeRecipe("Супы");
                 if (cat==="second") setSubTypeRecipe("Вторые блюда");
                 if (cat==="dough") setSubTypeRecipe("Тесто, десерт");
                 if (cat==="main") setSubTypeRecipe("Заготовки, основы");                                        
            } 
        }
    }, [cat])  

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

    useEffect (( ) => {        
        if (mainCat!==null && cat===null) {
            async function getTypes() {
                const res = await fetch(`/api/cooking/recipes?type=${mainCat}`, {
                    method: "POST",
                })                    
                    return res.json().then((data) => {
                    setTypeRecipe (data[0]?.type);
                    setSubtypeRecipe (JSON.parse(data[0]?.sub_types));
                    setImgGallery(data[0]?.main_gallery);
                }).catch((err) => {
                    return(err);
                });
            }
            getTypes();
            if (mainCat!=="kitchen") {            
                async function getRecipes() {
                    const res = await fetch(`/api/cooking/recipes?type=${mainCat}`, {
                        method: "GET",
                        })  
                        if (res.status===200)                      
                        {
                            setIsLoading(true);
                        }                   
                        return res.json().then((data) => {
                        setRecipes(ShuffleArray(data));
                    }).catch((err) => {
                        return(err);
                    });
                }
                getRecipes();   
            }     
        }
        if (mainCat!==null && cat!==null && mainCat!=="kitchen") {
            async function getRecipes() {
                const res = await fetch(`/api/cooking/recipes?type=${mainCat}&subtype=${cat}`, {
                    method: "GET",
                }) 
                if (res.status===200)                      
                {
                    setIsLoading(true);
                }                    
                return res.json().then((data) => {
                    setRecipes(ShuffleArray(data));
                }).catch((err) => {
                    return(err);
                });
            }
            getRecipes();            
        }            
        if (mainCat!==null && cat===null && mainCat==="kitchen") {  
                const recipesAllFilter = [];
                for(const arr of recipesAll) {
                    if (arr.kitchen!=='')
                    {
                        recipesAllFilter.push(arr)
                    }              
                } 
                setIsLoading(true);
                setRecipesAllKitchen(ShuffleArray(recipesAllFilter));
            } 
            if (mainCat!==null && cat!==null && mainCat==="kitchen") {            
                const recipesFilter = [];
                for(const arr of recipesAll) {                    
                    if (arr.kitchen!==''&&arr.kitchen===cat)
                    {
                        recipesFilter.push(arr)
                    }              
                } 
                setRecipesKitchen(ShuffleArray(recipesFilter));
                setIsLoading(true);
            } 

        if (cat===null)
        {
            setMetaTitle (typeCook)
        }    
        if (cat!==null)
        {
            setMetaTitle (`${typeCook} ${subTypeRecipe}`)
        }
    }, [mainCat, cat, router, allRecipesArr])

  return (
    <div>
        <HeadMetaTags 
            description={`${metaTitle} рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            title={`${metaTitle} Рецепты блюд с пошаговым описанием`}
            keywords={`${metaTitle} рецепты,приготовить блюдо, пошаговый рецепт приготовления, готовить вкусную еду, cупы, салат, рулет, закуски, напитки, гарнир, мясо, рыба, выпечка, пирог, пицца, пельмени, манты, суши, жареное, вареное, отварное, диета, вегетарианство, мясные, вкусные, кухни мира, кулинарная книга, готовка блюд, recipes, cooking recipes, kitchen preparing, dishes, cook, eating`}
            content="all"
            ogTitle={`${metaTitle} Рецепты блюд с пошаговым описанием`}
            ogDescription={`${metaTitle} Рецепты блюд с пошаговым описанием`}
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle={`${metaTitle} рецепты приготовления блюд cooking recipes`}
            twitterDescription={`${metaTitle} приготовить блюдо пошаговый рецепт готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`}
            twitterImage="/public/img/openGrafPreview_1.jpg"
        />
        <Navbar/>    
        {(cat===null&&imgGallery) && <div className='gallery'><img loading="lazy" src={`${imgGallery}`} alt={`${mainCat} ${cat}`} /></div>}        
        <div className='width-100-percent'>     
            <div className='headerRecipe'>  
            {cat===null &&
                <>                        
                    <div className='breadcrumbs text-center'>
                        <Link href="/">РЕЦЕПТЫ</Link><><span> / {typeCook}</span></>                                           
                    </div>   
                    {(mainCat==="kitchen") && <>                
                        <h1>Вид кухни</h1>   
                        <p>Хотите приготовить что-то необычное, или предпочитаете местную кухню?</p></>                                                       
                    }
                    {(mainCat==="main") && <>
                        <h1>Основные блюда</h1> 
                        <p>Самые популярные блюда для ежедневного здорового питания - бульоны, гарниры, крупы, каши и другие рецепты самостоятельных или составных блюд к вашему вниманию.</p>
                        </>                                          
                    }
                    {(mainCat==="soup") && <>
                        <h1>Супы</h1>
                        <p>Горячие, холодные, веганские, в духовке, супы-пюре - готовим супчики на любой вкус!</p></>                                           
                    }
                    {(mainCat==="second") && <>
                        <h1>Мясо, рыба и гарниры</h1> 
                        <p>Хотите приготовить что-то необычное, или предпочитаете что-нибудь из проверенных веками родных рецептов?</p></>                                          
                    }
                    {(mainCat==="salad") && <>
                        <h1>Салаты</h1>                                           
                        <p>Сложно представить себе русскую кухню без всевозможных салатов! Как каллорийные, так и диетические - украсят любой стол и поднимут ваше настроение!</p>
                        </>
                    }
                    {(mainCat==="pelmeni") && <>
                        <h1>Пельмени, манты, хинкали и т.д.</h1>  
                        <p>Беспроигрышное сочетание теста и начинки, встречающееся у многих народов мира в разном исполнении - пельмени, вареники, колдуны, кундюмы, манты, хинкали, гедза, равиоли, кропкакор, дамплинги и др. - являются вкуснейшими блюдами, которые были изобретены много веков назад. Это кулинарные шедевры требующие для приготовления времени и усердия, но результат безусловно того стоит! Не отчаивайтесь если что-то не будет получаться сразу, с опытом ваши старания обязательно окупятся и вы станете настоящим профессионалом, с багажом секретов приготовления и вашими личными выверенными и усовершенствоанными рецептами. </p>                                                
                        </>                                         
                    }
                    {(mainCat==="snacks") && <>
                        <h1>Закусочные блюда</h1> 
                        <p>Украшение праздничных столов - всевозможные рулетики с вкуснейшей начинкой, разноцветные канапе, тартаретки с салатиками, с икрой, рыбой - отличный выбор для аппетитного и красивого стола, который позволит реализовать вам не только кулинарные, но и творческие способности!</p></>                                          
                    }
                    {(mainCat==="dough") && <>
                        <h1>Тесто, десерты</h1>
                        <p>Приготовленные с любовью - хлеб, блины, пицца - подарят истинное наслаждение вам и вашим близким. Вкусные пироги и пирожки, кремовые торты и пирожные - готовим душевные блюда из теста и десерты!</p></>                                           
                    }
                    {(mainCat==="drink") && <>
                        <h1>Напитки горячие и холодные</h1> 
                        <p>Душистый чай и ароматный кофе уютно согреют, прохладительные напитки из натуральных ингредиентов подарят прохладу и утолят жажду, смузи и компоты, кисели и морсы наполнят витаминами. Напитки приготовленные своими руками - это просто, вкусно и полезно!</p></>                                          
                    }
                    {(mainCat==="multi") && <>
                        <h1>Блюда в мультиварке</h1> 
                        <p>Готовить в мультиварке одно удовольствие - получается у всех, готовить просто, и в мультиварке можно приготовить практически все! Даже начинающие хозяйки будут готовить как профессиональные повара - необходимо только загрузить ингредиенты и выбрать режим, а температура и время приготовления будут выставлены автоматически.</p></>                                          
                    }
            
                    {subtypeRecipe && <>
                        <div className="typeRecipe">
                            {Object.entries(subtypeRecipe).map(([key, value]) =>                         
                                <div key={`${key}_${value}`}>                                    
                                    <Link href={`/recipes/sort?type=${mainCat}&subtype=${subtypeRecipe[key]}`}>{key}</Link>                                  
                                </div>                    
                            )} 
                        </div>
                    </>}                    
                    <h2 className='pd-t-20'>Все рецепты раздела</h2>                    
                    <div className="main-wrap pd-t-20">
                        {(recipes&&recipes!==undefined&&mainCat!=='kitchen') && 
                            <>
                                {recipes.map((recipe, i) => 
                                    <div className='all-recipes-item' key={`${recipe.i}_${recipe.name}`}>
                                        <div>
                                        {recipe.cook_arr!=="null" &&
                                            <ul className="hover-effect-cover">
                                                <li>
                                                <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} alt={recipe.name} loading="lazy"/>
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
                                    <div>
                                        <span className='recipe_title'>
                                            <span className='title pd-l-15 pd-r-10 pd-t-15'>
                                            <p>
                                                <Link href={`/recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link>
                                            </p>
                                            </span>                                            
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
                                    </div>
                                </div>
                                </div>
                                )}                
                            </>
                        }     
                        {(recipesAllKitchen&&recipesAllKitchen!==undefined&&mainCat==='kitchen') && 
                            <>
                                {recipesAllKitchen.map((recipe) => 
                                    <div className='all-recipes-item' key={`${recipe.id}_${recipe.name}`}>
                                        <div>
                                        {recipe.cook_arr!=="null" &&
                                            <ul className="hover-effect-cover">
                                                <li>
                                                    <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} alt={recipe.name} loading="lazy"/>
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
                                        {recipe.cook_arr==="null" &&                                                                                                                           <ul class="hover-effect-cover">
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
                                        <div>
                                        <span className='recipe_title'>
                                            <span className='title pd-l-15 pd-r-10 pd-t-15'><Link href={`/recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link></span>                                            
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
                                        </div>
                                    </div>
                                )}                
                            </>
                        }                      
                    </div>
                    {!isLoading && <div className='text-center'><Loading size="l"/></div>} 
                </>
            }
            {cat!==null &&
                <>
                    <div className='breadcrumbs text-center'>
                        <Link href={`/`}>РЕЦЕПТЫ</Link><><span> / <Link href={`/recipes/sort?type=${mainCat}`}>{typeCook}</Link></span> / <span>{subTypeRecipe}</span></>                                           
                    </div> 
                    <h2 className='pd-b-40'>{sort}: {subTypeRecipe}</h2>
                    <div className="main-wrap pd-t-20">
                        {(recipes&&(recipes!==undefined)&&mainCat!=='kitchen') && 
                            <>
                                {recipes.map((recipe) => 
                                    <div className='all-recipes-item'  key={`${recipe.id}_${recipe.name}`}>
                                        <div>
                                            <ul className="hover-effect-cover">
                                                <li>
                                                    {recipe.cook_arr!=="null" &&
                                                        <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} alt={recipe.name} loading="lazy"/>
                                                    }
                                                    {recipe.cook_arr==="null" &&
                                                        <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
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
                                            <div >
                                                <span className='recipe_title'>
                                                    <span className='title pd-l-15 pd-r-10 pd-t-15'>
                                                        <p>
                                                            <Link href={`/recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.type}&id=${recipe.id}`}>{recipe.name}</Link>
                                                        </p>
                                                    </span>
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
                                            </div>
                                   
                                        </div>
                                    </div>
                                )}                
                            </>
                        } 
                        {(recipesKitchen&&(recipesKitchen!==undefined)&&mainCat==='kitchen') && 
                            <>
                                {recipesKitchen.map((recipe) => 
                                    <div className='all-recipes-item'  key={`${recipe.id}_${recipe.name}`}>        
                                    <div>   
                                    <ul className="hover-effect-cover">
                                        <li>                 
                                            {recipe.cook_arr!=="null" &&
                                            <>
                                                <img src={`https://storage.yandexcloud.net/vseresepty/${recipe.img_main}`} alt={recipe.name} loading="lazy"/>
                                            </>                                            
                                            }
                                            {recipe.cook_arr==="null" &&
                                            <>
                                                <img src={`/upload/recipe_main_img/${recipe.img_main}`} loading="lazy" alt={`recipe: ${recipe.name}`}/>
                                            </>                                                
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
                                    <div>
                                        <span className='recipe_title'>
                                            <span className='title pd-l-15 pd-r-10 pd-t-15'><Link href={`/recipes/recipe/sort?type=${recipe.section}&subtype=${recipe.kitchen}&id=${recipe.id}`}>{recipe.name}</Link></span>                                            
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
                                    
                                    </div>
                                )}                
                            </>
                        } 
                    </div>
                    {!isLoading && <div className='text-center'><Loading size="l"/></div>}
                </>
            }
            </div>
        </div>
        <Footer/>
    </div> 
  )
}

export default FoodType