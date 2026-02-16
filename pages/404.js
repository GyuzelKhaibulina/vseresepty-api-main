"use client"
import BackButton from './components/button_back'
import Footer from './components/footer'
import HeadMetaTags from './components/head'
import Navbar from './components/navbar'

export default function Custom404() { 
    return (
    <>
        <HeadMetaTags
            content="noindex" 
        /> 
        <Navbar/>   
        <div className='width-100-percent text-center'>   
            <div className='pd-b-40'>
                <h1 className='pd-t-40 pd-b-20'>404 - Страница не найдена</h1>
                <BackButton/>  
            </div>
            <img src="/img/37.gif" />
        </div>
        <Footer/>
    </>    
    )
}

