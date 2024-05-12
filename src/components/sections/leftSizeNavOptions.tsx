"use client"
import Link from "next/link"
import "@/app/globals.css"
import { Content } from "@/config/content"
import { useState } from "react"
const { navigationLinks } = Content

const links = navigationLinks.map(((element,index)=> {
    return {...element, selected: index === 0}
}))



const LeftSizeNavOptions = () => {

const [link , setLink ] = useState(links)

const OnClickLink = (key) => {
     const navLinks = link.map(element=>{
        const selected = element.key === key; 
        return {...element, selected}
     })

    setLink(navLinks)
}


 console.log("links", links)
    return (
        <ul className="lg:flex flex-[0.7] flex-col mt-20 hidden">
            {link.map((element, index)=> <li key={index}>
                <Link className={`group flex items-center py-3`} href={element.key} onClick={()=>OnClickLink(element.key)}>
                    <span className={`nav-indicator mr-4 h-px ${element.selected ? 'w-16 bg-slate-200' : 'w-8 bg-slate-600'}  transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none`}></span>
                    <span className={`nav-text text-xs font-bold uppercase tracking-widest  group-hover:text-slate-200 group-focus-visible:text-slate-200 ${element.selected? 'text-slate-200' : 'text-slate-500' }`}>{element.title}</span></Link>
            </li>)}
        </ul>
    )
}

export default LeftSizeNavOptions