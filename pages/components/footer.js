
"use client"
import Link from 'next/link';
import Image from 'next/image';
import Modal from './modal';
import { useEffect, useState } from 'react';
import EmptyText from '../services/empty-text';

const Footer = () => {
    const [modal, setModal] = useState(false);
    const [inputs, setInputs] = useState({
        user_email: "",
        user_name: "",
        message: "",
        subject: "Вопрос админу Vseresepty",
        email: "olawitcher@gmail.com",
        html: ""
    });
    const [messageErrors, setMessageErrors] = useState({
        nameError: "Введите ваше имя",
        emailError: "Введите email",
        messageError: "Введите сообщение",
        emailFormat: "Неверный формат",
    }); 
    const [emailErrorFormat, setEmailErrorFormat] = useState (false);
    const [nameError, setNameError] = useState (false);
    const [textError, setTextError] = useState (false);
    const [adminMessageStatus, setAdminMessageStatus] = useState (false);
    const [adminMessageButton, setAdminMessageButton] = useState (false);

    const handleClick = async () => {     
        setModal (true); 
        setAdminMessageStatus(false);
        setAdminMessageButton(false);
        setEmailErrorFormat(false);
        setNameError(false);
        setTextError(false)
      };

      const sendEmail = async (e) => {
        e.preventDefault();  
        setAdminMessageStatus(false);    
        async function sendingEmail() {
            const res = await fetch(`/api/services/send_email`, {
                method: "POST",
                body: JSON.stringify(inputs),
            }) 
            .then (response => {
                if (response.status===200) {
                    setAdminMessageStatus(true);
                    setAdminMessageButton(false);
                    setTimeout(() => {                 
                        setModal(false);                    
                    }, "2000");
                    }
            } 
            )                
            .catch((err) => {
                return (err);
            });
            }
            sendingEmail();           
    };

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setAdminMessageButton(true);
        if (inputs.user_name.length>0) {  
            inputs.user_name=EmptyText (inputs.user_name);
        }      
        if (inputs.user_name==="") {
            setNameError(false);
        } 
        else setNameError(true); 
    };

    const handleChangeText = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setAdminMessageButton(true);
        if (inputs.message.length>0) {            
            inputs.message=EmptyText (inputs.message);
        }          
        if (inputs.message==="") {
            setTextError(false);
        } 
        else setTextError(true); 
    };

    useEffect(() => {   
        inputs.html =`<p>${inputs.message}</p>Письмо от ${inputs.user_email}<p>`
  }, [inputs]) 


  const handleChangeEmail = (e) => {
    let email=e.target.value;
    setAdminMessageButton(true);
    let reg=/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test(email);
    if(reg===false)
    {
        setEmailErrorFormat(false);
    }
    if (reg===true)
    {
        setEmailErrorFormat(true);
    }
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

  return (
    <div>
        <div className="footerMain">
            <div className="footerWrapper">
                <div className="leftFooter">
                    <Image src="/icons/logo.png" width={71} height={76} priority alt="Logo Vseresepty.ru cooking recipes" />    
                    <Link href="/">всерецепты</Link>                                            
                </div>
                <div className="centerFooter">
                    <Link href="/recipes/sort?type=kitchen"><span>ТИП КУХНИ</span></Link>
                    <Link href="/recipes/sort?type=main"><span>ОСНОВНЫЕ</span></Link>
                    <Link href="/recipes/sort?type=soup"><span>СУПЫ</span></Link>
                    <Link href="/recipes/sort?type=second"><span>ВТОРЫЕ БЛЮДА</span></Link>
                    <Link href="/recipes/sort?type=salad"><span>САЛАТЫ</span></Link>
                    <Link href="/recipes/sort?type=pelmeni"><span>ПЕЛЬМЕНИ И МАНТЫ</span></Link>
                    <Link href="/recipes/sort?type=snacks"><span>ЗАКУСКИ</span></Link>
                    <Link href="/recipes/sort?type=dough"><span>ТЕСТО И ДЕСЕРТ</span></Link>
                    <Link href="/recipes/sort?type=drink"><span>НАПИТКИ</span></Link>
                    <Link href="/recipes/sort?type=multi"><span>МУЛЬТИВАРКА</span></Link>
                </div>
                <div className="rightFooter">
                    <Link href="/"><span>Все рецепты</span></Link>
                    {/* <Link href="/users/add_recipe"><span>Добавить рецепт</span></Link> */}
                    <button type='button' onClick={handleClick}><span>Обратная связь</span></button>
                </div> 
                <Modal
                    isVisible={modal}
                    title="Ваше сообщение"
                    content={  
                        <>                
                        <form id='formParam' onSubmit={sendEmail}>  
                            {(adminMessageStatus===false) && 
                                <>                        
                                    <div className='formParam'>
                                        <label>Имя</label>
                                        <input type="text" id="user_name" name="user_name" onChange={handleChange} />
                                        {((inputs.user_name.length===0)||(!nameError)) && <div className='error'>{messageErrors.nameError}</div>}
                                    </div>                            
                                    <div className='pd-t-10'>
                                        <div className='formParam'>
                                            <label>Email</label>                            
                                            <input type="email" id="user_email" name="user_email" onChange={handleChangeEmail} />
                                            {inputs.user_email.length===0 && <span>{messageErrors.emailError}</span>}
                                            {!emailErrorFormat && <div className='error'>{messageErrors.emailFormat}</div>}
                                        </div>
                                    </div>
                                    <div className='pd-t-10 formParam'>
                                        <label>Сообщение</label>                        
                                        <textarea id="message" name="message" onChange={handleChangeText} />
                                        {((inputs.message.length===0)||(!textError)) && <div className='error'>{messageErrors.messageError}</div>}
                                        
                                        {(adminMessageStatus===true) && <div className='error'>Ваше письмо не отправлено, попробуйте еще раз.</div>}
                                    </div>
                                </>}                           
                        </form>
                        {(adminMessageStatus===true) && <div><p>Ваше письмо отправлено.</p></div>}    
                        </> 
                     
                    }                    
                    footer={(nameError&&textError&&emailErrorFormat&&adminMessageButton===true) && <button className='buttonWhiteSm' onClick={sendEmail}>ОК</button>}
                    onClose={() => setModal(false)}                      
                />             
            </div>
        </div>
     </div>
  )
}

export default Footer