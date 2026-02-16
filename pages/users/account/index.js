
'use client'
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import KeyRandome from '../../services/key_randome';
import Modal from '../../components/modal';
import { useAuth } from '../../context/context';
import Link from 'next/link';
import Footer from '../../components/footer';
import EmptyText from '../../services/empty-text';
import AddImage from '../../services/cropper/add-image';
import HeadMetaTags from '../../components/head';

const Account = () => {
    const auth = useAuth();
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState ("");   
    const [modalPublic, setModalPublic] = useState(false); 
    const [modalPassword, setModalPassword] = useState(false); 
    const [modalTextPublic, setModalTextPublic] = useState (""); 
    const [modalExit, setModalExit] = useState(false);
    const [currentPage, setCurrentPage] = useState ("btn1");
    const [userInfo, setUserInfo] =  useState({username: "", email: "", first_name: "", last_name: "", birth_day: "", id: "", public_name: "", public_img: "", site: "", instagram: "", facebook: "", twitter: ""});    
    const [birthDay, setBirthDay] =  useState ("");
    const [disabled, setDisabled]=useState(false);    
    const [savedRecipes, setSavedRecipes] = useState ({"saved": []});  
    const [isDirty, setIsDirty] = useState(false);    
    const [arrSaved, setArrSaved] = useState ({"saved": []});   
    const [mailLink, setMailLink] = useState(""); 
    const [keyLink, setKeyLink] = useState (KeyRandome(26));
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [inputValueFirst, setInputValueFirst] = useState(false);
    const [inputValueLast, setInputValueLast] = useState(false);
    let [fixedSaveRecipes, setFixedSaveRecipes] = useState ({"saved": []}); 
    const [errorName, setErrorName] = useState (); 
    const [errorLastName, setErrorLastName] = useState (); 
    const [mainImg, setMainImg] = useState ("");    // основное фото
    const userEmail = useSearchParams().get('user');
    const url = process.env.URL;
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        birth_day: "",
        email: user
    });
    const [emailSent, setEmailSent] = useState();
    const [errEmailSent, setErrEmailSent] = useState(true);
    const [emailParam, setEmailParam] = useState({
        email: "",
        message: "",
        subject: "",
        html: ""
    });

    const [inputsPublic, setInputsPublic] = useState({
        public_name: "",
        public_img: "",
        site: "",
        instagram: "",
        facebook: "",
        twitter: "",
        email: user,
        key: ""
    });
    const [input, setInput] = useState([{"search_text": ""}]);
    const [statusReset, setStatusReset] = useState("");
    const handleClickSearch = (() => {   
        if (input.search_text!=="") {
            router.push(`/recipes/search?state=${input.search_text}`);
        }
    }); 
    const handleChangeSearch = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: EmptyText (e.target.value) }));
    };
    useEffect (() =>    
    {   
        auth.authorization();   
        setUser (auth.currentUser);    
        auth.auth; 
    }, [auth, userEmail]); 
    useEffect(() => {
        if (user && user !==null) {
           async function getUserInfo() {
                const res = await fetch(`/api/account/user?email=${user}`, {
                    method: "GET",
                })                    
                return res.json().then((data) => {
                    setUserInfo(data[0]);
                    setMainImg (data[0]?.public_img);
                    setInputs({
                        first_name: data[0]?.first_name,
                        last_name: data[0]?.last_name,
                        birth_day: data[0]?.birth_day,
                        email: data[0]?.email
                    });
                    setInputsPublic({
                        public_name: data[0]?.public_name,
                        public_img: data[0]?.public_img,
                        site: data[0]?.site,
                        instagram: data[0]?.instagram,
                        facebook: data[0]?.facebook,
                        twitter:data[0]?.twitter,
                        email: user,
                        key: data[0]?.key_link,
                    });
                }).catch((err) => {
                    return(err);
                });
            }
            getUserInfo();       
                async function getSavedRecipe() {
                    const res = await fetch(`/api/account/saved_recipes?email=${user}`, {
                        method: "GET",
                    })                    
                    return res.json().then((data) => {     
                        const recipes = data[0].saved_recipes;    
                        const recipesArr = JSON.parse(recipes);                   
                       setSavedRecipes(recipesArr);                       
                    }).catch((err) => {
                        return(err);
                    });
            }
            getSavedRecipe();  
        };                 
        setEmailParam ({
            email: user,
            message: "",
            subject: "Смена пароля на сайте 'ВсеРецепты'",
            html: `<h3>Здравствуйте, ${user}!</h3><p>Для смены пароля на "ВсеРецепты" пройдите по <a href="${url}/auth/reset_password?email=${user}&key=${keyLink}">ссылке.</p>`,
            });       
    }, [user, userEmail]);

       useEffect(() => {  
         setMailLink (auth);
    }, [auth, auth.currentUser]);

    useEffect(() => {  
    if (inputs.first_name&&inputs.first_name.length>0) {            
         inputs.first_name=EmptyText(inputs.first_name);  
         if (inputs.first_name==="")   {
             setInputValueFirst(false);
             setErrorName (false);
         }
         else {
             setInputValueFirst(true);
             setErrorName (true);
         }
    }
    if (inputs.last_name&&inputs.last_name.length>0) {  
         inputs.last_name=EmptyText(inputs.last_name)  ;  
         if (inputs.last_name==="")   {
             setInputValueLast(false);
             setErrorLastName (false)
         }
         else {
             setInputValueLast(true);
             setErrorLastName (true)
         }
    }
    }, [inputs])

    useEffect(() => {
        setArrSaved(savedRecipes);
        arrSaved?.saved?.forEach(function(item, index, array) {
             item.like = "false";
        });                   
    }, [savedRecipes, arrSaved]);

    useEffect(() => {
        let b = new Date(userInfo?.birth_day);
        let bm, bd;
        bm = b.getMonth();
        bm++;
        if (bm===13) {bm=12};
        if (bm<10) {
             bm = `0${bm}`
        }
        if (b.getDate()<10) {
             bd = `0${b.getDate()}`
        }
        else bd = b.getDate();
        setBirthDay (`${b.getFullYear()}-${bm}-${bd}`);      
        //inputs.birth_day = `${b.getFullYear()}-${bm}-${bd}`;
    }, [userInfo, inputs]);


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangePublic = (e) => {
        setInputsPublic((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChangeDate = (e) => {
        setBirthDay(e.target.value);
        inputs.birth_day = e.target.value;   
    };
    const handleClick = async () => {      
        try {
            const res = await fetch(`/api/account/user?email=${user}`, 
            {    
                method: "PATCH",
                body: JSON.stringify(inputs)
            });  
            if (res.status===200) {
                setModalText ("Информация успешно изменена.")
                setModal (true);
            }
            if (res.status===401) {
                setModalText ("Информация не была изменена. Попробуйте еще раз.")
                setModal (true);
            }
        }  
        catch (err) {
            return(err);
        }
        // window.location.reload();
    };

    const handleModalExit = () => {    
        setModalExit(true);
    };

    const handleModal = () => {    
        setModal(false);
    };

    const handleModalPublic = () => {    
        setModalPublic(false);
    };

    const handleModalPassword = () => {    
       setModalPassword(false);
    };

    const handleClickPublic = async () => {  
        const img = document.getElementById("avatarImage").src;
        const avatar = img.substring(img.lastIndexOf('/')+1,img.length);  
        if (avatar==="icon_avatar_big.png")
        {
            inputsPublic.public_img="";
        }
        else 
        {
            inputsPublic.public_img=avatar;
        }
        try {
            const res = await fetch(`/api/account/user?email=${user}&avatar=null`, 
            {    
                method: "PUT",
                body: JSON.stringify(inputsPublic), 
            });   
            if (res.status===200) {
                setModalTextPublic ("Информация успешно изменена.")
                setModalPublic (true);
            }
             if (res.status===401) {
                setModalTextPublic ("Информация не была изменена. Попробуйте еще раз.")
                setModalPublic (true);
            }
        }  
        catch (err) {
            return(err);
        }
    };

    const resetPassword = async () =>
        {    
            setModalPassword(false);
            setEmailSent(true);
            setErrEmailSent(true);           
            //добавляем key в таблицу users
            const addKey = async() => {   
                try {
                    const res = await fetch(`/api/auth/add_user?email=${user}&key=${keyLink}`,  
                    {
                        method: "PATCH",
                    });  
                    if (res.status===200)
                        {
                            // отправляем письмо с key на почту
                            try {
                            const res = await fetch(`/api/auth/register?email=${user}`, 
                            {
                                method: "POST",
                                body: JSON.stringify(emailParam),
                            });  
                            if (res.status===200) {
                                setEmailSent(true);
                                setErrEmailSent(true);
                                setModalPassword(true);
                            }
                            else {
                                setEmailSent(false);
                                setErrEmailSent(false);
                            }
                            }  
                            catch (err) {                                        
                                    setEmailSent(false);
                                    setErrEmailSent(false);
                                    return(err);
                            }                          
                        }
                    else {
                        setEmailSent(false);
                        setErrEmailSent(false);
                    }
                    }  
                catch (err) {
                    setEmailSent(false);
                    setErrEmailSent(false);
                    return(err);
                }}
            addKey();    
        };
   
    const hanldeSave = (e => {  
        const likeBtn = e.target.closest(".selector")
            setIsDirty (true);
            const aria = {
                label: {
                    true: "Удалить",
                    false: "Сохранить"
                }
            }
            likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
            likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed]; 
            arrSaved.saved[likeBtn.dataset.id].like=`${likeBtn.ariaPressed}`;
            fixedSaveRecipes.saved = arrSaved.saved.filter(item => item.like === 'false'); 
            try {                
                 fetch(`/api/account/saved_recipes?email=${user}`, 
                 {    
                     method: "PUT",
                     body: JSON.stringify(fixedSaveRecipes), 
                 });   
            }  
            catch (err) {
                 return(err);
            }
        }      
    );

    const handleLogout = async (e) => {
        try {
            await auth.logout();
        } 
        catch (err) {
            return(err);  
        }              
    };

    const clickCookImg = (e) => {      
        //не удалять! обязательный параметр для cropper
        }  

 
  return (          
    <>
        <HeadMetaTags
            content="noindex" 
        /> 
            <div className='accountWrap'>              
                <div className='navTop'>
                    <div className='navTopContent'>
                        <div className='logoLink'>
                            <img src="/icons/logo.png" alt="logo Vseresepty.ru" loading="lazy"/>    
                            <Link href="/">всерецепты</Link>
                        </div>
                        <div className='searchTopNavAcc mr-t-10'>
                            <div className='searchTopNavInputAcc'>    
                                    <input type="search" placeholder="Поиск по названию" name="search_text" onChange={handleChangeSearch}/>
                                    <div className='searchAccountIcon' onClick = {handleClickSearch}>
                                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z" fill="rgba(0, 0, 0, 0.65)"/>
                                        </svg>
                                </div>  
                            </div> 
                        </div>                        
                        {((user===userEmail)&&(auth.authStatus===200)) &&                   
                        <div className='addRecipe'>
                            <span>
                                <Link href="/users/add_recipe">ДОБАВИТЬ РЕЦЕПТ</Link>
                            </span>
                        </div>}
                    </div>
                </div> 
                {(auth.authStatus!==200) && <div className='accountContent'><p>Для личного кабинета требуется <Link href='/auth/login'>регистрация</Link></p></div>}
                {((user===userEmail)&&(auth.authStatus===200)) && 
                <div className='accountContent'>
                    <div className='wrapAccountContent'>
                        <div className='navAccountWrap'>
                            <div className='navAccount'>
                                <div className='accNavHeader'>
                                    <div>
                                        <img src="/icons/icon_acc_user.png" alt="user Vseresepty.ru" loading="lazy"/>
                                    </div>
                                    <div className='headMenu'>
                                        Привет, {user}!
                                    </div>                                
                                </div>
                                <div className='navAccountItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn1")} name="btn1">Личная информация</button>
                                </div>
                                <div className='navAccountItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn2")} name="btn2">Настройка профиля</button>
                                </div>
                                <div className='navAccountItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn3")} name="btn3">Сменить пароль</button>
                                </div>
                                <div className='navAccountItem'>
                                    <button type="button" onClick={handleModalExit}>Выйти из ЛК</button>
                                </div>  

                             </div>
                                <div className='navRecipeItem'>
                                    <button type="button" onClick={()=>setCurrentPage("btn4")} name="btn4">Сохраненные рецепты</button>
                                </div>  
                                <Modal
                                    isVisible={modalExit}
                                    title="Выход из ЛК"
                                    content = <>Подтвердите действие.</>
                                    footer={<button className='buttonWhiteSm' onClick={handleLogout}>ОК</button>}
                                    onClose={() => setModalExit(false)}    
                                />                                                     
                        </div>
                        <div className='mainContent'>
                            {currentPage==="btn1" && 
                                <>
                                    <Modal
                                        isVisible={modal}
                                        title="Личная информация"
                                        content = <>{modalText}</>
                                        footer={<button className='buttonWhiteSm' onClick={handleModal}>ОК</button>}
                                        onClose={() => setModal(false)}    
                                    />  
                                    <div className='accountTopInfo'>
                                        <div className='profileTwoCol'>
                                            <h1>Личная информация </h1>
                                            {inputValueFirst&&inputValueLast &&
                                                <div className='saveButton'>
                                                    <button disabled={disabled} type="submit" onClick={handleClick}>СОХРАНИТЬ</button>  
                                                </div>
                                            }                                            
                                        </div>
                                        <p>Только вы можете видеть информацию на этой странице, она не будет отображаться для просмотра другими пользователями.  Для сохранения данных нажмите кнопку "Сохранить" в верхнем правом углу страницы.</p>
                                    </div>
                                    <div className='accountBaseInfo'>
                                        <h2>Основные данные</h2>
                                        <label htmlFor="email">Ваш email</label>
                                        <input type="email" disabled value={user} name="email" />
                                        <div className='baseInfoTwoCol'>
                                            <div>
                                                <label htmlFor="first_name">Имя<span className='stars'>★</span></label>
                                                <input type="text" placeholder={inputs.first_name} id="first_name" name="first_name" onChange={handleChange} />   
                                                {!errorName && <div className='error mr-t-10'>Заполните поле</div>}
                                            </div>
                                            <div>
                                                <label htmlFor="last_name">Фамилия<span className='stars'>★</span></label>
                                                <input type="text" placeholder={inputs.last_name} id="last_name" name="last_name" onChange={handleChange} />   
                                                {!errorLastName && <div className='error mr-t-10'>Заполните поле</div>}
                                            </div>
                                        </div>  
                                        <div className='mainInfo'>                                   
                                            <div className='baseInfoDate'> 
                                                <div><label>Дата рождения</label></div>  
                                                <div className='birthDate'>                                                       
                                                    <input type="date" value={birthDay} name="birth_date" onChange={handleChangeDate} />                                                                  
                                                </div>                                                 
                                            </div>
                                        </div>  
                                    </div>                                                                                                   
                                </>
                            }
                            {currentPage==="btn2" &&
                                <>
                                    <>
                                        <div className='accountTopInfo'>
                                            <div className='profileTwoCol'>
                                                <h1>Публичный профиль</h1>
                                                <div className='saveButton'>
                                                    <button type="submit" onClick={handleClickPublic}>СОХРАНИТЬ</button>  
                                                </div>
                                            </div>
                                            <p>Информация с этой страницы будет отображаться в вашем публичном профиле, который виден остальным пользователям. Для сохранения данных нажмите кнопку "Сохранить" в верхнем правом углу страницы.</p>
                                        </div>
                                        <div className='accountBaseInfo'>
                                            <h2>Обо мне</h2> 
                                            <div className='publicTwoCol'>                                        
                                                <div className="flex-item">                                            
                                                    <label htmlFor="public_name">Отображаемое имя</label>
                                                    <p className='pd-l-0'>Выберите имя, кторое будет отображаться в качестве автора вашего рецепта. Если имя не будет выбрано, будет отображаться случайное имя.</p>
                                                    <input type="text" placeholder={inputsPublic.public_name} name="public_name" onChange={handleChangePublic} />                                                 
                                                </div>                                                      
                                            </div>                                    
                                            <div className='profileTwoColImg'>
                                                <div className='profileImg'>                                   
                                                    <h3 className='pd-t-15 pd-b-10'>Загрузить аватар</h3>                                                 
                                                    <label htmlFor="file">
                                                        <div>                                                                                         
                                                                <div>
                                                                    {inputsPublic.public_img==="" &&
                                                                        <AddImage btnClass="buttonTransparentBorder mr-b-10 btnAddImg" imgClass="cook-arr edit-img" clickBtn={((e)=>clickCookImg(e))} btnCropId="btnCropCookImgAcc" pathToSave="https://storage.yandexcloud.net/vseresepty" defaultImage="/icons/icon_avatar_big.png" canvasId="canvasAvatarImage" imgId="avatarImage" /> 
                                                                    }
                                                                    {inputsPublic.public_img!=="" &&
                                                                        <AddImage btnClass="buttonTransparentBorder mr-b-10 btnAddImg" imgClass="cook-arr edit-img" clickBtn={((e)=>clickCookImg(e))} btnCropId="btnCropCookImgAcc" pathToSave="https://storage.yandexcloud.net/vseresepty" defaultImage={`https://storage.yandexcloud.net/vseresepty/${inputsPublic.public_img}`} canvasId="canvasAvatarImage" imgId="avatarImage" /> 
                                                                    }
                                                                </div>                                                                                                              
                                                        </div>                                  
                                                    </label>
                                                </div>
                                                <div className='socialProfile'>
                                                    <label htmlFor="site">Сайт</label>
                                                    <input type="text" placeholder={inputsPublic.site} name="site" onChange={handleChangePublic}/>

                                                    <label htmlFor="instagram">Instagram</label>
                                                    <input type="text" placeholder={inputsPublic.instagram} name="instagram" onChange={handleChangePublic}/>

                                                    <label htmlFor="twitter">Twitter</label>
                                                    <input type="text" placeholder={inputsPublic.twitter} name="twitter" onChange={handleChangePublic}/>

                                                    <label htmlFor="facebook">Facebook</label>
                                                    <input type="text" placeholder={inputsPublic.facebook} name="facebook" onChange={handleChangePublic}/>
                                                </div>
                                            </div>
                                        </div>  
                                        <Modal
                                            isVisible={modalPublic}
                                            title="Публичная информация"
                                            content = <>{modalTextPublic}</>
                                            footer={<button className='buttonWhiteSm' onClick={handleModalPublic}>ОК</button>}
                                            onClose={() => setModal(false)}    
                                        />                                                                                                  
                                    </>
                                </>
                            }
                            {currentPage==="btn3" &&
                                <>
                                    <>
                                        <div className='accountResetPassword'>
                                            <h1>Сменить пароль</h1>
                                            {statusReset!==200 &&
                                                <p>Если вы хотите изменить свой пароль, нажмите кнопку ниже, и мы отправим инструкции по смене пароля на адрес вашей электронной почты.</p>
                                            }
                                        </div>
                                        {(!errEmailSent) &&                                 
                                            <div className="pd-l-30">
                                                <div className='error'>Что то пошло не так, попробуйте снова</div>
                                            </div>
                                        }
                                        {/* {emailSent && 
                                            <p>На вашу почту отправлено письмо с инструкцией для смены пароля.</p>
                                        } */}
                                        {statusReset!==200 &&
                                            <div className='resetPasswButton'>
                                                <button onClick={resetPassword} type="submit">СМЕНИТЬ ПАРОЛЬ</button>
                                            </div>     
                                        }
                                        <Modal
                                            isVisible={modalPassword}
                                            title="Смена пароля"
                                            content = <><p>На вашу почту отправлено письмо с инструкцией по смене пароля.</p></>
                                            footer={<button className='buttonWhiteSm' onClick={handleModalPassword}>ОК</button>}
                                            onClose={() => setModalPassword(false)}    
                                        /> 
                                        </>
                                </>
                            }
                            {currentPage==="btn4" &&
                                <>                            
                                <>
                                    <div className='accountTopInfo pd-b-15'>
                                        <h1>Сохраненные рецепты</h1> 
                                    </div>  
                                    <div className='accountBaseInfo'>
                                        <div className='accountSaved'>                                        
                                            {savedRecipes?.saved?.map((item, index) => {
                                                return (   
                                                    <div key={`review${index}`}>                                                                                                    
                                                    <Link href={`${item.recipe}`}>{item.name}</Link>  
                                                        <div className='saveControl'>                                                        
                                                            <span onClick={hanldeSave}>
                                                                <button className="selector" aria-label="Сохранить" aria-pressed="false" data-id={index}>
                                                                    <svg width="30" height="30" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.8398 2.39496C13.013 -0.169205 10.2871 2.03882 9.27755 
                                                                            3.46336C8.26797 2.03882 5.54163 -0.169205 2.71481 2.39496C-0.112011 
                                                                            4.95912 1.87349 8.80536 3.2196 10.408C4.22918 11.6544 6.85456 14.361  
                                                                            9.27755 15.2158C11.7005 14.361 14.3254 11.6544 15.335 10.408C16.6811 
                                                                            8.80536 18.6666 4.95912 15.8398 2.39496Z" stroke="black" 
                                                                            strokeWidth="1" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </button>
                                                            </span> 
                                                            <img src={`/upload/recipe_main_img/${item.img}`} loading="lazy" alt={item.name}/>                                                                                           
                                                        </div>                                                 
                                                    </div>
                                                    )
                                                  }
                                                )} 
                                            </div>
                                        </div>                                                                                                                      
                                    </>
                                </>
                            }
                        </div>
                    </div>
                </div> } 
            </div>  
            <Footer />
        </>
   );
};
export default Account;

