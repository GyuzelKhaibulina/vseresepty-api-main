"use client";
import React, { useEffect, useState} from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import KeyRandome from '../services/key_randome';
import Head from 'next/head';
import HeadMetaTags from '../components/head';

const CheckCode = () => {
    const router = useRouter();  
    const [keyLink, setKeyLink] = useState (KeyRandome(26)); // ключ который записывается во время записи юзера в базу
    const email = useSearchParams().get('email');
    const [inputs, setInputs] = useState({
        email: email,
        username: email,
        code: "",
        saved_recipes: '{"saved":[]}'
    });
    const [inputsAddUser, setInputsAddUser] = useState({
        userEmail: email,
        keyLink: keyLink,
        autor: `User ${KeyRandome(4)}`
    });
    const [error, setError] = useState ({
        code : true,
        user: true,
        userExist: false,
        badReq: false
    })
    useEffect (() =>
    {              
        inputs.email=email;    
        inputsAddUser.userEmail = email;  
    }, [email])
    useEffect (() =>
    {                          
        inputsAddUser.keyLink = keyLink;  
    }, [keyLink])
    const handleSubmit = async() => {    
        setError((prev) => ({ ...prev, badReq: false }));
        setError((prev) => ({ ...prev, userExist: false }))        
        // проверка ссылки на отсутствие юзера в базе users
        fetch(`/api/auth/add_user?email=${inputs.email}`, {
            method: "GET",
            }).then((data) => {
                if (data.status===200)   // если юзер не зареган
                {
                    setError((prev) => ({ ...prev, userExist: false }))
                    // проверка соответствия юзера и кода            
                    fetch(`/api/auth/temp_register`, {
                        method: "POST",
                        body: JSON.stringify(inputs),
                        }).then((data) => {
                        if (data.status===200)
                        {
                            setError((prev) => ({ ...prev, code: true }));                          
                            // запись в базу зареганных юзеров с кей линк
                            fetch(`/api/auth/add_user`, {
                                method: "POST",
                                body: JSON.stringify(inputsAddUser)
                            }).then (()=> {   // проверяем есть ли запись с новым юзером
                                fetch(`/api/auth/add_user?email=${inputs.email}`, {
                                    method: "GET",
                                    }).then((data) => {
                                    if (data.status===403)   // если юзер не зареган
                                        { 
                                            // переход по ссылке с кей линк
                                            router.push(`/auth/register?email=${inputs.email}&key=${inputsAddUser.keyLink}`)      
                                        }
                                    })
                                })
                            .catch((err) => {                                                         
                                setError((prev) => ({ ...prev, user: false }));
                                return (err);
                            });                  
                        }
                        else { 
                            if (data.status===403) setError((prev) => ({ ...prev, code: false }))
                            else (setError((prev) => ({ ...prev, badReq: true })))
                        }
                    }).catch((err) => {return(err);});  
                }
                if (data.status===403)  {  // если юзер зареган
                    setError((prev) => ({ ...prev, userExist: true }));
                }
            }).catch((err) => {return(err);                
        });          
     };
    const handleChange = (e) => {
        inputs.code = e.target.value;
    };

  return (
    <>     
    <HeadMetaTags
        content="noindex" 
    /> 
    <div className="loginHeight">
        <div className='wrapLogin'>
            <div className='loginForm'>
                <div className='loginHeader'>
                    <img src="/icons/logo-circle.png" loading="lazy" alt="vseresepty.ru logo" />
                    <h3>Вceрецепты</h3>
                </div>        
                <form>
                    <div className='pdT10'>
                        <div className='inputResetEmail'>
                            <input required type="text" placeholder="код из письма" name="code" onChange={handleChange} /> 
                        </div>
                    </div>   
                </form>       
                {!error.code && <div className='loginError'>Не верный код.</div>}    
                {error.badReq && <div className='loginError'>Ошибка запроса.</div>}  
                {error.userExist && <div className='loginError'>Юзер {email} уже зарегистрирован.</div>} 
                <div className='loginButton'>
                    <button type="submit" onClick={handleSubmit}>Отправить</button> 
                </div>
            </div>
        </div>
    </div></>
  );
}
export default CheckCode;