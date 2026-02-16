
import Head from 'next/head';

export default function HeadMetaTags({title, description, keywords, content, ogTitle, ogDescription, ogImage, ogUrl, twitterUrl, twitterTitle, twitterDescription, twitterImage}) {
  return (
    <>
      <Head>               
        <title>{title}</title>  
        <html lang="ru"/>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>     
        <link rel="canonical" href="https://vseresepty.ru"></link>       
        <meta name="google-site-verification" content="LAd5xOPo2Up3tXrLyhFlgYA0MoG7g7hALdHYhbFBtMI" />       
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords}/>
        <meta name="robots" content={content} />                                
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" /> 
        <meta property="og:locale" content="ru_RU" /> 
        <meta name="twitter:creator" content="@GyuzelKh" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={twitterUrl} />
        <meta property="twitter:title" content={twitterTitle} />
        <meta property="twitter:description" content={twitterDescription} />
        <meta property="twitter:image" content={twitterImage} />   
      </Head>
    </>
  );
}