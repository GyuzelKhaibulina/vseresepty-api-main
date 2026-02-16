"use client"
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar';
import { useSearchParams } from 'next/navigation';
import Footer from '../../components/footer';
import { useAuth } from '../../context/context';
import Modal from '../../components/modal';
import CommunityRules from '../../components/community_rules';
import HeadMetaTags from '../../components/head';



const Article = () => {   
    const [errorRequest, setErrorRequest ] = useState(false);
    const [note, setNote] = useState ("");   
    const [modal, setModal] = useState();   
    const [secondModal, setSecondModal] = useState(); 
    const [user, setUser] = useState ();
    const [auth, setAuth] = useState ();
    const articleId = useSearchParams().get('id');
    const [article, setArticle] = useState ([]);
    const [text, setText] = useState ({});
    const [links, setLinks] = useState ([]);
    const [likes, setLikes] = useState ();
    const [dislikes, setDislikes] = useState ();
    const [likesCheck, setLikesCheck] = useState ();
    const [dislikesCheck, setDislikesCheck] = useState ();
    const [comments, setComments] = useState ({"comments": []}); ;
    const [autor, setAutor] = useState ();
    const authCheck = useAuth();
    const intervalRef = useRef();

    // useEffect(() => {
    //     intervalRef.current = setInterval(() => {      
    //     const metaDescription = document.querySelector('meta[name="description"]');
    //     const metaKeywords = document.querySelector('meta[name="keywords"]');
    //     const metaOgTitle = document.querySelector('meta[property="og:title"]');
    //     const metaOgDescription = document.querySelector('meta[property="og:description"]');
    //     const metaOgImage = document.querySelector('meta[property="og:image"]');
    //     const metaTwitterTitle = document.querySelector('meta[property="twitter:title"]');
    //     const metaTwitterImage = document.querySelector('meta[property="twitter:image"]');
    //     const metaTwitterDescription = document.querySelector('meta[property="twitter:description"]');
    //     const title=`статьи ${article[0]?.name} и приготовление вкусных блюд`;
    //     const description=`статьи ${article[0]?.name} рецепт приготовления вкусных блюд с пошаговым фото кулинария recipe cooking`;
    //     const keywords=`статьи ${article[0]?.name} рецепт приготовления вкусных блюд с пошаговым фото кулинария recipe cooking`;
    //     const metaTitle = document.querySelector('title');
    //     metaTitle.textContent= title;
    //     metaDescription.setAttribute('content', description);
    //     metaKeywords.setAttribute('content', keywords);
    //     metaOgTitle.setAttribute('content', title);
    //     metaOgDescription.setAttribute('content', description);
    //     metaTwitterTitle.setAttribute('content', title);
    //     metaTwitterDescription.setAttribute('content', description);        
    //     metaOgImage.setAttribute('content', `https://storage.yandexcloud.net/vseresepty/${article[0]?.img_main}`);  
    //     metaTwitterImage.setAttribute('content', `https://storage.yandexcloud.net/vseresepty/${article[0]?.img_main}`);  
    //     }, 200);
    //     return () => clearInterval(intervalRef.current);
    // }, [article[0]]);

    useEffect (() =>    
    {   
        authCheck.authorization();   
        setUser (authCheck.currentUser);
        setAuth (authCheck.auth);
        authCheck.auth; 
    }, [authCheck]); 

    useEffect (() =>    
    {   
        async function getArticle() {
            const res = await fetch(`/api/articles/article?id=${articleId}`, {
                    method: "GET",
                }) 
                return res.json().then((data) => {                     
                    setArticle(data);  
                    setLikes(data[0].likes);
                    setDislikes(data[0].dislikes);
                    setLikesCheck(data[0].likes);
                    setDislikesCheck(data[0].dislikes);
                    setText(JSON.parse(data[0].text)); 
                    const linksArr = JSON.parse(data[0].links);
                    setComments(JSON.parse(data[0].comments));
                    linksArr.map((v, i, arr) => {
                        let str = v.replace(/\*/g, '"');            
                        let obj = JSON.parse([str]);
                        links[i] = obj;
                    })   
                }).catch((err) => {
                    return(err);
                });            
            }
        getArticle();                
}, [articleId]); 

const handleCommunityRules = (() => 
{
    setModal(true);  
});

useEffect (() =>    
{   
    setAutor (false);
    if (comments&&auth===true) { 
        comments.comments.map ((x, i, arr) =>
        {
            if (x.useremail===user) {
                setAutor (true);
            }            
        })    }

}, [auth, comments]); 

const sendUserComment = async  () => { 
    let commentsAll =  comments;  
    let commentUser = "";
    let today = new Date().toISOString().slice(0, 10);
    if (authCheck.auth===true) {
        commentUser = {"comment": note, "useremail": article[0].useremail, "username": article[0].username, "data": today};           
        commentsAll.comments.push (commentUser);
        setComments (commentsAll);
    }
    const comment = {
        id: article[0].id,
        likes: likesCheck, 
        dislikes: dislikesCheck, 
        comments: JSON.stringify(commentsAll),
    }
    async function addComment() {
        const res = await fetch (`/api/account/add_article_comment` , 
        {
            method: "POST",
            body: JSON.stringify(comment)                    
        })
        .catch((err) => {
            setErrorRequest (true);
            return(err);
        }); 
        if (res.status===200) {
            setErrorRequest (false);
            setSecondModal (true)
        }
        else setErrorRequest (true);
    }
    addComment(); 
}

const likeClick = () => {
    let l=likes+1;
    setLikesCheck(l);
    let d=dislikes-1;
    if (d<0) {
        d=0;
    }
    setDislikesCheck(d);
}

const dislikeClick = () => {
    let d=dislikes+1;
    setDislikesCheck(d);
    let l=likes-1;
    if (l<0) {
        l=0;
    }
    setLikesCheck(l); 
}


  return (
    <>
    {article&&article.length>0 &&
        <HeadMetaTags
            title={`статья ${article[0].name}`}
            description={`статья ${article[0].name} кулинария рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`} 
            keywords={`статья ${article[0].name} кулинария рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`} 
            content="all" 
            ogTitle={`статья ${article[0].name}`}
            ogDescription={`статья ${article[0].name} кулинария рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`} 
            ogImage="/public/img/openGrafPreview_1.jpg"
            twitterTitle={`статья ${article[0].name}`}
            twitterDescription={`статья ${article[0].name} кулинария рецепты блюд пошаговые рецепты готовить вкусную еду кухни мира кулинария готовка блюд cooking recipes kitchen preparing dish`} 
            twitterImage="/public/img/openGrafPreview_1.jpg"
        /> }
        <Navbar/>  
        <Modal
            isVisible={modal}
            title="Правила сообщества"
            content={<CommunityRules />}
            onClose={() => setModal(false)}    
        />      
        <Modal
            isVisible={secondModal}
            title={"Соообщение"}
            content={<div><p>Спасибо за отзыв!</p></div>}                    
            onClose={() => setSecondModal(false)}    
        />      
        <div className='article_page pd-t-40'>      
            <div className='article_page_wrap'>   
                {article&&article.length>0 && 
                    <div className='article_main_img'>
                        <h1>{article[0].name}</h1>
                        <img src={`https://storage.yandexcloud.net/vseresepty/${article[0].img_main}`}/>                    
                    </div>
                }              
                {text&&text.length>0&&text.map((v, i, arr) => {
                    let str = v.replace(/\*/g, '"');
                    let obj = JSON.parse('{"obj":[' + str + ']}');
                    return (
                        <div key={`article`+i}>                            
                            {obj.obj[0]?.type==='раздел' &&
                                <h3 className='clear-both'>{`${obj.obj[0].value}`}</h3>
                            }
                            {obj.obj[0]?.type==='параграф' &&
                                <p>{`${obj.obj[0].value}`}</p>                                          
                            }
                            {obj.obj[0]?.type==='список' &&
                                <li>{`${obj.obj[0].value}`}</li>                                          
                            }
                            {obj.obj[0]?.type==='рисунок' &&
                                <span className='clear-both display-block pd-t-20'>
                                    <img src={`https://storage.yandexcloud.net/vseresepty/${obj.obj[0].value}`} alt=""/>                                          
                                </span>
                            }
                        </div>                                    
                    )})                
                }    
                </div>                                              
                <div className='links_sm clear-both'> 
                    {links&&links.length>0&&links.map((v, i, arr) => {
                        return (
                            <div key={`link`+i}>                                                  
                                    <a href={v.link} className='clear-both'>{v.name}</a>                           
                            </div>                                    
                        )})                
                    }                                 
                
                {links&&links.length>0 && <div className='pd-b-10'></div>}            
                </div>


            <div>   
                <div className='reviewWrapUser'>  
                    <div className='flex-block pd-b-40'>
                        <h2>Комментарии</h2> 
                    </div>                   
                    {auth===true&&comments&&comments.comments.length===0&& <div className='pd-t-20 pd-b-20'>
                        Комментарии отсутсвуют. Будьте первым кто напишет комментарий.
                    </div>}
                    {auth!==true&&comments&&comments.comments.length===0&& <div className='pd-t-20'>
                        Комментарии отсутсвуют. Чтобы оставить комментарий, требуется <a className="linkGray" href="/auth/login" alt="">авторизация</a>.
                    </div>}
                    {auth===true&&
                <div>                                                                      
                    <div className='reviewWrapArticle'> 
                                                                         
                        <p className='f-s-12'>Ознакомьтесь с нашими <span onClick={handleCommunityRules} className='linkGray'>Правилами сообщества</span> об отзывах.</p>
                        <div className='pd-t-20 display-flex'>                                                                                            
                            <span className='pd-r-5 text-orange'>{likesCheck}</span><img className='like-img' onClick={likeClick} src='/icons/icon_like.png' />
                            <span className='pd-l-10 pd-r-5'>{dislikesCheck}</span><img className='dislike-img' onClick={dislikeClick} src='/icons/icon_dislike.png' />
                        </div>    
                        <textarea type="text" name="title" placeholder="Ваш комментарий к статье" onChange={((e)=>setNote(e.target.value))}  />                                                
                        <div className='text-right' >
                            <button className='buttonOrange' type="submit" onClick={sendUserComment}>Сохранить</button>                                                                                                     
                        </div>
                    </div>                                                            
                </div>                                                   
            } 
                    {comments&&comments.comments.length>0&&comments.comments.map((v, i, arr) => {
                    return (
                        <div className='commentItem pd-t-30' key={`comment+${i}`}>                                                                                                        
                            <h4>{v.username}</h4>
                            <p className='data-light-gray'>{v.data}</p>
                            <p>{v.comment}</p>
                        </div>                                    
                    )})                
                }                                                                                                            
                </div> 
            </div> 

        </div>   
        <div className='clear-both pd-t-80'>                   
            <Footer/>
        </div>         
    </>
  )
}

export default Article