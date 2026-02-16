
import Image from 'next/image';
import React from "react";

const Loading = ({size}) => {
    if (size==="xl")
    {
        return (
        <>
            <Image width={200} height={200} src="/icons/loader-xl.gif" alt="loading"></Image>            
        </>
        )
    }
    if (size==="l")
    {
        return (
        <>
            <Image width={100} height={100} src="/icons/loader-l.gif" alt="loading"></Image>            
        </>
        )
    }
    if (size==="m")
    {
        return (
        <>
            <Image width={64} height={64} src="/icons/loader-m.gif" alt="loading"></Image>            
        </>
        )
    }
    if (size==="s")
    {
        return (
        <>
            <Image width={32} height={32} src="/icons/loader-s.gif" alt="loading"></Image>            
        </>
        )
    }
    if (size==="xs")
    {
        return (
        <>
            <Image width={12} height={12} src="/icons/loader-xs.gif" alt="loading"></Image>            
        </>
        )
    }
}

export default Loading