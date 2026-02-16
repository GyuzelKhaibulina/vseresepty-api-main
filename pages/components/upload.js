
import React, { useEffect, useState, useRef } from "react";
import Loading from './loading';
import Modal from './modal';
import { useAuth } from '../context/context';

const Upload = ({folder}) => {
    const auth = useAuth();
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadError, setLoadError] = React.useState({
        imageFormat : true,
        imageEmpty : true,
        loaded : true,
        size : true,
    });  
    const inputFileRef = useRef(null);
    const [avatarPublic, setutAvatarPublic] = useState({
        email: "",
        public_img: "",

    });
    useEffect (() =>    
    {   
        auth.authorization();    
        auth.auth;         
    }, [auth]); 
    
    const userEmail = auth.currentUser;    

    const handleOnClick = async (e) => {
        e.preventDefault();
        setLoadError((prev) => ({ ...prev, imageEmpty: true }));
        setLoadError((prev) => ({ ...prev, imageFormat: true }));
        setLoadError((prev) => ({ ...prev, loaded: true }));
        if (!inputFileRef.current?.files?.length) {
            setLoadError((prev) => ({ ...prev, imageEmpty: false }));
            return;
        }
        setIsLoading(true);
        const formData = new FormData();        
        Object.values(inputFileRef.current.files).forEach(file => {
            formData.append('file', file);
        });		
		document.getElementById('files').addEventListener('change', function() {
            const fileImg = this.files[0];
            if (fileImg && !fileImg.type.match('image.*')) {
                setLoadError((prev) => ({ ...prev, imageFormat: false }));
              this.value = ''
            }
        });       

        async function loading() {
            await fetch(`/api/upload?folder=${folder}`, {
                method: 'POST',
                body: formData
            }) 
            .then (response => {
                setLoadError((prev) => ({ ...prev, loaded: true }));  
                setLoadError((prev) => ({ ...prev, size: true }));                
                if (response.status===200)
                {
                    setModal(true);               
                }
                if (response.status===413)
                {
                    setLoadError((prev) => ({ ...prev, size: false }));              
                }
                if (folder==="avatar") 
                {
                    response.json().then((data) => {
                        try {
                            avatarPublic.email = userEmail;
                            avatarPublic.public_img = data[0];
                            fetch(`/api/account/user?email=${userEmail}&avatar=avatar`, 
                            {    
                                method: "PUT",
                                body: JSON.stringify(avatarPublic), 
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
                    })             
                }
            })            
            .catch((err) => {
                setLoadError((prev) => ({ ...prev, loaded: false }));             
                return (err);
            });
            }
            loading();   
            setIsLoading(false);
    };

    const onClick = () => {
        setModal(false);
    }

    return (
        <>
            <form className='uploadImage'>
                <input type="file" name="file" id="files" ref={inputFileRef} accept="image/png, image/jpeg" multiple/>
                {!loadError.imageFormat && <div className="error">Не верный формат. Допускаются только файлы формата изображение.</div>}
                {!loadError.imageEmpty && <div className="error">Изображение не выбрано.</div>}
                {!loadError.loaded && <div className="error">Ошибка загрузки, попробуйте еще раз.</div>}
                {!loadError.size && <div className="error">Выберите изображение меньшего размера.</div>}
                <button type="submit" disabled={isLoading} onClick={handleOnClick}>Загрузить</button>
                {isLoading && <Loading size="s"/>}
            </form>
            <Modal isVisible={modal}
                title={"Соообщение"}
                content={<div><p>Файл успешно загружен.</p></div>}                    
                footer={<button className='buttonWhiteSm' onClick={onClick}>ОК</button>}
                onClose={() => setModal(false)}                      
            /> 
        </>
    )
}

export default Upload