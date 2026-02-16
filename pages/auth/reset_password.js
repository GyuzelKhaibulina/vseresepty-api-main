"use client";
import React, { useState, useContext, useEffect} from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import HeadMetaTags from '../components/head';


const ResetPassword = () => {
    const router = useRouter();
    const email = useSearchParams().get('email');
    const key = useSearchParams().get('key');  
    const [user, setUser] = useState(false);
    const [errorKey, setErrorKey] = useState(true);
  
    const [inputs, setInputs] = useState({
            email: email,
            password: "",
            passwordRepeat: "",
    }); 


 
    const [error, setError] = useState({
             coincidence: true,
             language: true, //английская раскладка
             spaces: true,  // пробелы
             short: true,   // короткий пароль
             specialСhar: true,  // спец символы
             number: true,  // цифра
             userEmail: true  // совпадение с почтой юзера
         }
    ); 

    useEffect(() => {
        if (email!==null&&key!==null) {  
            inputs.email=email;
            inputs.key=key;  
            // проверка на совпадение ключа из ссылки и ключа из базы
            fetch(`/api/auth/temp_register?email=${email}&key=${key}`, {
                method: "GET",
            }).then((data) => {            
                if (data.status===200){ setErrorKey(true); }            
                else { setErrorKey(false); }
            }).catch((err) => {                                
                {
                    setErrorKey(false);
                    return(err);
                }
            });  
        }      
    }, [email, key] ); 

    useEffect (() => {
         if (inputs.password===inputs.passwordRepeat)
         {
             setError((prev) => ({ ...prev, coincidence: false}));
         }
         else {
             setError((prev) => ({...prev, coincidence: true}));
         }
         if (inputs.password.length>5)
         {
             setError((prev) => ({...prev, short: false}));
         }
         else 
         {
             setError((prev) => ({...prev, short: true}));
         }
         if ( /\s/.test(inputs.password)) {
             setError((prev) => ({...prev, spaces: true}));
         }
         else {
             setError((prev) => ({...prev, spaces: false}));
         }
         if (/[^A-Za-z0-9]/.test(inputs.password)) {
             setError((prev) => ({...prev, specialСhar: false}));
         }
         else {
             setError((prev) => ({...prev, specialСhar: true}));
         }
         if (/\d/.test(inputs.password)) {
             setError((prev) => ({...prev, number: false}));
         }
         else {
             setError((prev) => ({...prev, number: true}));
         }
         if (/[A-Za-z]/.test(inputs.password)) {
             setError((prev) => ({...prev, language: false}));
         }
         else {
             setError((prev) => ({...prev, language: true}));
         }           
    }, [inputs])
 
    
    const handleChange = (e) => {
         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async() => {                
        if (!error.coincidence && !error.short && !error.spaces && !error.specialСhar && !error.number && !error.language)
             {
                // удаляется key_link у юзера
                fetch(`/api/auth/temp_register?email=${email}&key=${key}`, {
                    method: "PATCH",
                }).then((data) => {       
                    if (data.status===200)
                        {      
                            // меняем временный пароль на пароль юзера
                            fetch(`/api/auth/register`, {
                                method: "PATCH",
                                body: JSON.stringify(inputs),
                            }) 
                            .then((data) => {
                                if (data.status===200) {
                                    // переход по ссылке на форму логина
                                    setUser(false)
                                    router.push("/auth/login"); 
                                    }
                                else {setUser(true)}
                            })                        
                        }                    
                    else { setErrorKey(false);}
                }).catch((err) => {                                
                        return(err);                
                });      
             } 
       };

  return (
    <>   
    <HeadMetaTags
        content="noindex" 
    />     
    <div className="loginHeight">
        <div className="wrapLogin">
            <div className="loginForm">
                <div className="loginHeader">
                    <img src="/icons/logo-circle.png" loading="lazy" alt="vseresepty.ru register" />
                    <h3>Вceрецепты</h3>
                </div>
                {errorKey && <> 
                    <h4>Придумайте пароль минимум 6 символов: </h4>             
                        <form>
                            
                                <div className="inputResetEmail">
                                    <label htmlFor='email'>
                                        <input disabled type="email" name="email" value={email} onChange={handleChange} /> 
                                    </label>
                                </div>   
                                <div className="inputResetPassw">
                                    <label htmlFor='password'>
                                        <input required type="password" placeholder="Введите новый  пароль" name="password" onChange={handleChange} /> 
                                    </label>
                                </div>                       
                                <div className="pdT10"></div>
                                <div className="inputResetPassw">
                                    <label htmlFor='passwordRepeat'>
                                        <input required type="password" placeholder="Повторите пароль" name="passwordRepeat" onChange={handleChange} />
                                    </label>
                                </div>
                            
                            <div className='pd-b-20'>
                                {error.coincidence && <div className="loginError">Пароли не совпадают</div>}    
                                {error.short && <div className="loginError">Пароль должен быть не менее 6 символов</div>}    
                                {error.spaces && <div className="loginError">Пароль не должен содержать пробелы</div>}           
                                {error.specialСhar && <div className="loginError">Пароль должен содержать спецсимвол</div>}  
                                {error.number && <div className="loginError">Пароль должен содержать цифру</div>} 
                                {error.language && <div className="loginError">Используйте английскую раскладку</div>} 
                                {user && <div className="loginError">Юзер не найден</div>}
                            </div>
                        </form> 
                        {(errorKey&&!error.coincidence&&!error.short&&!error.spaces&&!error.specialСhar&&!error.number&&!error.language) &&
                        <div className="loginButton">
                            <button type="submit" onClick={handleSubmit}>Сохранить</button> 
                        </div>                  
                        }                      
                     </>}
                    {!errorKey && <div className="text-center pd-t-30 pd-b-30">Ссылка недействительна.</div>} 
            </div>
        </div>
    </div></>
  );
}
export default ResetPassword;