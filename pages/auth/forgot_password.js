"use client";
import React, { useEffect, useState} from "react";
import KeyRandome from '../services/key_randome';
import Head from 'next/head';
import HeadMetaTags from '../components/head';



const ForgotPassword = () => { 
    const url = process.env.URL;
    const [email, setEmail] = useState();
    const [error, setError] = useState ({
        emailFormat: "",
        emptyEmail: "",
        wrongQuery: true,
        userExist: true
    });
    const [emailSent, setEmailSent] = useState(false);
    const [errEmailSent, setErrEmailSent] = useState(true);
    const [emailParam, setEmailParam] = useState({
        email: "",
        message: "",
        subject: "",
        html: ""
    });
    const [keyLink, setKeyLink] = useState (KeyRandome(26));

    const handleSubmit = async() => {    
        // проверка есть ли юзер в базе           
        fetch(`/api/auth/add_user?email=${email}`, {
            method: "GET",
            }).then((data) => {
            if (data.status===403)   // если юзер зареган
                { 
                    setError((prev) => ({ ...prev, userExist: true}));
                    setError((prev) => ({ ...prev, wrongQuery: true}));  
                    setError((prev) => ({ ...prev, emailFormat: true }));
                    //router.push(`/auth/register?email=${email}&key=${keyLink}`)      
                    
                    //добавляем key в таблицу users
                    const addKey = async() => {   
                        try {
                            const res = await fetch(`/api/auth/add_user?email=${email}&key=${keyLink}`,  
                            {
                                method: "PATCH",
                            });  
                            if (res.status===200)
                            {
                                // отправляем письмо с key на почту
                                try {
                                const res = await fetch(`/api/auth/register?email=${email}`, 
                                {
                                    method: "POST",
                                    body: JSON.stringify(emailParam),
                                });  
                                if (res.ok) {
                                    setEmailSent(true);
                                    setErrEmailSent(true);
                                };
                                }  
                                catch (err) {                                        
                                        setEmailSent(false);
                                        setErrEmailSent(false);
                                        return(err);
                                }                          
                            }
                        }  
                        catch (err) {
                            return(err);
                        }}
                    addKey();
                 }
            else {setError((prev) => ({ ...prev, userExist: false}));}



        }).catch((err) => {                                                
                setError((prev) => ({ ...prev, wrongQuery: false}));                
        });    
      };

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError((prev) => ({ ...prev, userExist: true}));
        setError((prev) => ({ ...prev, wrongQuery: true}));  
    };

    useEffect(() => 
    {       
      const reg =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      const user = email;
      if (reg.test(user) === false) {
          setError((prev) => ({ ...prev, emailFormat: false }));
      }
      else setError((prev) => ({ ...prev, emailFormat: true }));
      if (email === "") 
      {
          setError((prev) => ({ ...prev, emptyEmail: false }));
      }
      else setError((prev) => ({ ...prev, emptyEmail: true }));

    setEmailParam ({
        email: email,
        message: "",
        subject: "Смена пароля на сайте 'ВсеРецепты'",
        html: `<h3>Здравствуйте, ${email}!</h3><p>Для смены пароля на "ВсеРецепты" пройдите по <a href="${url}/auth/reset_password?email=${email}&key=${keyLink}">ссылке.</p>`,
    }); 
    }, [email])


  return (
    <> 
        <HeadMetaTags
            content="noindex" 
        /> 
        <div className="loginHeight">
            <div className='wrapLogin'>
                <div className='loginForm'>
                    <div className='loginHeader'>
                        <img src="/icons/logo-circle.png" loading="lazy" alt="vseresepty.ru cooking recipes forgot password" />
                        <h3>Вceрецепты</h3>
                    </div>
                    {!emailSent &&
                        <div>
                            <p>Введите в поле email который был указан при регистрации на сайте, вам будут высланы инструкции для смены пароля.</p>        
                            <form>
                                <div className='pd-t-10'>
                                    <div className='inputResetEmail'>                                    
                                        <input required type="text" placeholder="ваш email" name="code" onChange={handleChange} /> 
                                    </div>
                                </div>   
                            </form>  
                            <div className='loginError pd-b-15'>    
                                {!error.emailFormat && <div>Не верный формат.</div>}                            
                                {!error.wrongQuery && <div>Ошибка запроса.</div>} 
                                {!error.userExist && <div>Юзер с таким email не зарегистрирован.</div>} 
                                {!errEmailSent && <div>Ошибка отправки письма.</div>} 
                            </div> 
                            
                            {error.emailFormat &&
                            <div className='loginButton'>
                                <button type="submit" onClick={handleSubmit}>Отправить</button> 
                            </div>}
                        </div> }
                        {emailSent && <p>Письмо с инструкцией для восстановления пароля, отправлено на {email}.</p>}
                </div>
            </div>
        </div>
    </>
  );
}
export default ForgotPassword;