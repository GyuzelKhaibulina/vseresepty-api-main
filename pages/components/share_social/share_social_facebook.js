import React from 'react';
import {FacebookShareButton} from "react-share";


const ShareSocialFacebook  = ({ shareUrl, title, width, height, fill, countVisible="false", className }) => {
      return (
          <>
              <FacebookShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  className={className}
              >
              <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="-337 273 123.5 256">
                  <path fill={fill} d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"/>
              </svg>
              </FacebookShareButton>
              {/* {countVisible && <div>
//                  <FacebookShareCount url={shareUrl} className="social-count">
//                      {count => count}
//                  </FacebookShareCount>
//              </div>} */}
          </>
      );
}


export default ShareSocialFacebook;