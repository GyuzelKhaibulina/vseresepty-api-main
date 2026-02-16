"use client"
import { createContext } from 'react';
import Layout from './components/layout';
import AuthProvider from './context/context';
import AllRecipesProvider from './context/all_recipes_array';
import styles from '../styles/globals.css';
import "@uploadthing/react/styles.css";
import '../styles/styles-auth.css';
import '../styles/styles-navbar.css';
import '../styles/styles-recipes.css';
import '../styles/styles-modal.css';
import '../styles/styles-star-rating.css';
import '../styles/styles-footer.css';
import '../styles/styles-users.css';
import '../styles/styles-community-rules.css';
import '../styles/styles-select.css';
import '../styles/slider-slick.css';
import '../styles/image-effect.css';
import '../styles/hero-slider.css';
import '../styles/hover-effect.css';
import '../styles/paralax-slider.css';
import '../styles/paralax.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'react-image-crop/dist/ReactCrop.css'
import { ParallaxProvider } from 'react-scroll-parallax';
import Script from 'next/script';

export const DataContext = createContext();


export default function MyApp({ Component, pageProps, children }) {


    return (   
        <>   

            <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />                            

            <AuthProvider>
                <AllRecipesProvider>
                    <ParallaxProvider>
                        {children}
                        <Layout>         
                            <Component {...pageProps} />                                            
                        </Layout> 
                    </ParallaxProvider> 
                </AllRecipesProvider>
            </AuthProvider>
            
        </>
    )
  }