"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import KeyRandome from '../services/key_randome';
import { useAuth } from '../context/context';
import Head from 'next/head';
import Loading from '../components/loading';
import HeadMetaTags from '../components/head';


const Login = () => {    
    const auth = useAuth();
    const router = useRouter();
    const url = process.env.URL;
    const [value, setValue] = useState('1');
    const [statusReset, setStatusReset] = useState(0);
    const [createCode, setCreateCode] = useState(false);
    const [err, setError] = useState(null);
    const [errorTempReg, setErrorTempReg] = useState("");
    const location = usePathname();
    const [keyLink, setKeyLink] = useState (KeyRandome(6));
    const [statusSent, setStatusSent] = useState(false);  
    const [loginSubmit, setLoginSubmit] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [errorReg, setErrorReg] = useState({
        emailFormat : true,
        emptyEmail : false,
        emptyPassword : false,
        userExist : true,
        userPassword : true
    });  
    const [errorMessageReg, setErrorMessageReg] = useState({
      emailFormat : true,
      emptyEmail : false,
      emptyPassword : false,
      userAlreadyExist : false,
      statusSending : true,
      badReq : true
  });
  
    const [email, setEmail] = useState({
      email: "",
      message: "",
      subject: "",
      html: "",
      code: ""
    });
  
    const [inputs, setInputs] = useState({
      username: "",
      password: "",
    });
  
    const [inputsTempReg, setInputsTempReg] = useState({
      username: "",
      email: "",
      code: keyLink,
    });

    useEffect (() =>    
    {   
        auth.authorization();   
        if (loginSubmit)
            {
                if (auth.status===401) {
                    setErrorReg((prev) => ({ ...prev, userExist: false }));
                    setIsLoading(false);
                }
                if (auth.status===200) {
                    setIsLoading(false);
                    router.push ("/");
                }
            }
    }, [loginSubmit]); 

  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    useEffect(() => 
    {       
          setErrorReg((prev) => ({ ...prev, emailFormat: true }));
          setErrorReg((prev) => ({ ...prev, emptyEmail: false }));
          setErrorReg((prev) => ({ ...prev,  emptyPassword: false }));  
          setErrorMessageReg((prev) => ({ ...prev, emailFormat: true }));
          setErrorMessageReg((prev) => ({ ...prev, emptyEmail: false }));
          setErrorMessageReg((prev) => ({ ...prev,  emptyPassword: false }));
    }, [location])
  
    useEffect(() => 
    {       
      const reg =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      const email = inputs.username;
      if (reg.test(email) === false) {
          setErrorReg((prev) => ({ ...prev, emailFormat: false }));
      }
      else setErrorReg((prev) => ({ ...prev, emailFormat: true }));
      if (inputs.username === "") 
      {
          setErrorReg((prev) => ({ ...prev, emptyEmail: true }));
      }
      else setErrorReg((prev) => ({ ...prev, emptyEmail: false }));
      if (inputs.password === "") 
      {
          setErrorReg((prev) => ({ ...prev, emptyPassword: true }));
      }
      else setErrorReg((prev) => ({ ...prev, emptyPassword: false }));
    }, [inputs])
  
    const handleChangeTempReg = (e) => {
      setInputsTempReg((prev) => ({ ...prev, username: e.target.value }));
      setInputsTempReg((prev) => ({ ...prev, email: e.target.value }));
    };
  
    useEffect(() => 
    {       
        setStatusSent(false);
        setErrorMessageReg((prev) => ({ ...prev, userAlreadyExist: false }));
        setErrorMessageReg((prev) => ({ ...prev,  statusSending: true }));
        const reg =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        const email = inputsTempReg.email;
        if (reg.test(email) === false) {
            setErrorMessageReg((prev) => ({ ...prev, emailFormat: false }));
        }
        else setErrorMessageReg((prev) => ({ ...prev, emailFormat: true }));
        if (inputsTempReg.email === "") 
        {
            setErrorMessageReg((prev) => ({ ...prev, emptyEmail: false }));
        }
        else setErrorMessageReg((prev) => ({ ...prev, emptyEmail: true }));
    }, [inputsTempReg])  

    const handleSubmit = async (e) => {
       e.preventDefault();
       setLoginSubmit (false);
       setIsLoading(true);
       setErrorReg((prev) => ({ ...prev, userExist: true }));
       if (inputs.username === "") 
       {
           setErrorReg((prev) => ({ ...prev, emptyEmail: true }));
           setIsLoading(false);
       }
       else setErrorReg((prev) => ({ ...prev, emptyEmail: false }));
       if (inputs.password === "") 
       {
           setErrorReg((prev) => ({ ...prev, emptyPassword: true }));
                   setIsLoading(false);
       }
       else setErrorReg((prev) => ({ ...prev, emptyPassword: false }));
  
       if (errorReg.emailFormat && !errorReg.emptyEmail && !errorReg.emptyPassword)
         {
             try {
                 await auth.login(inputs);
                 setIsLoading(false);
                 setLoginSubmit (true);          
             } catch (err) {
                setIsLoading(false);
                 return(err);  
             }                  
         }
     };



    useEffect(() => 
      { 
         if (auth.status===401)
         {
             setErrorReg((prev) => ({ ...prev, userExist: false }));
             setIsLoading(false);
             setLoginSubmit (false);
         }
         else setErrorReg((prev) => ({ ...prev, userExist: true }));
         if (auth.status===403)
         {
             setErrorReg((prev) => ({ ...prev, userPassword: false }));             
         }
         else setErrorReg((prev) => ({ ...prev, userPassword: true }));
     },[auth.status])
  
    useEffect(() => 
    {       
            setEmail ({
                email: inputsTempReg.email,
                message: "",
                subject: "Регистрация на сайте 'ВсеРецепты'",
                html: `<h3>Здравствуйте, ${inputsTempReg.username}!</h3><p>Для регистрации на сайте "ВсеРецепты" пройдите по <a href="${url}/auth/check_code?email=${inputsTempReg.email}">ссылке. </a>Ваш код ${keyLink}</p>`,
                code: keyLink
            });
    }, [inputsTempReg])
 
    const handleChangeTab = (event, newValue) => {
      setValue(newValue);
    };  
  
    useEffect (() =>
    {    
      if (statusReset===200) {
        
          const  fetch = async() =>
          {
              try {
                  await axios.post(`/api/login/register`, (email));              
          }  
          catch (err) {
              return err;
          } }
  
          fetch ();
      }
    }, [email])
  
    const handleSubmitTempReg = async (e) => {  // временная регистрация
          e.preventDefault();
          setErrorMessageReg((prev) => ({ ...prev,badReq: true })); 
          if (errorMessageReg.emailFormat  &&  errorMessageReg.emptyEmail)
              { 
                // проверка есть ли такой email среди постоянных зареганных юзеров
                const res = await fetch(`/api/auth/register?email=${email.email}`, {  
                    method: "GET",  
                }).then((response) => {
                        return response.json();                                                           
                })
                .then((data) => {
                    if (data.status===200)
                    {
                         setErrorMessageReg((prev) => ({ ...prev,  userAlreadyExist: false }));
                         setStatusSent(true);
                         fetch(`/api/auth/register`, {   // отправка письма для временной регистрации
                             method: "POST",
                             body: JSON.stringify(email),
                             }).then((data) => {
                                 if (data.status===200) {
                                    setErrorMessageReg((prev) => ({ ...prev,  statusSending: true }));
                                    // добавляем юзера во временно зареганных
                                    fetch(`/api/auth/temp_register`, {
                                        method: "PUT",
                                        body: JSON.stringify(inputsTempReg),
                                     }).then((data) => {
                                     }).catch((err) => {                                
                                             return(err);
                                     });        
                                 }
                             })
                             .catch((err) => {   
                                setErrorMessageReg((prev) => ({ ...prev,  statusSending: false }));                             
                                 return(err);
                         });                   
                    }
                    else {
                        if (data.status===401) 
                        { 
                            setErrorMessageReg((prev) => ({ ...prev, userAlreadyExist: true })); }
                        else {
                            setErrorMessageReg((prev) => ({ ...prev, badReq: true })); 
                        }
                    }
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
                    <img src="/icons/logo-circle.png" loading="lazy" alt="vseresepty.ru logo" />
                    <h3>Вceрецепты</h3>
                </div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="">
                            <Tab label="Вход" value="1" />
                            <Tab label="Регистрация" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">                
                        <form>
                            <div className="inputUser">
                                <input required type="text" placeholder="email" name="username" onChange={handleChange} /> 
                            </div> 
                            <div className='height-loading-50'> 
                                {!errorReg.emailFormat && <div className="loginError">Не верный формат</div>}
                                {errorReg.emptyEmail && <div className="loginError">Поле не должно быть пустым</div>}  
                            </div>
                            <div className='pdT10'></div>
                            <div className="inputPassw">
                                <input required type="password" placeholder="пароль" name="password" onChange={handleChange} />
                            </div>
                            <div className='height-loading-20'> 
                                {errorReg.emptyPassword && <div className="loginError">Поле не должно быть пустым</div>}
                                {err && <div className="loginError">{err}</div>}                           
                            </div>
                            <div className="forgetPassw"><Link href="/auth/forgot_password">Забыли пароль?</Link></div>                           
                        </form>  
                        <div className='height-loading-20'> 
                            {!errorReg.userExist && <div className="loginError">Юзер не найден.</div>}    
                            {!errorReg.userPassword && <div className="loginError">Не верный пароль.</div>}                                                          
                            {isLoading && <div className='text-center'><Loading size="s"/></div>}
                        </div>  
                        <div className="loginButton">
                            <button onClick={handleSubmit}>Вход </button>                            
                        </div>
                    </TabPanel>
                    <TabPanel value="2">     
                        {(!createCode || errorTempReg!=="") && 
                            <form>                  
                                <div className="pdT20"></div>  
                                <div className="inputMail">
                                    <input required type="email" placeholder="email" name="email" onChange={handleChangeTempReg} />
                                </div>
                                <div className="pdT10"></div> 
                                <div className='pdB20'>
                                    {errorTempReg &&  <div className="loginError">{errorTempReg}</div>}
                                    {!errorMessageReg.emailFormat  &&  <div className="loginError">Не верный формат</div>}
                                    {!errorMessageReg.emptyEmail  &&  <div className="loginError">Поле не должно быть пустым</div>} 
                                    {errorMessageReg.userAlreadyExist  &&  <div className="loginError">Пользователь с таким email уже зарегистрирован</div>} 
                                    {!errorMessageReg.statusSending &&  <div className="loginError">Ошибка отправки. Проверьте правильность указанного email.</div>}
                                    {!errorMessageReg.badReq  &&  <div className="loginError">Ошибка запроса</div>} 
                                    {statusSent &&  <div className="loginError">Письмо с инструкцией отправлено на указанную почту.</div>}
                                    
                                </div>
                                {!errorTempReg&&errorMessageReg.emailFormat&&errorMessageReg.emptyEmail&&!statusSent &&
                                    <div className="loginButton">
                                        <button onClick={handleSubmitTempReg}>Выслать письмо с кодом </button>
                                    </div>                           
                                }
                            </form>}                        
                    </TabPanel>
                </TabContext>
            </div>
        </div>
        </div>
    </>
  )
}

export default Login