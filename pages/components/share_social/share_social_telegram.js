import React from 'react';
import {TelegramShareButton } from "react-share";

const ShareSocialTelegram  = ({ shareUrl, title, width, height, fill, className }) => {
    return (
        <TelegramShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className={className}
          >
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill={fill} d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8C17,6.9,17.4,7.1,17.1,7.4z"/>
            </svg>
          </TelegramShareButton>
    );
}

export default ShareSocialTelegram;