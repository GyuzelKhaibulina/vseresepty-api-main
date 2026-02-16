"use client"
import React from 'react';

const HoverEffect = ({type, imgSrc, imgAlt, p, pText, h2, aSrc, aSrc1, aSrc2, aSrc3, aSrc4, aText}) => {

    if (type==="Lily") {
        return (
            <div>             
                    <div className="grid">
                        <figure className="effect-lily">
                            <img src={imgSrc} alt={imgAlt}/>
                            <figcaption>
                                <div>
                                    <h2>{h2}</h2>
                                    <p>{p}</p>
                                </div>
                                <a href={aSrc}>{aText}</a>
                            </figcaption>           
                        </figure>
                    </div>                
            </div>
        )
    }
    
    if (type==="Sadie") {
        return (
            <div >                   
                <div className="grid">
                    <figure className="effect-sadie">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                </div>
            </div>
                 
        )
    }

    if (type==="Honey") {
        return (
            <div className="containerHover">                           
                <div className="grid">
                    <figure className="effect-honey">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                </div>
            </div>                  
        )
    }

    if (type==="Layla") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-layla">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Oscar") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-oscar">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Marley") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-marley">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Ruby") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-ruby">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Roxy") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-roxy">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Bubba") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-bubba">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Romeo") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-romeo">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Dexter") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-dexter">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Sarah") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-sarah">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Chico") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-chico">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    // выезжающие слева блоки
    if (type==="Julia") {
        return (
            <div className="containerHover">
                <div className="content">              
                    <div className="grid">
					<figure className="effect-julia">
						<img src={imgSrc} alt={imgAlt}/>
						<figcaption>
							<h2>{h2}</h2>
							<div>

                            {pText && <>                          
                                {pText.map((p, index) => 
                                    <>
                                    <p>{p.text}</p>
                                    <br/>
                                    </>
                                )}
                            </>}

							</div>
                            <a href={aSrc}>{aText}</a>
						</figcaption>			
					</figure>
                    </div>
                     </div>
                     </div>
        )
    }


    if (type==="Selena") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-selena">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Terry") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-terry">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>
								<a href={aSrc1}><img className="fa fa-fw fa-download" src='/icons/save-icon.png'/></a>
								<a href={aSrc2}><img className="fa fa-fw fa-heart" src='/icons/save-icon.png'/></a>
								<a href={aSrc3}><img className="fa fa-fw fa-share" src='/icons/save-icon.png'/></a>
								<a href={aSrc4}><img className="fa fa-fw fa-tags" src='/icons/save-icon.png'/></a>
							</p>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Apollo") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-apollo">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }  

    if (type==="Kira") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-kira">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>
								<a href={aSrc1}><img className="fa fa-fw fa-home" src='/icons/print-icon2.png'/></a>
								<a href={aSrc2}><img className="fa fa-fw fa-download" src='/icons/print-icon2.png'/></a>
								<a href={aSrc3}><img className="fa fa-fw fa-heart" src='/icons/print-icon2.png'/></a>
								<a href={aSrc4}><img className="fa fa-fw fa-share" src='/icons/print-icon2.png'/></a>
							</p>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    }

    if (type==="Steve") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-steve">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    } 

    if (type==="Moses") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-moses">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    } 

    if (type==="Jazz") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-jazz">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    } 

    if (type==="Ming") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-ming">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    } 

    if (type==="Lexi") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-lexi">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    } 

    if (type==="Duke") {
        return (

            <div className="containerHover">
                <div className="content">
              
                    <div className="grid">
                    <figure className="effect-duke">
                        <img src={imgSrc} alt={imgAlt}/>
                        <figcaption>
                            <h2>{h2}</h2>
                            <p>{p}</p>
                            <a href={aSrc}>{aText}</a>
                        </figcaption>           
                    </figure>
                    </div>
                     </div>
                     </div>
        )
    } 
}

export default HoverEffect