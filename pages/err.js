"use client"
import BackButton from './components/button_back'
import ReloadButton from './components/button_reload'
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
            <div className='pd-b-20'>  
                <h1 className='pd-t-40 pd-b-20'>Ошибка, что-от пошло не так!</h1>
                <BackButton className="mr-r-10"/> 
                <span className='mr-r-20' />
                <ReloadButton/> 
                    
            </div>
            <img src="/img/38.gif" />
        </div>
        <Footer/>
    </>    
    )
}

