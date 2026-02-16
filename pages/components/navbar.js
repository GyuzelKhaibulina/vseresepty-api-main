"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/context';
import CustomSelect from './select';
import Modal from './modal';
import MeasureProducts from './measure_products';
import TableCollapse from './table_collapse';

const Navbar = ({ children }) => {
    const auth = useAuth();
    const [sortValue, setSortValue]= useState ({type: 'all', typeName: 'Все блюда'});
    const [sortValue1, setSortValue1]= useState ({composition: 'all', compositionName: 'Любые ингредиенты'});
    const [sortValue2, setSortValue2]= useState ({kind: 'all', kindName: 'Любое блюдо'});
    const [sortValue3, setSortValue3]= useState ({property: 'all', propertyName: 'Любое свойство'});
    const [isFilter, setIsFilter]= useState (false)
    const [search, setSearch]= useState (false);
    const [input, setInput] = useState([{"search_text": ""}]);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [valueCalories, setValueCalories] = useState([]);
    const [valueCaloriesArr, setValueCaloriesArr] = useState([]);
    const [valueCaloriesList, setValueCaloriesList] = useState([]);
    let [arrIndex, setArrIndex] = useState([]);
    const [isRemoveCalc, setIsRemoveCalc] = useState();
    let [arrLastIndex, setArrLastIndex] = useState([{"id": "", "lastIndex":""}]);
    const [totalValues, setTotalValues] = useState({"totalValueCalories": "","totalCalories": "", "totalFats":"", "totalProteins":"", "totalСarbohydrates":""});
    const [isRemove, setIsRemove] = useState(false);
    const [options, setOptions] = useState([
        {label: "Все разделы", value: "all"}, 
        //{label: "Кухни мира", value: "kitchen"}, 
        {label: "Основные блюда", value:"main" }, 
        {label: "Супы", value:"soup"}, 
        {label: "Вторые блюда", value:"second"},
        {label: "Салаты",value:"salad"},
        {label: "Пельмени, манты",value:"pelmeni"},
        {label: "Закуски",value:"snacks"},
        {label: "Тесто, десерты", value:"dough"},
        {label: "Напитки",value:"drink" },
        {label: "Мультиварка",value:"multi"}
    ]);
    const [options1, setOptions1] = useState([
        {label: "Мясо",value: "meat,мяс,говя,баран,ягнят,свинин"},
        {label: "Рыба",value: "fish,рыб,форел,семг,тунец,тунца,суши,карп,речной,тунца"},
        {label: "Птица",value: "poultry,курин,куриц,индейк,утка,утин,гусин,гусь,гусин,перепелка,цесар,ципленок"},
        {label: "Морепродукты",value: "seafood,морепрод,кревет,мидии,мидий,кальмар,краб,рыб"},
        {label: "Грибы",value: "mashrooms,гриб,шампиньон,лисич,лисички,подосиновик,подберезовик,шиитак,рыжики,грузди,опята"},
        {label: "Овощи",value: "veg,овощ,картош,картоф,морков,огур,сельдер,помидор,свекл,лук,порей,дайкон,томат,авокад,редис,шпинат"},
        {label: "Блюда с крупами",value: "cereals,круп,греч,манк,манн,рис,овсян,геркулес,пшено,булгур"},
        {label: "Макароны",value: "pasta,макарон,спагет,вермишел,лапш"},
        {label: "Молоко,творог",value: "milk,молоко,молоч,кефир,ряженк,творог,творож"},
        {label: "Сыр",value: "cheese,сыр"},
        {label: "Фрукты, ягоды",value: "fruit,фрукт,ягод,яблок,груш,банан,киви,гранат,ягод,клубник,клубнич,черник,малин,смород,питахай,манго"},
        {label: "Орехи",value: "nut,орех,грец,фисташ,арахис,кунжут,миндаль,кешью"}
    ]);
    const [options2, setOptions2] = useState([ 
        {
          label: "Суп, бульон",
          value: "soup,суп,похлебка,бульон,борщ,рассольник,харчо,холодник,жаркое,кулеш,гаспачо,мисо,лагман,окрошка,свекольник,солянка,харш,шурпа,том-ям,том ям,димляма,димлама,уха из",
        },
        {
            label: "Каша",
            value: "kasha,каша,кашка",
        },
        {
          label: "Запеканка",
          value: "casserole,запеканка",
        },
        {
            label: "Плов",
            value: "pilaf,плов",
        },
        {
            label: "Пельмени",
            value: "pelmeni,пельмен,пельмени,хинкал,мант,равиол,вареник,гедз,вонтон,дамплинг,димсам,дим-сам,дим сам,курз",
        },    
        {
            label: "Голубцы",
            value: "cabbagerolls,голубц,долма",
        },
        {
            label: "Котлеты",
            value: "cutlets,котлет,люля,тефтели,ежики,фрикадельки,кебаб",
        },
        {
            label: "Драники, зразы",
            value: "dranik,зразы,биточки,колдуны,драники,дранники",
        },
        {
            label: "Бифштекс, отбивная",
            value: "chop,бифштекс,рамштекс,отбивн,шницель",
        },
        {
            label: "Гуляш, жаркое",
            value: "guliash,азу,бефстроганоф,гуляш,чахохбили,жаркое",
        },
        {
            label: "Сосиски, колбасы",
            value: "sausages,сосиски,сардельки,купаты,колбас,люля,шпикачки",
          },
          {
            label: "Гарнир",
            value: "garnish,гарнир,рагу,сотэ,баялды,тушеные,гречка,картофель,макароны,спагетти,спагети,овощи,рис",
          },
          {
            label: "Салат",
            value: "salad,салат",
          },
          {
            label: "Канапе, тарталетки",
            value: "kanape,канапе,тарталетки,тосты,сэндвич,сендвич,бутерброд",
          },
          {
            label: "Роллы, Суши",
            value: "roll,ролл,суши,урамаки,норимаки",
          },
          {
            label: "Рулеты",
            value: "rulet,рулет",
          },
          {
            label: "Торт",
            value: "cake,торт,чизкейк,тарт",
          },
          {
            label: "Пирог",
            value: "pie,пирог,штрудель,курник,рыбник,шарлотка,хачапури,кекс,кулич",
          },
          {
            label: "Пицца",
            value: "pizza,пицца",
          },
          {
            label: "Пирожки",
            value: "pies,peremyach,перемяч,перемеч,биляш,чебурек,лепешк,слойк,пирожки,самса,чебурек,розочки,вареники,ватрушки,расстега,кулебяк,пончик,поньчик,булочк,круассан,улитка,перемяч,хычин,кыстыбый,беляш,кутаб,пампуш,плюшки,слойки,эчпочмак,кексы,маффин",
          },
          {
            label: "Пирожное",
            value: "smallcake,пирожное,птифур,меренг,безе,эклер,круассан,улитка,кексы,маффин",
          },
          {
            label: "Печенье",
            value: "cookie,печенье,курабье,бисквит,крекер,галет,хворост,вафл,пряник",
          },
          {
            label: "Хлеб",
            value: "broad,хлеб,батон,лепешка,рогалик,брускет,каравай,булка,лаваш,чиабата,чиабатта,багет",
          },
          {
            label: "Тесто, блюда из теста",
            value: "dough,тесто,опара,пицца,блин,оладьи,панкейк,хачапури,пицца,лапша",
          },
          {
            label: "Десерт",
            value: "desert,десерт,пирожн,желе,фрукт,ягод,слад,конфет,крем,морож,клубник,банан,киви,малин,шоколад,ваниль,пудинг,эклер,безэ",
          },
          {
            label: "Кисломолочные",
            value: "yogurt,йогурт,ряженка,простокваша,кефир,мацони,сметана",
          },
          {
            label: "Гренки, сухарики",
            value: "toast,гренки,брускетта,крутон,тосты,сухари,снеки",
          },          
          {
            label: "Соус, подливка",
            value: "sauce,соус,бешамель,тартар,тар-тар,подлив,майонез,заправка,сальса,масло",
          },
          {
            label: "Напиток",
            value: "beverage,компот,напиток,смузи,чай,безалкогол,алкогол,кофе,фреш,сок,лагуна,лимонад,мохито,коктейль,морс,кисель,прохлад",
          },
          {
            label: "На мангале",
            value: "barbeque,мангал,шашлык,костре,углях,барбек,жаровн,печи",
          }
          ,
          {
            label: "Консервация",
            value: "salt,солен,солён,засол,заготов,малосол,корейски,квашен,маринад,маринованная,маринованный,маринованное,маринованные,на зиму",
          }
          ,
          {
            label: "Нарезки",
            value: "slicing,нарез,карвинг,тарел,блюд",
          }
          ,
          {
            label: "Закуска",
            value: "snack,закус,карпач,жульен,жюльен,тарталетки,канапе,тост,бутерброд,рулет,сэндвич,тарел,блюдо,нарез,сухарики,гренки,маслосол",
          }
          ,
          {
            label: "Варенье",
            value: "jam,варенье,джем,конфитюр,повидло",
          }
    ]);
    const [options3, setOptions3] = useState([ 
        {
          label: "Вегетарианское",
          value: "veg",
        },
        {
            label: "Постное",
            value: "lent",
        },        
        {
            label: "Низкокалорийное",
            value: "calorie",
        },
        {
            label: "Бюджетное",
            value: "cheap",
        },
        {
            label: "Праздничное",
            value: "festive",
        },
        {
          label: "Необычное",
          value: "unusual",
        },
        {
            label: "Пикантное",
            value: "spicy",
        },
        {
            label: "Экзотическое",
            value: "exotic",
        },
        {
            label: "Соленье",
            value: "marinade",
        }
        ,        
        {
            label: "На мангале",
            value: "bbq",
        },
        {
            label: "Безглютеновое",
            value: "gluten",
        }
        ,
        {
            label: "Безлактозное",
            value: "lactose",
        }
        ,
        {
            label: "Простое",
            value: "complexity",
        }
        ,
    ]);
    const [modal, setModal] = useState(false); 
    const [modal1, setModal1] = useState(false); 
    const jsonData = require('./calories.json');
    const jsonCaloriesCalc = require('./calories_calc.json');
    const [products, setProducts]= useState ([]);
    const [width, setWidth] = useState(0);
    const [filterBlock, setFilterBlock]= useState (true);  
    const [menuBlock, setMenuBlock]= useState (true);   
    const [userRole,setUserRole] = useState("");  

    const handleOpenFilter = () => {
        setFilterBlock (true);
    };
    const handleCloseFilter = () => {
        setFilterBlock (false);  
    }; 

    const handleOpenMenu = () => {
        setMenuBlock (true);
    };
    const handleCloseMenu = () => {
        setMenuBlock (false);  
    }; 
    
    useEffect (() =>    
        {   
            auth.authorization();   
            setUser (auth.currentUser);
            auth.auth; 
            async function getProducts() {
                try {                
                    const res = await fetch(`/api/auth/send_products`, 
                    {    
                        method: "GET",
                    })
                    return res.json().then((data) => {
                        setProducts(data)
                    })  
                }  
                catch (err) {
                    return(err);
                }
            } 
            getProducts();
    }, [auth]); 

    useEffect(() => {
        if (typeof window !== 'undefined') {            
            setWidth(window.innerWidth);      
            const handleResize = () => {
              setWidth(window.innerWidth);
            };      
            window.addEventListener('resize', handleResize);      
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          }
    }, []);   
    
    useEffect (() =>    
    {   
        if (user) 
        {
        async function getUserInfo() {
            const res = await fetch(`/api/account/user?email=${user}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {
                setUserRole(data[0].role);                
            }).catch((err) => {
                return(err);
            });
        }
        getUserInfo(); 
        }     
    }, [user]); 

    useEffect (() =>    
        {   
            products.forEach((element, index, arr) => {   
                arr[index].data11=<input required type="number" name="gr" onChange={handleChangeCalc}/>
                //arr[index].data12=<button id={"button"+arr[index].id} data-quantity="0" className='buttonOrange data-element' data-text="Отправить" />
                arr[index].data12=<button id={"button"+arr[index].id} />
            });
    }, [products]); 

    const handleChangeCalc = (e) => {
        setIsRemove(false);
        setIsRemoveCalc(false);
        const id= e.target.closest("tr").getAttribute('id');
        const tr = e.target.closest("tr");
        const productName = tr.children[0].textContent;       
        const calories = tr.getAttribute("data-calories");
        const proteins = tr.getAttribute("data-proteins");
        const fats = tr.getAttribute("data-fats");
        const carbohydrates = tr.getAttribute("data-carbohydrates");
        const quantity = tr.getAttribute("data-quantity"); // количество калорий   
        let trimStr = e.target.value.trim();   // удаление пробелов в начале и в конце
        let caloriesValue = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов   
        const isWhole = num => num % 1 === 0;
        const isWholeValue = (isWhole(caloriesValue));       
        
        tr.setAttribute("data-quantity", caloriesValue);
        if (caloriesValue==="")      
        {
            tr.setAttribute("data-quantity", "0")
        }
        setValueCalories((prev) => ({ ...prev, valueCalories: caloriesValue, product:productName, id:id, calories:calories, proteins: proteins, fats: fats, carbohydrates: carbohydrates, quantity: quantity, isWhole: isWholeValue}));             
    };  
    
    useEffect (() =>    
    {    
        if (isRemoveCalc===false)
        {
            valueCaloriesArr.push(valueCalories);
        }  
    }, [valueCalories]); 

    useEffect (() =>    
     {          
        if (valueCaloriesArr[0]?.length===0){ 
            valueCaloriesArr.splice(0,1); 
        }
        valueCaloriesArr.map((v, i, arr)=>{
            arrIndex[i]=(arr[i].id)
        });
        arrIndex.map((v, i, arr)=>{
            arrLastIndex[i]={"id": arr[i], "lastIndex": arr.lastIndexOf(arr[i])};
        });
        let unique = [];
        unique = arrLastIndex.filter((obj, idx, arr) => 
            idx === arr.findIndex((t) => t.id === obj.id));
        let uniqueValueCalories = [{"sumValueCalories": "", "sumCalories": "", "sumProteins": "", "sumСarbohydrates": "", "sumFats": "","valueCalories": "", "product":"", "id":"", "calories":"", "proteins": "", "fats": "", "carbohydrates": "", "quantity": ""}];
        unique.map((v, i, arr)=>{    
            uniqueValueCalories[i]=valueCaloriesArr[arr[i].lastIndex];           
        });
        let arrUnique = [];
        if (isRemoveCalc===false)
        {
        uniqueValueCalories?.map((v,i,arr) => {   
            if (v) {
                if (v.isWhole) {
                    let str = v.valueCalories.toString();
                    str.replace(/^0+/, ''); 
                    v.valueCalories =  Number(str); 
                }
                if (!v.isWhole) {
                    let str = v.valueCalories.toString();
                    str = str.replace(/^0+/, ''); 
                    const searchTerm = ".";
                    const indexOfFirst = str.indexOf(searchTerm);
                    if (indexOfFirst===0) {
                        str = `0${str}`;
                    }  
                    v.valueCalories =  Number(str);             
                }                
                v.valueCalories = Math.round(v.valueCalories * 100)/100;
                v.sumCalories = Math.round(((v.calories/100)*v.valueCalories) * 100)/100;
                v.sumСarbohydrates =  Math.round(((v.carbohydrates/100)*v.valueCalories) * 100)/100;
                v.sumFats =  Math.round(((v.fats/100)*v.valueCalories) * 100)/100;
                v.sumProteins =  Math.round(((v.proteins/100)*v.valueCalories) * 100)/100;
                v.sumValueCalories =  Math.round(v.valueCalories * 100)/100;
                if ((v.valueCalories?.length===0)||v.valueCalories<="0"||v.valueCalories==="") {                    
                }
                else arrUnique.push(v);
            }         
        });        
        }
        let totalCalories = 0;
        let totalFats = 0;
        let totalProteins = 0;
        let totalСarbohydrates = 0;
        let totalValueCalories = 0;
        for (let j=0; j<arrUnique.length; j++) {
            totalCalories = Math.round((arrUnique[j].sumCalories+totalCalories)* 100)/100;
            totalFats = Math.round((arrUnique[j].sumFats+totalFats)* 100)/100;
            totalProteins = Math.round((arrUnique[j].sumProteins+totalProteins)* 100)/100;
            totalСarbohydrates = Math.round((arrUnique[j].sumСarbohydrates+totalСarbohydrates)* 100)/100;
            totalValueCalories = Math.round((arrUnique[j].sumValueCalories+totalValueCalories)* 100)/100;
        }
        totalValues.totalCalories = totalCalories;
        totalValues.totalFats = totalFats;
        totalValues.totalProteins = totalProteins;
        totalValues.totalСarbohydrates = totalСarbohydrates;
        totalValues.totalValueCalories =totalValueCalories;

        if (uniqueValueCalories[0]!==undefined) {
            setValueCaloriesList(arrUnique); // массив уникальных продуктов с введенным юзером количеством грамм
        }
        else setValueCaloriesList([]);   
        setIsRemove(false);
       }, [valueCalories, valueCaloriesArr, isRemove, isRemoveCalc]); 

    const handleOpen = () => {
        setSearch (true);
    }
    const handleClose = () => {
        setSearch (false);  
    }    
    const handleChange = (e) => {
        let trimStr = e.target.value.trim();   // удаление пробелов в начале и в конце
        let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов
        setInput((prev) => ({ ...prev, [e.target.name]: trimStr1 })); 
    };  
    const handleClick = (() => {  
        if (input.search_text!=="") {
             router.push(`/recipes/search?state=${input.search_text}` , { params: {search:input.search_text}});
        }
    });
    const handleSubmit = async (e) => {
        try {
               await auth.logout();
        } 
        catch (err) {
            return(err);  
        }              
    };
    
    const handleChangeSelect = (e) => {   
        setIsFilter(true);        
        if (e.value!=="") {  
            setSortValue ({
                type: e.value,
                typeName: e.label
            });
        }        
    } 

    const handleChangeSelect1 = (e) => {   
        setIsFilter(true);
        setSortValue1 ({
            compositionName: "Любой ингредиент",
            composition: "all"
        });
        if (e.value!=="")       
        {            
            const sortValueArr = [];
            const sortLabelArr = [];
            for(const arr of e) {
                sortValueArr.push(arr.value);   
                sortLabelArr.push(arr.label);     
            }
            let sortValueString = sortValueArr.join(",");   
            let sortLabelString = sortLabelArr.join(",");   
            setSortValue1 ({
                compositionName: sortLabelString,
                composition: sortValueString
            });
        }
        if (e.length===0)         
        setSortValue1 ({
            compositionName: "Любой ингредиент",
            composition: "all"
        });
    }

    useEffect (() =>    
    {   
        if (isFilter) {
        let query = Object.assign({}, sortValue, sortValue1, sortValue2, sortValue3);
        router.push({
            pathname: `/filter/search_params`,
                query: query
            });
            setIsFilter(false); 
        }
    }, [isFilter]); 

    const handleChangeSelect2 = (e) => {
        setIsFilter(true);
        setSortValue2 ({
            kindName: "Любой ингредиент",
            kind: "all"
        });
        if (e.value!=="")       
        {            
            const sortValueArr = [];
            const sortLabelArr = [];
            for(const arr of e) {
                sortValueArr.push(arr.value);   
                sortLabelArr.push(arr.label);     
            }
            let sortValueString = sortValueArr.join(",");   
            let sortLabelString = sortLabelArr.join(",");   
            setSortValue2 ({
                kindName: sortLabelString,
                kind: sortValueString
            });
        }
        if (e.length===0)         
        setSortValue2 ({
            kindName: "Любое блюдо",
            kind: "all"
        });
    } 

    const handleChangeSelect3 = (e) => {
        setIsFilter(true);
        setSortValue3 ({
            propertyName: "Любое свойство",
            property: "all"
        });
        if (e.value!=="")       
        {            
            const sortValueArr = [];
            const sortLabelArr = [];
            for(const arr of e) {
                sortValueArr.push(arr.value);   
                sortLabelArr.push(arr.label);     
            }
            let sortValueString = sortValueArr.join(",");   
            let sortLabelString = sortLabelArr.join(",");   
            setSortValue3 ({
                propertyName: sortLabelString,
                property: sortValueString
            });
        }
        if (e.length===0)         
        setSortValue3 ({
            propertyName: "Любое свойство",
            property: "all"
        });
    } 

    function removeProduct(e, i ) {  
        setIsRemove(true); 
        if (e)    
        {
            const index = valueCaloriesList.findIndex(n => n.id === e.id);
            e.valueCalories='0';
            const tr = document.getElementById(e.id);
            if (tr) {
                tr.setAttribute("data-quantity", "0"); 
                tr.children[1].children[0].value="";  
            }                        
        }
    }    
    const removeAllCalc = () => {
        setIsRemoveCalc(true);
        valueCaloriesList.map ((v,i,arr )=> 
            {                
                const tr = document.getElementById(v.id);
                if (tr) {
                    tr.setAttribute("data-quantity", "0");
                    tr.children[1].children[0].value=""; 
                }
            }
        )
        setValueCaloriesArr([]);
    }

  return (
    <div className='navContainer'> 
        {width<620 && !menuBlock &&
            <div className='menu'>
                <img onClick = {handleOpenMenu} src='/icons/icon_menu_open.png' alt='навигация' />
            </div>                        
        }  
        {width<620 && menuBlock &&
            <div className='menu'>
                <img onClick = {handleCloseMenu} src='/icons/icon_menu.png' alt='навигация' />
            </div>                        
        }  
        <div className="navHeader">
            <div className="navWrapper">            
                <section className="navSection">                            
                    <span className="navTitle">
                        <Image priority alt="Logo Vseresepty.ru cooking recipes" src="/icons/logo.png" width={71} height={76} />
                        <Link href="/">всерецепты</Link>                                           
                    </span>                                   
                    <div className="nav">
                        {width>620 &&
                        <div className="navLeft">
                        <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=kitchen"><span>КУХНЯ</span></Link>
                                </div>
                                <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=kitchen&subtype=rus">Русская</Link>
                                    <Link href="/recipes/sort?type=kitchen&subtype=eur">Европейская</Link>
                                    <Link href="/recipes/sort?type=kitchen&subtype=kavk">Кавказская</Link>
                                    <Link href="/recipes/sort?type=kitchen&subtype=turk">Тюркская</Link>
                                    <Link href="/recipes/sort?type=kitchen&subtype=asia">Азиатская</Link>      
                                    <Link href="/recipes/sort?type=kitchen&subtype=pan">Паназиатская</Link>   
                                    <Link href="/recipes/sort?type=kitchen&subtype=ind">Индийская</Link>   
                                    <Link href="/recipes/sort?type=kitchen&subtype=amer">Американская</Link> 
                                    <Link href="/recipes/sort?type=kitchen&subtype=mex">Мексиканская</Link>                                                                
                                </span>
                            </div>                          
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=main"><span>ОСНОВНЫЕ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=main&subtype=bouillon">Бульоны</Link>
                                    <Link href="/recipes/sort?type=main&subtype=cereals">Крупы и каши</Link>
                                    <Link href="/recipes/sort?type=main&subtype=garnish">Гарниры</Link>
                                    <Link href="/recipes/sort?type=main&subtype=sauces">Соусы</Link>
                                    <Link href="/recipes/sort?type=main&subtype=base">Основы и заготовки</Link>
                                    <Link href="/recipes/sort?type=main&subtype=marinade">Маринады, соления</Link>
                                    <Link href="/recipes/sort?type=main&subtype=compote">Компоты, варенья</Link>
                                </span>
                            </div>   
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=soup"><span>СУПЫ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=soup&subtype=meat">Мясные</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=fish">Рыба, морепродукты</Link>                                    
                                    <Link href="/recipes/sort?type=soup&subtype=veg">Вегетарианские</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=pure">Супы-Пюре</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=cold">Холодные</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=bbq">На мангале</Link>
                                </span>
                            </div>  
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=second"><span>ВТОРЫЕ БЛЮДА</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=second&subtype=meat">Мясо</Link>
                                    <Link href="/recipes/sort?type=second&subtype=poultry">Птица</Link>
                                    <Link href="/recipes/sort?type=second&subtype=fish">Рыба и морепродукты</Link>
                                    <Link href="/recipes/sort?type=second&subtype=veg">Вегетарианские</Link>
                                    <Link href="/recipes/sort?type=second&subtype=bbq">На мангале</Link>
                                </span>
                            </div> 
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=salad"><span>САЛАТЫ</span></Link>
                            </div>
                            <span className="dropdownContent">                                  
                                    <Link href="/recipes/sort?type=salad&subtype=meat">Мясные</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=fish">Рыбные, с морепродуктами</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=warm">Теплые</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=fruit">Фруктовые</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=veg">Вегетарианские</Link>
                                </span>
                            </div> 
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=pelmeni"><span>ПЕЛЬМЕНИ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=pelmeni&subtype=meat">С мясом</Link>
                                    <Link href="/recipes/sort?type=pelmeni&subtype=fish">Рыба, морепродукты</Link>
                                    <Link href="/recipes/sort?type=pelmeni&subtype=veg">Вегетарианские</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=snacks"><span>ЗАКУСКИ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=snacks&subtype=roll">Рулеты, роллы, рулетики</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=salad">Салатные</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=pickles">Маринады, соленья</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=veg">Вегетарианские</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=cut">Нарезка</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=can">Канапе, тарталетки</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=snack">Снеки, сухарики</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=dough"><span>ТЕСТО, ДЕСЕРТ</span></Link>
                            </div>
                            <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=dough&subtype=dough">Блюда из теста</Link>
                                    <Link href="/recipes/sort?type=dough&subtype=sweet">Сладкие блюда из теста</Link>
                                    <Link href="/recipes/sort?type=dough&subtype=dessert">Десертные блюда</Link>
                                    <Link href="/recipes/sort?type=dough&subtype=cream">Крем, глазурь</Link>
                                    <Link href="/recipes/sort?type=dough&subtype=gateau">Рецепты теста</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=drink"><span>НАПИТКИ</span></Link>
                            </div>
                            <span className="dropdownContent">
                                    <Link href="/recipes/sort?type=drink&subtype=cold">Прохладительные</Link> 
                                    <Link href="/recipes/sort?type=drink&subtype=smooth">Смузи</Link>    
                                    <Link href="/recipes/sort?type=drink&subtype=coctails">Коктейли</Link>  
                                    <Link href="/recipes/sort?type=drink&subtype=compote">Морсы, компоты</Link>                                  
                                    <Link href="/recipes/sort?type=drink&subtype=tea">Чаи</Link>
                                    <Link href="/recipes/sort?type=drink&subtype=coffee">Кофе</Link>     
                                    <Link href="/recipes/sort?type=drink&subtype=alco">Алкогольные</Link>                                                                                                    
                                </span>
                            </div>
                            <div className="dropdown">
                            <div className="dropbtn">
                                <Link href="/recipes/sort?type=multi"><span>МУЛЬТИВАРКА</span></Link>
                            </div>
                            <span className="dropdownContent">                               
                                    <Link href="/recipes/sort?type=multi&subtype=soup">Супы</Link> 
                                    <Link href="/recipes/sort?type=multi&subtype=second">Вторые блюда</Link>    
                                    <Link href="/recipes/sort?type=multi&subtype=dough">Тесто, десерт</Link>  
                                    <Link href="/recipes/sort?type=multi&subtype=main">Заготовки, основы</Link>                                                                                                                                      
                                </span>
                            </div>
                        </div> 
                        }
                        {width<620 && !menuBlock && 
                            <div className="navLeft">
                                <div className="dropdown">
                                    <div className="dropbtn">
                                        <Link href="/recipes/sort?type=kitchen"><span>КУХНЯ</span></Link>
                                    </div>
                                    <span className="dropdownContent">                                       
                                        <Link href="/recipes/sort?type=kitchen&subtype=rus">Русская</Link>
                                        <Link href="/recipes/sort?type=kitchen&subtype=eur">Европейская</Link>
                                        <Link href="/recipes/sort?type=kitchen&subtype=kavk">Кавказская</Link>
                                        <Link href="/recipes/sort?type=kitchen&subtype=turk">Тюркская</Link>
                                        <Link href="/recipes/sort?type=kitchen&subtype=asia">Азиатская</Link>      
                                        <Link href="/recipes/sort?type=kitchen&subtype=pan">Паназиатская</Link>   
                                        <Link href="/recipes/sort?type=kitchen&subtype=ind">Индийская</Link>   
                                        <Link href="/recipes/sort?type=kitchen&subtype=amer">Американская</Link> 
                                        <Link href="/recipes/sort?type=kitchen&subtype=mex">Мексиканская</Link>                                                                
                                    </span>
                                </div>                          
                                <div className="dropdown">
                                    <div className="dropbtn">
                                        <Link href="/recipes/sort?type=main"><span>ОСНОВНЫЕ</span></Link>
                                    </div>
                                    <span className="dropdownContent">                                       
                                        <Link href="/recipes/sort?type=main&subtype=bouillon">Бульоны</Link>
                                        <Link href="/recipes/sort?type=main&subtype=cereals">Крупы и каши</Link>
                                        <Link href="/recipes/sort?type=main&subtype=garnish">Гарниры</Link>
                                        <Link href="/recipes/sort?type=main&subtype=sauces">Соусы</Link>
                                        <Link href="/recipes/sort?type=main&subtype=base">Основы и заготовки</Link>
                                        <Link href="/recipes/sort?type=main&subtype=marinade">Маринады и соления</Link>
                                        <Link href="/recipes/sort?type=main&subtype=compote">Компоты и варенья</Link>
                                    </span>
                                </div>   
                                <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=soup"><span>СУПЫ</span></Link>
                                </div>
                                <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=soup&subtype=meat">Мясные</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=fish">Рыба, морепродукты</Link>                                    
                                    <Link href="/recipes/sort?type=soup&subtype=veg">Вегетарианские</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=pure">Супы-Пюре</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=cold">Холодные</Link>
                                    <Link href="/recipes/sort?type=soup&subtype=bbq">На мангале</Link>
                                </span>
                            </div>  
                            <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=second"><span>ВТОРЫЕ БЛЮДА</span></Link>
                                </div>
                                <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=second&subtype=meat">Мясо</Link>
                                    <Link href="/recipes/sort?type=second&subtype=poultry">Птица</Link>
                                    <Link href="/recipes/sort?type=second&subtype=fish">Рыба и морепродукты</Link>
                                    <Link href="/recipes/sort?type=second&subtype=veg">Вегетарианские</Link>
                                    <Link href="/recipes/sort?type=second&subtype=bbq">На мангале</Link>
                                </span>
                            </div> 
                            <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=salad"><span>САЛАТЫ</span></Link>
                                </div>
                                <span className="dropdownContent">                                  
                                    <Link href="/recipes/sort?type=salad&subtype=meat">Мясные</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=fish">Рыбные, с морепродуктами</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=warm">Теплые</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=fruit">Фруктовые</Link>
                                    <Link href="/recipes/sort?type=salad&subtype=veg">Вегетарианские</Link>
                                </span>
                            </div> 
                            <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=pelmeni"><span>ПЕЛЬМЕНИ</span></Link>
                                </div>
                                <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=pelmeni&subtype=meat">С мясом</Link>
                                    <Link href="/recipes/sort?type=pelmeni&subtype=fish">Рыба, морепродукты</Link>
                                    <Link href="/recipes/sort?type=pelmeni&subtype=veg">Вегетарианские</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=snacks"><span>ЗАКУСКИ</span></Link>
                                </div>
                                <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=snacks&subtype=roll">Рулеты, роллы, рулетики</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=salad">Салатные</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=pickles">Маринады, соленья</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=veg">Вегетарианские</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=cut">Нарезка</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=can">Канапе, тарталетки</Link>
                                    <Link href="/recipes/sort?type=snacks&subtype=snack">Снеки, сухарики</Link>
                                </span>
                            </div>
                             <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=dough"><span>ТЕСТО, ДЕСЕРТ</span></Link>
                                </div>
                                <span className="dropdownContent">                                       
                                    <Link href="/recipes/sort?type=dough&subtype=dough">Блюда из теста</Link>
                                    <Link href="/recipes/sort?type=dough&subtype=sweet">Сладкие блюда из теста</Link>
                                    <Link href="/recipes/sort?type=dough&subtype=dessert">Десертные блюда</Link>
                                    <Link href="/recipes/sort?type=dough&subtype=cream">Крем, глазурь</Link>
                                </span>
                            </div>
                            <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=drink"><span>НАПИТКИ</span></Link>
                                </div>
                                <span className="dropdownContent">
                                    <Link href="/recipes/sort?type=drink&subtype=cold">Прохладительные</Link> 
                                    <Link href="/recipes/sort?type=drink&subtype=smooth">Смузи</Link>    
                                    <Link href="/recipes/sort?type=drink&subtype=coctails">Коктейли</Link>  
                                    <Link href="/recipes/sort?type=drink&subtype=compote">Морсы, компоты</Link>                                  
                                    <Link href="/recipes/sort?type=drink&subtype=tea">Чаи</Link>
                                    <Link href="/recipes/sort?type=drink&subtype=coffee">Кофе</Link>    
                                    <Link href="/recipes/sort?type=drink&subtype=alco">Алкогольные</Link>                                                                                                       
                                </span>
                            </div>
                            <div className="dropdown">
                                <div className="dropbtn">
                                    <Link href="/recipes/sort?type=multi"><span>МУЛЬТИВАРКА</span></Link>
                                </div>
                                <span className="dropdownContent">                               
                                    <Link href="/recipes/sort?type=multi&subtype=soup">Супы</Link> 
                                    <Link href="/recipes/sort?type=multi&subtype=second">Вторые блюда</Link>    
                                    <Link href="/recipes/sort?type=multi&subtype=dough">Тесто, десерт</Link>  
                                    <Link href="/recipes/sort?type=multi&subtype=main">Заготовки, основы</Link>                                                                                                                                      
                                </span>
                            </div>
                        </div> 
                        }

                        <div>                       
                            <div className="navRight">                            
                                <div>                           
                                <div>                           
                                    <div className="searchTopNav">
                                        {!search &&
                                            <div className="searchNav">  
                                                <svg onClick = {handleOpen} width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="rgba(0, 0, 0, 0.65)"/>
                                                </svg>                        
                                            </div>            
                                        }
                                        {search &&
                                            <div className="searchTopNavClose">  
                                                <div className="searchTopNavInput">                                          
                                                    <input type="search" placeholder="Поиск" name="search_text" onChange={handleChange}/>
                                                    <div className="searchTopNavIcon" onClick = {handleClick}>
                                                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="rgba(0, 0, 0, 0.65)"/>
                                                        </svg>
                                                    </div>
                                                </div> 
                                                {<svg onClick={handleClose} width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"  fill="#0F0F0F"/>
                                                </svg>}
                                            </div>  
                                        }
                                    </div>
                                </div>                                  
                                </div>  
                                {(!auth.auth) && 
                                    <div className='loginNavRight'>
                                        <Link href="/auth/login">Войти</Link>   
                                    </div>
                                }   
                                {(auth.auth) && 
                                    <div className='dropdown'>
                                        <div className='dropbtn'>
                                            <span className='dropbtnpos'>
                                                <img src='/icons/icon-acc.png' loading="lazy" alt="logo vseresepty.ru cooking recipes "/>
                                                <span>{auth.currentUser}</span>
                                            </span>
                                        </div>
                                        <span className='dropdownContentRight loginNavRightBtn'>                                                
                                            <Link href={`/users/account?user=${user}`}>Личный кабинет</Link>
                                            <Link href="/users/add_recipe">Добавить рецепт</Link>
                                            {userRole==="admin" &&
                                                <Link href="/users/add_article">Добавить статью</Link>
                                            }                                            
                                            <button onClick={handleSubmit}>Выйти</button>
                                        </span>
                                    </div>  
                                }                                               
                            </div>                                                            
                        </div> 
                    </div> 
                    {/* <div className='festiveNav'>
                        <span><a href="/filter/festive"><img src='/icons/icon_fest.png'/>НОВОГОДНИЙ СТОЛ</a></span>
                    </div>  */}

                    {/* <div className='maslNav'>
                        <span><a href="/filter/maslenitsa"><img src='/icons/icon_masl.png'/>МАСЛЕНИЦА</a></span>
                    </div>   */}

                    {/*  <div className='maslNav'>
                        <span><a href="/filter/paskha"><img src='/icons/icon_pasha.png'/>ПАСХА</a></span>
                    </div> */}
  

                    <div className='maslNav'>
                    <span><a href="/filter/maslenitsa"><img src='/icons/icon_masl.png'/>МАСЛЕНИЦА</a></span>
                        {/* <span><a href="/filter/bbq"><img src='/icons/icon_bbq.png'/>БЛЮДА НА МАНГАЛЕ</a></span>
                        <span className='mr-l-20'><a href="/filter/marinade"><img src='/icons/icon_marinade.png'/>КОНСЕРВАЦИЯ</a></span> */}
                        {/* <span><a href="/filter/festive"><img src='/icons/icon_newyear.png'/>НОВОГОДНИЙ СТОЛ</a></span> */}
                        <span  className='mr-l-20'><a href="/articles"><img src='/icons/icon_article_3.png'/>СТАТЬИ</a></span>
                    </div>  
                    <div className='filter_wrap'>
                    {!filterBlock &&
                        <div>
                            <span className='cursor-pointer'>                                                 
                                <img onClick = {handleOpenFilter} src="/icons/icon_filter.png" alt=""/>                       
                            </span>  
                            <div className='filter_wrap_left'>  
                                <p>Сортировать по:</p>                         
                                <CustomSelect        
                                options={options}
                                placeHolder='Раздел...'
                                onChange={(e) => handleChangeSelect(e)}
                                />
                                <CustomSelect        
                                    options={options1}
                                    placeHolder='Состав...'
                                    onChange={(e) => handleChangeSelect1(e)}
                                    isSearchable
                                    isMulti                            
                                />   
                                <CustomSelect        
                                    options={options2}
                                    placeHolder='Тип...'
                                    onChange={(e) => handleChangeSelect2(e)}
                                    isSearchable
                                    isMulti                            
                                />    
                                <CustomSelect        
                                    options={options3}
                                    placeHolder='Свойство...'
                                    onChange={(e) => handleChangeSelect3(e)}
                                    isSearchable
                                    isMulti                            
                                />                   
                            </div>                                                        
                        </div>
                        }
                        {filterBlock &&
                            <div>
                                <span className='cursor-pointer'>                                                 
                                    <img onClick = {handleCloseFilter} src="/icons/icon_filter.png" alt=""/>                       
                                </span>                                                     
                            </div>
                        } 
                        <div className="cursor-pointer"> 
                            <img onClick={() => setModal1(true)} src='/icons/icon_calorie.png' className='pd-r-7' />                            
                            <img className='pd-l-10' src='/icons/icon_weight.png' onClick={() => setModal(true)} />
                        </div>
                        <Modal
                            isVisible={modal}
                            title="Мера продуктов"
                            content={<MeasureProducts />}
                            onClose={() => setModal(false)}    
                        />  
                        <Modal
                            isVisible={modal1}
                            title="Калорийность и состав продуктов"
                            content={<>
                                {(valueCaloriesList&&(valueCaloriesList.length!==0)) && <>
                                    <table className='border-grey'>
                                        <thead>
                                            <tr>
                                                <th className='text-center table-products-pd-1' colSpan={7}>Результат</th>
                                            </tr> 
                                            <tr className='table-products-pd-2 font-Alegreyasans-bold'>
                                                <th className='table-products-pd-3'>Продукт</th>
                                                <th className='table-products-pd-4'>Граммы</th>
                                                <th className='table-products-pd-4'>Белки</th>
                                                <th className='table-products-pd-4'>Жиры</th>
                                                <th className='table-products-pd-4'>Углеводы</th>
                                                <th>Ккал</th>
                                                <th></th>
                                            </tr>                                        
                                            <tr>                                                                                                              
                                                <td colSpan="7">
                                                    <div className='border-bottom'></div>
                                                </td> 
                                            </tr>
                                        </thead>
                                    {valueCaloriesList.map ((e, i, arr)=> 
                                    <>      
                                        <tbody>
                                            <tr className='table-products-pd-2' key={"valueCalories"+i}>                                                                                                              
                                                <td className='table-products-pd-6'>{e?.product}</td>  
                                                <td className='table-products-pd-4'>{e?.valueCalories}</td>  
                                                <td className='table-products-pd-4'>{e?.sumProteins}</td>  
                                                <td className='table-products-pd-4'>{e?.sumFats}</td>  
                                                <td className='table-products-pd-4'>{e?.sumСarbohydrates}</td>  
                                                <td className='text-red table-products-pd-7'>{e?.sumCalories}</td>  
                                                <td className='table-products-pd-5 cursor-pointer' onClick={() => removeProduct(arr[i], i)}><img src="/icons/icon-remove-gray-sm.png"/></td> 
                                            </tr>  
                                        
                                            <tr key={"valueCaloriesBorder"+i}>                                                                                                              
                                                <td colSpan="7">
                                                    <div className='border-bottom'></div>
                                                </td> 
                                            </tr>  
                                        </tbody>                          
                                        </> 
                                        )                                
                                    } 
                                    {totalValues && <>  
                                        <tfoot>                                    
                                            <tr className='table-products-pd-2'>                                                                                                              
                                                <td className='table-products-pd-9 text-red'>Всего:</td>  
                                                <td className='table-products-pd-8'>{totalValues.totalValueCalories}</td>  
                                                <td className='table-products-pd-8'>{totalValues.totalProteins}</td>  
                                                <td className='table-products-pd-8'>{totalValues.totalFats}</td>  
                                                <td className='table-products-pd-8'>{totalValues.totalСarbohydrates}</td>  
                                                <td className='table-products-pd-8 text-red font-bold'>{totalValues.totalCalories}</td>  
                                                <td className='table-products-pd-10 cursor-pointer' onClick={() => removeAllCalc()}><img src="/icons/icon-remove-gray-m.png"/></td> 
                                            </tr> 
                                        </tfoot>                            
                                        </>                               
                                    } 
                                    </table>
                                    </>
                                } 
                                <TableCollapse 
                                columns={jsonCaloriesCalc.columns} 
                                createDataParams={products} 
                                tableName={jsonCaloriesCalc.name} 
                                metaDescription={jsonCaloriesCalc.metaDescription}
                                metaName={jsonCaloriesCalc.metaName}
                                icon={jsonCaloriesCalc.icon}
                                tableId="calcCalories"
                                text="Воспользуйтесь поиском и введите количество граммов используемых продуктов. Результат отображается в таблице выше."
                                 />
                                 <div className='table-pd-1'/>
                                <TableCollapse 
                                columns={jsonData.columns} 
                                createDataParams={jsonData.createDataParams} 
                                tableName={jsonData.name} 
                                metaDescription={jsonData.metaDescription}
                                metaName={jsonData.metaName}
                                icon={jsonData.icon}
                                 />
                                 <div className='table-pd-1'/>
                                 </>
                                }
                            onClose={() => setModal1(false)}    
                        />  
                        {/*<div>ENG</div>*/}
                    </div>                  
                </section>            
            </div>   
        </div>
    </div>
    
  )
}

export default Navbar