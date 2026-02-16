"use client"
import React from 'react';
import { Parallax} from 'react-scroll-parallax';
import DOMPurify from "isomorphic-dompurify";

const ParalaxSlider = ({speed,  className, translateX , translateY, content}) => {


return (
    <div>
        <Parallax speed={speed}  translateY={translateY} translateX={translateX}>
            <div className={className}>
                <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content),}}/>
            </div>
        </Parallax>
    </div>
  )
}

export default ParalaxSlider